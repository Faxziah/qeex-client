'use client';

import {MetaMaskInpageProvider} from "@metamask/providers";
import React, {useState, useEffect} from "react";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function ConnectButton() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({method: "eth_accounts"}) as string[];
    accounts.length > 0 ? setIsConnected(true) : setIsConnected(false);
  }

  async function connect() {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask");
      return;
    }

    try {
      const requestedAccounts = await window.ethereum.request({method: "eth_requestAccounts"}) as string[];
      requestedAccounts.length > 0 ? setIsConnected(true) : setIsConnected(false);
    } catch (e) {
      setIsConnected(false);
    }
  }

  return (
    <div>
      <button type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={connect}>
        {isConnected ? 'Connected' : 'Connect MetaMask'}
      </button>
    </div>
  );
}


