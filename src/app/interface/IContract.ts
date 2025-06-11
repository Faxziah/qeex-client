import {IUser} from "@/app/interface/IUser";
import {
  EVERLASTING_CONTRACT_TEMPLATE_PATH,
  EVERLASTING_CONTRACT_TEMPLATE_SOL_PATH, NFT_CONTRACT_TEMPLATE_PATH,
  NFT_CONTRACT_TEMPLATE_SOL_PATH,
  TOKEN_CONTRACT_TEMPLATE_PATH,
  TOKEN_CONTRACT_TEMPLATE_SOL_PATH
} from "@/app/constants/contractsTemplate";

export interface IContract {
  id: number;
  user_id: number;
  chain_id: number;
  block_number: number;
  status: ContractStatus;
  address: string;
  created_at: string;
  user: IUser;
  contract_type_id: ContractsType;
}

export enum ContractStatus {
  NEW = "new",
  PAID = "paid",
  WAIT_DEPLOYMENT = "wait_deployment",
  DEPLOYED = "deployed",
  ERROR = "error",
}

export const ContractStatusRus: Record<ContractStatus, string> = {
  [ContractStatus.NEW]: 'Новый',
  [ContractStatus.PAID]: 'Оплачен',
  [ContractStatus.WAIT_DEPLOYMENT]: 'Ожидает загрузки',
  [ContractStatus.DEPLOYED]: 'Загружен',
  [ContractStatus.ERROR]: 'Ошибка'
};

export interface TransactionFeeInfo {
  fee: number;
  blockchainFee: number;
}

export interface CryptocurrencyFormData {
  name: string;
  symbol: string;
  totalSupply: string;
}

export interface NftFormData {
  name: string;
  symbol: string;
  baseUri: string;
}

export enum ContractsType {
  SIMPLE_CONTRACT = 1,
  ERC20 = 2,
  ERC721 = 3
}

export const ContractsTypeName: Record<ContractsType, {contractName: string, contractNameRus: string}> = {
  [ContractsType.SIMPLE_CONTRACT]: {
    contractName: 'EverlastingContract',
    contractNameRus: 'Смарт-контракт',
  },
  [ContractsType.ERC20]: {
    contractName: 'ERC-20',
    contractNameRus: 'Криптовалюта',
  },
  [ContractsType.ERC721]: {
    contractName: 'NFT',
    contractNameRus: 'NFT',
  },
};

export const ContractsTypePath: Record<ContractsType, {solPath: string, abiPath: string}> = {
  [ContractsType.SIMPLE_CONTRACT]: {
    solPath: EVERLASTING_CONTRACT_TEMPLATE_SOL_PATH,
    abiPath: EVERLASTING_CONTRACT_TEMPLATE_PATH,
  },
  [ContractsType.ERC20]: {
    solPath: TOKEN_CONTRACT_TEMPLATE_SOL_PATH,
    abiPath: TOKEN_CONTRACT_TEMPLATE_PATH,
  },
  [ContractsType.ERC721]: {
    solPath: NFT_CONTRACT_TEMPLATE_SOL_PATH,
    abiPath: NFT_CONTRACT_TEMPLATE_PATH,
  },
}