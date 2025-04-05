export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  HARDHAT = 31337,
  MUMBAI = 80001,
  ARBITRUM = 42161,
}

interface Chain {
  chainId: number;
  name: string;
  explorerUrl: string
}

export const Chains: Record<number, Chain> = {
  [ChainId.ETHEREUM]: {
    chainId: ChainId.ETHEREUM,
    name: "Ethereum Mainnet",
    explorerUrl: "https://etherscan.io/",
  },
  [ChainId.BSC]: {
    chainId: ChainId.BSC,
    name: "Binance Smart Chain",
    explorerUrl: "https://bscscan.com/",
  },
  [ChainId.POLYGON]: {
    chainId: ChainId.POLYGON,
    name: "Polygon",
    explorerUrl: "https://polygonscan.com/",
  },
  [ChainId.HARDHAT]: {
    chainId: ChainId.HARDHAT,
    name: "Hardhat",
    explorerUrl: "https://etherscan.io/",
  },
  [ChainId.MUMBAI]: {
    chainId: ChainId.MUMBAI,
    name: "Mumbai Testnet",
    explorerUrl: "https://mumbai.polygonscan.com/",
  },
  [ChainId.ARBITRUM]: {
    chainId: ChainId.ARBITRUM,
    name: "Arbitrum One",
    explorerUrl: "https://arbiscan.io/",
  },
};