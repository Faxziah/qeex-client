'use client';

import {BaseContract, ethers, TransactionResponse} from "ethers";
import {TOKEN_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {CREATE_CONTRACT_URL} from "@/app/constants/backendUrl";
import {BASE_FEE_IN_USD, MAIN_ADDRESS_TO_GET_PAYMENT} from "@/app/constants/constants";
import {getEthAmountForUsd} from "@/app/helpers/coingecko";
import {CryptocurrencyFormData, ContractType} from "@/app/interface/IContract";

export async function _createCryptocurrency(info: CryptocurrencyFormData) {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();

  const ethAmountRounded: number | null = await getEthAmountForUsd(BASE_FEE_IN_USD);

  if (!ethAmountRounded) {
    console.log("Некорректная цена ETH");
    return null;
  }

  let sendEthTx: TransactionResponse;

  try {
    sendEthTx = await signer.sendTransaction({
      to: MAIN_ADDRESS_TO_GET_PAYMENT,
      value: ethers.parseEther(String(ethAmountRounded))
    });
  } catch (e: unknown) {
    console.log(e);
    return;
  }

  await sendEthTx.wait();

  const erc20ContractAbi = await fetch(TOKEN_CONTRACT_TEMPLATE_PATH);
  const {abi: contractAbi, bytecode: contractBytecode} = await erc20ContractAbi.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  console.log('Before creating contract');

  let contract: BaseContract;

  try {
    // Конвертируем totalSupply в wei (18 decimals)
    const totalSupplyInWei = ethers.parseUnits(info.totalSupply, 18);
    contract = await contractFactory.deploy(info.name, info.symbol, totalSupplyInWei);
  } catch (e: unknown) {
    return;
  }

  console.log('After creating contract');

  await contract.waitForDeployment();

  console.log('After deploying contract');

  const contractDeployTx = contract.deploymentTransaction();

  let blockNumber;
  if (contractDeployTx != null) {
    const contractDeployReceipt = await contractDeployTx.wait();

    if (contractDeployReceipt != null) {
      blockNumber = contractDeployReceipt.blockNumber;
    }
  }

  const network = await provider.getNetwork();
  const chainId = network.chainId;

  const data = {
    contractAddress: contract.target,
    walletAddress: walletAddress,
    chainId: Number(chainId),
    blockNumber: blockNumber,
    paymentTransactionHash: sendEthTx.hash,
    contractTypeId: ContractType.ERC20
  };

  const response = await fetch(CREATE_CONTRACT_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const result: object = await response.json();

  console.log('result _createCryptocurrency', result);

  return contract.target;
} 