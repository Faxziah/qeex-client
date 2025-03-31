export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  HARDHAT = 31337,
  MUMBAI = 80001,
  ARBITRUM = 42161,
}

export const ChainsName: Record<number, string> = {
  [ChainId.ETHEREUM]: "Ethereum Mainnet",
  [ChainId.BSC]: "Binance Smart Chain",
  [ChainId.POLYGON]: "Polygon",
  [ChainId.HARDHAT]: "Hardhat",
  [ChainId.MUMBAI]: "Mumbai Testnet",
  [ChainId.ARBITRUM]: "Arbitrum One",
};