import {NextResponse} from "next/server";
import {ContractStatus} from "@/app/interface/IContract";
import {getProvider} from "@/app/helpers/getProvider";
import {BASE_FEE_IN_USD, MASTER_ADDRESS} from "@/app/constants/constants";
import {getEthAmountForUsd} from "@/app/helpers/coingecko";
import {CreateContractDto} from "@/app/dto/CreateContractDto";

export async function POST(req: Request) {
  try {
    const request = await req.json();

    const data: CreateContractDto = {
      contractAddress: request.contractAddress,
      walletAddress: request.walletAddress,
      chainId: request.chainId,
      blockNumber: request.blockNumber,
      payTxHash: request.payTxHash
    };

    const provider = getProvider(Number(request.chainId));
    const txReceipt = await provider.getTransaction(request.payTxHash);
    const ethAmountRounded: number | null = await getEthAmountForUsd(BASE_FEE_IN_USD);

    if (!ethAmountRounded) {
      console.log("Некорректная цена ETH");
      return null;
    }

    if (txReceipt?.from === request.walletAddress && txReceipt?.to === MASTER_ADDRESS && txReceipt?.value.toString() >= String(BASE_FEE_IN_USD)) {
      data.status = ContractStatus.DEPLOYED;
    } else {
      data.status = ContractStatus.ERROR;
    }

    const response = await fetch(process.env.BACKEND_URL + "/api/contracts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const result: object = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({error: error});
  }
}