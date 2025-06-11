import {ethers} from "ethers";
import {ChainsId, getChainById} from "@/app/interface/Chains";

export function getProvider(chainId: number) {
  const chain = getChainById(chainId);

  if (!chain) {
    throw new Error('Сеть не поддерживается');
  }

  if (chain.alchemyNetworkName && process.env.ALCHEMY_API_KEY) {
    return new ethers.AlchemyProvider(chain.alchemyNetworkName, process.env.ALCHEMY_API_KEY);
  } else if (chainId === ChainsId.HARDHAT_LOCAL) {
    return new ethers.JsonRpcProvider();
  } else {
    throw new Error(`Не удалось найти провайдер для сети ${chain.name} (Chain ID: ${chainId})`);
  }
} 