"use client";

import {useState, useEffect} from "react";

import ConnectButton from "@/app/create/components/ConnectButton";
import {useMetaMaskConnection} from "@/app/create/hooks/useMetaMaskConnection";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {_getUserContracts} from "@/app/me/services/_getUserContracts";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface Contract {
  id: number;
  user_id: number;
  address: string;
}

export default function Home() {
  const {isConnected} = useMetaMaskConnection();
  const [contracts, setContracts] = useState<Contract[]>([]);
  console.log('isConnected', isConnected);

  useEffect(() => {

    if (isConnected && !contracts.length) {
      getUserContracts();
    }
  }, [contracts.length, isConnected]);

  async function getUserContracts() {
    const contracts: object[] = await _getUserContracts();

    if (Array.isArray(contracts)) {
      setContracts(contracts as Contract[]);
    }
  }

  return (
    <div className="p-4">
      <main>
        <ConnectButton isConnected={isConnected}/>

        <div className="flex flex-col items-center">
          <h1
            className="text-4xl font-extrabold dark:text-white">Мои контракты</h1>
          {!isConnected ? <button>Загрузить мои контракты</button> : null}

          {isConnected && !contracts.length ? (
            <button>Контрактов еще нет. Создайте свой первый контракт</button>
          ) : (
            <div className={`flex flex-wrap gap-x-20 gap-y-8 px-40 py-20`}>
              {contracts.map((contractItem: Contract) => (
                <div key={contractItem.id} className={`border border-gray-900/25 cursor-pointer p-12`}>
                  <p className={'font-semibold'}>Контракт № {contractItem.id}</p>
                  <p>Адрес контракта: {contractItem.address}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}