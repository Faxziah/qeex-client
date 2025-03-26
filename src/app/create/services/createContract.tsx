import {ethers} from "ethers";
import {MetaMaskInpageProvider} from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export async function _createContract(contractText: string) {

  if (!window.ethereum) {
    console.warn("MetaMask is not installed");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const response = await fetch("/contracts/EverlastingContract.sol/EverlastingContract.json");
  const {abi: contractAbi, bytecode: contractBytecode} = await response.json();

  const contractFactory = new ethers.ContractFactory(contractAbi, contractBytecode, signer);

  const contract = await contractFactory.deploy(contractText);

  await contract.waitForDeployment();
  return contract.target;
}