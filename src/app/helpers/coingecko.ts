import {COINGECKO_ETH_USD} from "@/app/constants/apiUrl";
import {ethers} from "ethers";

export async function getEthPriceInUsd(): Promise<number | null> {
  const ethUsdPriceResponse: Response = await fetch(COINGECKO_ETH_USD);
  const ethUsdPriceData = await ethUsdPriceResponse.json();
  const ethPriceInUsd = Number(ethUsdPriceData.ethereum.usd);

  if (!ethPriceInUsd) {
    console.log("Некорректная цена ETH");
    return null;
  }

  return ethPriceInUsd;
}

export async function getWeiAmountForOneUsd(usdAmount: number): Promise<bigint | null> {
  const ethPriceInUsd = await getEthPriceInUsd();

  if (ethPriceInUsd === null) {
    return null;
  }

  // Рассчитываем количество ETH как число с плавающей запятой
  const ethAmount = usdAmount / ethPriceInUsd;

  // Преобразуем количество ETH в строку с достаточной точностью
  // Например, до 18 знаков после запятой для wei
  const ethAmountString = ethAmount.toFixed(18); // Важно для точности

  // Используем ethers.parseEther для преобразования в wei (BigInt)
  // parseEther вернет BigInt
  try {
    return ethers.parseEther(ethAmountString);
  } catch (error) {
    console.error("Ошибка при парсинге ETH суммы в wei:", error);
    return null;
  }
}
