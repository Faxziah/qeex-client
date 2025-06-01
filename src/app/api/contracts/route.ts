import {NextResponse} from "next/server";
import {ContractStatus} from "@/app/interface/IContract";
import {getProvider} from "@/app/helpers/getProvider";
import {BASE_FEE_IN_USD, MAIN_ADDRESS_TO_GET_PAYMENT} from "@/app/constants/constants";
import {getEthAmountForUsd} from "@/app/helpers/coingecko";
import {CreateContractDto} from "@/app/dto/CreateContractDto";
import {CREATE_CONTRACT_URL} from "@/app/constants/backendUrl";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const walletAddress: string = url.searchParams.get('walletAddress') ?? '';
    const chainId: string = url.searchParams.get('chainId') ?? '';

    const params = new URLSearchParams();
    params.append("walletAddress", walletAddress);
    params.append("chainId", chainId);

    const response = await fetch(process.env.BACKEND_URL + `/api/contracts?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const result: object[] = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({error: error});
  }
}

export async function POST(req: Request) {
  try {
    const request = await req.json();

    const data: CreateContractDto = {
      contractAddress: request.contractAddress,
      walletAddress: request.walletAddress,
      chainId: request.chainId,
      blockNumber: request.blockNumber,
      paymentTransactionHash: request.paymentTransactionHash,
      contractTypeId: request.contractTypeId
    };

    const provider = getProvider(Number(request.chainId));
    const txReceipt = await provider.getTransaction(request.paymentTransactionHash);
    const ethAmountRounded: number | null = await getEthAmountForUsd(BASE_FEE_IN_USD);

    if (!ethAmountRounded) {
      console.log("Некорректная цена ETH");
      return null;
    }

    if (txReceipt?.from === request.walletAddress && txReceipt?.to === MAIN_ADDRESS_TO_GET_PAYMENT && txReceipt?.value.toString() >= String(BASE_FEE_IN_USD)) {
      data.status = ContractStatus.DEPLOYED;
    } else {
      data.status = ContractStatus.ERROR;
    }

    const response = await fetch(process.env.BACKEND_URL + CREATE_CONTRACT_URL, {
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