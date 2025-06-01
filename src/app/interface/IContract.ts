import {IUser} from "@/app/interface/IUser";

export interface IContract {
  id: number;
  user_id: number;
  chain_id: number;
  block_number: number;
  status: ContractStatus;
  address: string;
  created_at: string;
  user: IUser;
  contract_type_id: ContractType;
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

export enum ContractType {
  SIMPLE_CONTRACT = 1,
  ERC20 = 2
}

export const ContractTypeRus: Record<ContractType, string> = {
  [ContractType.SIMPLE_CONTRACT]: 'Смарт-контракт',
  [ContractType.ERC20]: 'Криптовалюта'
};