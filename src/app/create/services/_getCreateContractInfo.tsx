'use client';

import {ethers} from "ethers";
import {TransactionFeeInfo} from "@/app/interface/IContract";
import {BASE_FEE_IN_DOLLARS} from "@/app/constants/constants";
import {COINGECKO_ETH_USD} from "@/app/constants/apiUrl";
import {SIMPLE_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";

export async function _getCreateContractInfo(contractText: string): Promise<TransactionFeeInfo | undefined> {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const gasPrice = (await provider.getFeeData()).gasPrice;

  console.log('Gas price:', gasPrice?.toString());

  if (gasPrice === null) {
    throw new Error('Некорректная цена газа');
  }

  const everlastingContractAbi = await fetch(SIMPLE_CONTRACT_TEMPLATE_PATH);
  const {abi: contractAbi, bytecode: contractBytecode} = await everlastingContractAbi.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  console.log('Before estimating gas');

  const gasEstimate: bigint = await signer.estimateGas(
    await contractFactory.getDeployTransaction(contractText)
  );

  console.log('Estimated gas:', gasEstimate.toString());

  // 1. Рассчитываем стоимость в эфире
  const totalGasCostInWei = gasEstimate * gasPrice;

  // 2. Преобразуем стоимость в эфире в формате wei в эфир
  const totalGasCostInEther = ethers.formatUnits(totalGasCostInWei, 'ether');
  console.log('Total gas cost in Ether:', totalGasCostInEther);

  // 3. Получаем курс эфира в долларах через API (например, через CoinGecko)
  const response: Response = await fetch(COINGECKO_ETH_USD);
  const data = await response.json();
  const ethPriceInUsd = data.ethereum.usd;

  console.log('ETH to USD rate:', ethPriceInUsd);

  // 4. Рассчитываем комиссию в долларах
  const feeInUsd = parseFloat(totalGasCostInEther) * ethPriceInUsd;
  console.log('Transaction fee in USD:', feeInUsd);

  return {
    fee: BASE_FEE_IN_DOLLARS,
    blockchainFee: Math.round(feeInUsd * 10000) / 10000
  };
}