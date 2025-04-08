import {IChain} from "@/app/interface/Chains";

export enum ChainsId {
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  HARDHAT = 31337,
  MUMBAI = 80001,
  ARBITRUM = 42161,
}

export const Chains: Record<number, IChain> = {
  [ChainsId.ETHEREUM]: {
    chainId: ChainsId.ETHEREUM,
    name: "Ethereum Mainnet",
    explorerUrl: "https://etherscan.io/",
  },
  [ChainsId.BSC]: {
    chainId: ChainsId.BSC,
    name: "Binance Smart Chain",
    explorerUrl: "https://bscscan.com/",
  },
  [ChainsId.POLYGON]: {
    chainId: ChainsId.POLYGON,
    name: "Polygon",
    explorerUrl: "https://polygonscan.com/",
  },
  [ChainsId.HARDHAT]: {
    chainId: ChainsId.HARDHAT,
    name: "Hardhat",
    explorerUrl: "https://etherscan.io/",
  },
  [ChainsId.MUMBAI]: {
    chainId: ChainsId.MUMBAI,
    name: "Mumbai Testnet",
    explorerUrl: "https://mumbai.polygonscan.com/",
  },
  [ChainsId.ARBITRUM]: {
    chainId: ChainsId.ARBITRUM,
    name: "Arbitrum One",
    explorerUrl: "https://arbiscan.io/",
  },
};