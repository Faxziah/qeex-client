import {ethers} from "ethers";

export function getProvider(chainId: number) {
  switch (chainId) {
    case 1:
      return new ethers.AlchemyProvider('homestead', process.env.ALCHEMY_API);
    case 42161:
      return new ethers.AlchemyProvider('Arbitrum One', process.env.ALCHEMY_API);
    case 31337:
      return new ethers.AlchemyProvider('homestead', process.env.ALCHEMY_API);
    default:
      throw new Error('Сеть не поддерживается');
  }
}
