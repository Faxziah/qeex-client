'use client';

import {BaseContract, ethers, TransactionResponse} from "ethers";
import {EVERLASTING_CONTRACT_TEMPLATE_PATH, IERC20_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {CREATE_CONTRACT_URL} from "@/app/constants/backendUrl";
import {BASE_FEE_IN_USD, MASTER_ADDRESS} from "@/app/constants/constants";
import {getEthAmountForUsd} from "@/app/helpers/coingecko";

export async function _createContract(contractText: string) {
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
      to: MASTER_ADDRESS,
      value: ethers.parseEther(String(ethAmountRounded)) // eth на 1$
    });
  } catch (e: unknown) {
    return;
  }

  await sendEthTx.wait();

  const everlastingContractAbi = await fetch(EVERLASTING_CONTRACT_TEMPLATE_PATH);
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
    payTxHash: sendEthTx.hash
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