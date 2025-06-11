import {ContractStatus, ContractsType} from "@/app/interface/IContract";

export interface CreateContractDto {
  contractAddress: string;
  walletAddress: string;
  chainId: number;
  blockNumber: number;
  paymentTransactionHash: string;
  contractTypeId: ContractsType;
  status?: ContractStatus;
}