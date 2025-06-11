import { promises as fs } from 'fs';
import { ethers } from "ethers";
import { getChainById } from "@/app/interface/Chains";
import { ContractsType, ContractsTypeName, ContractsTypePath } from "@/app/interface/IContract";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contractTypeId, contractAddress, chainId, constructorArgs }: {
      contractTypeId: ContractsType;
      contractAddress: string;
      chainId: number;
      constructorArgs: { type: string; value: any }[];
    } = body;

    const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

    if (!ETHERSCAN_API_KEY) {
      return NextResponse.json({ error: 'API key not provided' }, { status: 400 });
    }

    const chain = getChainById(chainId);

    if (!chain?.explorerApiUrl) {
      return NextResponse.json({ error: 'Explorer API URL not found' }, { status: 400 });
    }

    const contractType = ContractsTypePath[contractTypeId];

    if (!contractType) {
      return NextResponse.json({ error: 'Invalid contract type' }, { status: 400 });
    }

    // Read source code
    const sourceCode = await fs.readFile(contractType.solPath, 'utf8');
    // Read compiler version
    const artifact = JSON.parse(await fs.readFile(contractType.abiPath, 'utf8'));
    const compilerVersion = artifact.metadata?.compiler?.version || artifact.metadata?.compilerVersion;

    const constructorArgsTypes = constructorArgs.map((arg) => arg.type);
    const constructorArgsValues = constructorArgs.map((arg) => arg.value);
    const constructorArgsEncoded = ethers.AbiCoder.defaultAbiCoder()
      .encode(constructorArgsValues, constructorArgsTypes)
      .replace(/^0x/, "");

    const params = new URLSearchParams({
      apikey: ETHERSCAN_API_KEY,
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: contractAddress,
      sourceCode: sourceCode,
      codeformat: 'solidity-single-file',
      contractname: ContractsTypeName[contractTypeId].contractName,
      compilerversion: String(compilerVersion),
      optimizationUsed: '1',
      constructorArguements: constructorArgsEncoded,
    });

    const response = await fetch(chain.explorerApiUrl, {
      method: 'POST',
      body: params,
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
} 