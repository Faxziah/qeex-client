import {ContractStatus} from "@/app/interface/IContract";

export interface CreateContractDto {
  contractAddress: string;
  walletAddress: string;
  chainId: number;
  blockNumber: number;
  payTxHash: string;
  status?: ContractStatus;
}