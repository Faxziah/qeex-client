'use client';

import {ethers} from "ethers";
import {IEverlastingContract} from "@/app/interface/IEverlastingContract";

export async function _getContract(contractAddress: string): Promise<string | undefined> {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const everlastingContractAbi = await fetch("/contracts/EverlastingContract.sol/EverlastingContract.json");
  const {abi: contractAbi} = await everlastingContractAbi.json();

  const contract = new ethers.Contract(contractAddress, contractAbi, signer) as unknown as IEverlastingContract;

  let text: string;

  try {
    text = await contract.getText();
  } catch (e) {
    console.log('error _getContract', e);
    return 'Текст не найден';
  }

  console.log('result _getContract', text);

  return text;
}
