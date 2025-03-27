'use client';

import {ethers} from "ethers";
import {MetaMaskInpageProvider} from "@metamask/providers";


declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export async function _getUserContracts(): Promise<object[]> {
  const provider = new ethers.BrowserProvider(window.ethereum as MetaMaskInpageProvider);
  const signer = await provider.getSigner();
  const walletAddress: string = await signer.getAddress();

  const params = new URLSearchParams();
  params.append("walletAddress", walletAddress);

  const response = await fetch(`/api/contracts?${params}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  });

  const result: object[] = await response.json();

  console.log('result _getUserContracts', result);

  return result;
}