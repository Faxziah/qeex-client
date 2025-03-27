'use client';

import React, {useState} from "react";
import {IContract} from "@/app/me/interface/IContract";
import {_getContract} from "@/app/me/services/_getContract";
import Modal from "@/app/components/Modal";


export default function Contract({id, address}: IContract) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contractText, setContractText] = useState<string>('');

  async function getContract(contractAddress: string) {
    const contractText: string | undefined = await _getContract(contractAddress);
    setIsModalOpen(true);
    setContractText(contractText ?? '');
  }

  return (
    <div>
      <div className={`border border-gray-900/25 cursor-pointer px-12 pt-8 pb-30 w-150 h-30`}
           onClick={() => getContract(address)}>
        <p className={'font-semibold'}>Контракт № {id}</p>
        <p>Адрес контракта: {address}</p>
      </div>
      <Modal isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)} title={`Контракт ${address}`}>
        <div dangerouslySetInnerHTML={{__html: contractText}}/>
      </Modal>
    </div>

  );
}
