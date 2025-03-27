'use client';

import {BaseContract, ethers} from "ethers";

export async function _createContract(contractText: string) {
  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const everlastingContractAbi = await fetch("/contracts/EverlastingContract.sol/EverlastingContract.json");
  const {abi: contractAbi, bytecode: contractBytecode} = await everlastingContractAbi.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  console.log('Before creating contract');

  const contract: BaseContract = await contractFactory.deploy(contractText);

  console.log('After creating contract');

  await contract.waitForDeployment();

  console.log('After deploying contract');

  const walletAddress = await signer.getAddress();

  const data = {
    contractAddress: contract.target,
    walletAddress: walletAddress
  };

  const response = await fetch("/api/contracts/create", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const result: object = await response.json();

  console.log('result _createContract', result);

  return contract.target;
}