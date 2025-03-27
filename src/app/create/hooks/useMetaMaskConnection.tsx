import {useState, useEffect} from "react";
import {MetaMaskInpageProvider} from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export function useMetaMaskConnection() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    checkIsConnected();
  }, []);

  async function checkIsConnected() {
    if (!window.ethereum) {
      console.warn("MetaMask is not installed");
      return;
    }

    try {
      const requestedAccounts = await window.ethereum.request({method: "eth_accounts"}) as string[];
      setIsConnected(requestedAccounts.length > 0);
    } catch (e) {
      console.error(e);
      setIsConnected(false);
    }
  }

  async function connect() {

    console.log('window.ethereum', window.ethereum);
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      const requestedAccounts = await window.ethereum.request({method: "eth_requestAccounts"}) as string[];
      setIsConnected(requestedAccounts.length > 0);
    } catch (e) {
      console.log(e);
      setIsConnected(false);
    }
  }

  return {isConnected, checkIsConnected, connect};
}