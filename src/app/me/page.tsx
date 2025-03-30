"use client";

import {useState, useEffect} from "react";

import ConnectButton from "@/app/components/ConnectButton";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";
import {_getUserContracts} from "@/app/me/services/_getUserContracts";
import Contract from "@/app/me/components/Contract";
import {IContract} from "@/app/me/interface/IContract";


export default function Home() {
  const {isConnected} = useMetaMaskConnection();
  const [contracts, setContracts] = useState<IContract[]>([]);

  useEffect(() => {

    if (isConnected && !contracts.length) {
      getUserContracts();
    }
  }, [contracts.length, isConnected]);

  async function getUserContracts() {
    const contracts = await _getUserContracts();

    if (Array.isArray(contracts)) {
      setContracts(contracts as IContract[]);
    }
  }

  return (
    <div>
      <main>
        <div className="flex flex-col items-center">
          <h1
            className="text-4xl font-extrabold dark:text-white">Мои контракты</h1>
          {!isConnected ? <button>Загрузить мои контракты</button> : null}

          {isConnected && !contracts.length ? (
            <button>Контрактов еще нет. Создайте свой первый контракт</button>
          ) : (
            <div className={`flex flex-wrap gap-x-16 gap-y-8 px-40 py-20`}>
              {contracts.map((contract: IContract) => (
                <Contract key={contract.id} {...contract}/>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
    ;
}