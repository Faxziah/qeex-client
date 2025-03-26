import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    const {address} = await req.json();

    console.log(process.env.BACKEND_URL + "/api/contracts/create");
    const response = await fetch(process.env.BACKEND_URL + "/api/contracts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({"address": address}),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({error: error});
  }
}