'use client';

import {BaseContract, ethers, TransactionResponse} from "ethers";
import {NFT_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {CREATE_CONTRACT_URL} from "@/app/constants/backendUrl";
import {BASE_FEE_IN_USD, MAIN_ADDRESS_TO_GET_PAYMENT} from "@/app/constants/constants";
import {getWeiAmountForOneUsd} from "@/app/helpers/coingecko";
import {NftFormData, ContractType} from "@/app/interface/IContract";

export async function _createNft(info: NftFormData) {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();

  const weiAmountForOneUsd: bigint | null = await getWeiAmountForOneUsd(BASE_FEE_IN_USD);

  if (weiAmountForOneUsd === null) {
    console.log("Некорректная цена ETH");
    return null;
  }

  let sendEthTx: TransactionResponse;

  try {
    sendEthTx = await signer.sendTransaction({
      to: MAIN_ADDRESS_TO_GET_PAYMENT,
      value: weiAmountForOneUsd
    });
  } catch (e: unknown) {
    console.log(e);
    return;
  }

  await sendEthTx.wait();

  const erc721ContractAbi = await fetch(NFT_CONTRACT_TEMPLATE_PATH);
  const {abi: contractAbi, bytecode: contractBytecode} = await erc721ContractAbi.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  console.log('Before creating NFT contract');

  let contract: BaseContract;

  try {
    contract = await contractFactory.deploy(info.name, info.symbol, info.baseUri);
  } catch (e: unknown) {
    return;
  }

  console.log('After creating NFT contract');

  await contract.waitForDeployment();

  console.log('After deploying NFT contract');

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
    contractTypeId: ContractType.ERC721
  };

  const response = await fetch(CREATE_CONTRACT_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const result: object = await response.json();

  console.log('result _createNft', result);

  return contract.target;
} 