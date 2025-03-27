'use client';

import {ethers} from "ethers";

export async function _getUserContracts(): Promise<object[] | undefined> {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const walletAddress: string = await signer.getAddress();

  const network = await provider.getNetwork();
  const chainId = network.chainId;

  const params = new URLSearchParams();
  params.append("walletAddress", walletAddress);
  params.append("chainId", String(chainId));

  const response = await fetch(`/api/contracts?${params}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  });

  const result: object[] = await response.json();

  console.log('result _getUserContracts', result);

  return result;
}
