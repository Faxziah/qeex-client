'use client';

import React from "react";
import {IContract} from "@/app/me/interface/IContract";
import {_getContract} from "@/app/me/services/_getContract";
import {formatDateDMYHI} from "@/app/helpers/formatDate";
import {useModal} from "@/app/context/ModalContext";
import {voidFunction} from "@/app/helpers/voidFunction";

export default function Contract({id, chain_id, address, created_at}: IContract) {
  const {showModal} = useModal();

  async function getContract(contractAddress: string) {
    const contractText: string | undefined = await _getContract(contractAddress);
    showModal(`Контракт ${address}`, contractText ?? '', undefined, voidFunction, voidFunction, true);
  }

  return (
    <div>
      <div className={`border border-gray-900/25 cursor-pointer px-8 pt-8 pb-32 w-150 h-30`}
           onClick={() => getContract(address)}>
        <p className={'font-semibold'}>Контракт № {id}</p>
        <p className={'font-semibold'}>Сеть № {chain_id}</p>
        <p>Адрес контракта: {address}</p>
        <p>Дата создания: {formatDateDMYHI(created_at)}</p>
      </div>
    </div>
  );
}
