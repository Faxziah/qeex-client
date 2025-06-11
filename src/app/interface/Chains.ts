export interface IChain {
  chainId: number;
  name: string;
  explorerUrl?: string;
  explorerApiUrl?: string;
  alchemyNetworkName?: string;
}

export enum ChainsId {
  ETHEREUM_MAINNET = 1,
  SEPOLIA = 11155111,
  GOERLI = 5,
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,
  POLYGON_MAINNET = 137,
  POLYGON_MUMBAI = 80001,
  HARDHAT_LOCAL = 31337,
}

export const SUPPORTED_CHAINS: IChain[] = [
  {
    chainId: ChainsId.ETHEREUM_MAINNET,
    name: "Ethereum Mainnet",
    explorerUrl: "https://etherscan.io/",
    explorerApiUrl: "https://api.etherscan.io/api",
    alchemyNetworkName: "homestead",
  },
  {
    chainId: ChainsId.SEPOLIA,
    name: "Sepolia Testnet",
    explorerUrl: "https://sepolia.etherscan.io/",
    explorerApiUrl: "https://api-sepolia.etherscan.io/api",
    alchemyNetworkName: "sepolia",
  },
  {
    chainId: ChainsId.GOERLI,
    name: "Goerli Testnet",
    explorerUrl: "https://goerli.etherscan.io/",
    explorerApiUrl: "https://api-goerli.etherscan.io/api",
    alchemyNetworkName: "goerli",
  },
  {
    chainId: ChainsId.ARBITRUM_ONE,
    name: "Arbitrum One",
    explorerUrl: "https://arbiscan.io/",
    explorerApiUrl: "https://api.arbiscan.io/api",
    alchemyNetworkName: "arbitrum",
  },
  {
    chainId: ChainsId.ARBITRUM_GOERLI,
    name: "Arbitrum Goerli",
    explorerUrl: "https://goerli.arbiscan.io/",
    explorerApiUrl: "https://api-goerli.arbiscan.io/api",
    alchemyNetworkName: "arbitrum-goerli",
  },
  {
    chainId: ChainsId.POLYGON_MAINNET,
    name: "Polygon Mainnet",
    explorerUrl: "https://polygonscan.com/",
    explorerApiUrl: "https://api.polygonscan.com/api",
    alchemyNetworkName: "matic",
  },
  {
    chainId: ChainsId.POLYGON_MUMBAI,
    name: "Polygon Mumbai",
    explorerUrl: "https://mumbai.polygonscan.com/",
    explorerApiUrl: "https://api-testnet.polygonscan.com/api",
    alchemyNetworkName: "maticmum",
  },
  {
    chainId: ChainsId.HARDHAT_LOCAL,
    name: "Hardhat Local",
  },
];

export const getChainById = (chainId: number): IChain | undefined => {
  return SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
};