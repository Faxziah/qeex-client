"use client";

import {useState, useEffect} from "react";

import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";
import {_getUserContracts} from "@/app/me/services/_getUserContracts";
import Contract from "@/app/me/components/Contract";
import {IContract} from "@/app/interface/IContract";
import Link from 'next/link';

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
          <h2 className={'title'}>Мои смарт-контракты</h2>

          {!isConnected ?
            <p className={'mt-[76px] text-[20px]'}>Для загрузки смарт-контрактов нужно подключить кошелек</p> : null}

          {isConnected && !contracts.length ? (

            <Link href="/create/simple-contract" className={'mt-[76px] text-[20px] hover:text-gray-400'}>Смарт-контрактов
              еще нет. Создайте
              свой первый смарт-контракт</Link>
          ) : (
            <div className={`flex flex-wrap gap-x-16 gap-y-8 px-40 py-20 items-list`}>
              {contracts.map((contract: IContract) => (
                <Contract key={contract.id} contract={contract}/>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
    ;
}