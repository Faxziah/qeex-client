'use client';

import {ethers} from "ethers";
import {TransactionFeeInfo, CryptocurrencyFormData} from "@/app/interface/IContract";
import {BASE_FEE_IN_USD} from "@/app/constants/constants";
import {COINGECKO_ETH_USD} from "@/app/constants/apiUrl";
import {TOKEN_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";

export async function _getCreateCryptocurrencyInfo(info: CryptocurrencyFormData): Promise<TransactionFeeInfo | undefined> {
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

  const erc20ContractAbi = await fetch(TOKEN_CONTRACT_TEMPLATE_PATH);
  const {abi: contractAbi, bytecode: contractBytecode} = await erc20ContractAbi.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  console.log('Before estimating gas');

  // Конвертируем totalSupply в wei (18 decimals)
  const totalSupplyInWei = ethers.parseUnits(info.totalSupply, 18);

  const gasEstimate: bigint = await signer.estimateGas(
    await contractFactory.getDeployTransaction(info.name, info.symbol, totalSupplyInWei)
  );

  console.log('Estimated gas:', gasEstimate.toString());

  // 1. Рассчитываем стоимость в эфире
  const totalGasCostInWei = gasEstimate * gasPrice;

  // 2. Преобразуем стоимость в эфире в формате wei в эфир
  const totalGasCostInEther = ethers.formatUnits(totalGasCostInWei, 'ether');
  console.log('Total gas cost in Ether:', totalGasCostInEther);

  // 3. Получаем курс эфира в долларах через API
  const response: Response = await fetch(COINGECKO_ETH_USD);
  const data = await response.json();
  const ethPriceInUsd = data.ethereum.usd;

  console.log('ETH to USD rate:', ethPriceInUsd);

  // 4. Рассчитываем комиссию в долларах
  const feeInUsd = parseFloat(totalGasCostInEther) * ethPriceInUsd;
  console.log('Transaction fee in USD:', feeInUsd);

  return {
    fee: BASE_FEE_IN_USD,
    blockchainFee: Math.round(feeInUsd * 10000) / 10000
  };
} 