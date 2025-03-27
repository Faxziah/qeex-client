import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    const request = await req.json();

    const data = {
      contractAddress: request.contractAddress,
      walletAddress: request.walletAddress
    };

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