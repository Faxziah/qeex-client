import {COINGECKO_ETH_USD} from "@/app/constants/apiUrl";

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

export async function getEthAmountForUsd(usdAmount: number): Promise<number | null> {
  const ethPriceInUsd = await getEthPriceInUsd();

  if (ethPriceInUsd === null) {
    return null;
  }

  const ethAmount = usdAmount / ethPriceInUsd;
  const factor = Math.pow(10, 18);
  return Math.ceil(ethAmount * factor - 10000000) / factor;
}
