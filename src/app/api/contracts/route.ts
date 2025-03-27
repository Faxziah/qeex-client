import {NextResponse} from "next/server";

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