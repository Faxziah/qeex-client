import {ContractStatus, ContractType} from "@/app/interface/IContract";

export interface CreateContractDto {
  contractAddress: string;
  walletAddress: string;
  chainId: number;
  blockNumber: number;
  paymentTransactionHash: string;
  contractTypeId: ContractType;
  status?: ContractStatus;
}