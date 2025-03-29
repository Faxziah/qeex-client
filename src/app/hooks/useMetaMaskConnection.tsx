'use client';

import {useState, useEffect} from "react";

export function useMetaMaskConnection() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    checkIsConnected();

    if (window.ethereum) {
      // window.ethereum.on('accountsChanged', handleAccountsChanged); // warning ts
      window.ethereum.on('accountsChanged', (...accounts: unknown[]) => {
        handleAccountsChanged(accounts[0] as string[]);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      }
    };

  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    setIsConnected(!!accounts.length);
  };

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
