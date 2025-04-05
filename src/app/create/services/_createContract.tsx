'use client';

import {BaseContract, ethers} from "ethers";
import {SIMPLE_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {CREATE_CONTRACT_URL} from "@/app/constants/backendUrl";

export async function _createContract(contractText: string) {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();

  const everlastingContractAbi = await fetch(SIMPLE_CONTRACT_TEMPLATE_PATH);
  const {abi: contractAbi, bytecode: contractBytecode} = await everlastingContractAbi.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  console.log('Before creating contract');

  let contract: BaseContract;

  try {
    contract = await contractFactory.deploy(contractText);
  } catch (e: unknown) {
    return;
  }

  console.log('After creating contract');

  await contract.waitForDeployment();

  console.log('After deploying contract');

  const tx = contract.deploymentTransaction();

  let blockNumber;
  if (tx != null) {
    const receipt = await tx.wait();

    if (receipt != null) {
      blockNumber = receipt.blockNumber;
    }
  }

  const network = await provider.getNetwork();
  const chainId = network.chainId;

  const data = {
    contractAddress: contract.target,
    walletAddress: walletAddress,
    chainId: Number(chainId),
    blockNumber: blockNumber
  };

  const response = await fetch(CREATE_CONTRACT_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const result: object = await response.json();

  console.log('result _createContract', result);

  return contract.target;
}