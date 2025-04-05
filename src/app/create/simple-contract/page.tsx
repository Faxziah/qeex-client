'use client';

import React, {useState} from "react";
import {_createContract} from "@/app/create/services/_createContract";
import {_getCreateContractInfo} from "@/app/create/services/_getCreateContractInfo";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";
import {useModal} from "@/app/context/ModalContext";
import {TransactionFeeInfo} from "@/app/interface/IContract";
import TransactionFee from "@/app/create/components/TransactionFee";

export default function Home() {
  const {isConnected} = useMetaMaskConnection();
  const {showModal, showModalError} = useModal();
  const [transactionFee, setTransactionFee] = useState<TransactionFeeInfo | undefined>(undefined);

  async function createContract(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConnected) {
      showModal('Необходимо подключить кошелек');
      return;
    }

    const formData = new FormData(event.currentTarget);
    let contractText = formData.get("contract_text") as string;
    contractText = contractText.trim();

    if (!contractText) {
      showModal('Необходимо ввести текст');
      return;
    }

    try {
      await _createContract(contractText);
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message);
      } else {
        showModalError('Неизвестная ошибка');
      }
    }
  }

  async function getCreateContractInfo(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.preventDefault();

    if (!isConnected) {
      return;
    }

    const contractText = event.target.value.trim();

    if (!contractText) {
      return;
    }

    try {
      const _transactionFee: TransactionFeeInfo | undefined = await _getCreateContractInfo(contractText);
      setTransactionFee(_transactionFee);
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message);
      } else {
        showModalError('Неизвестная ошибка');
      }
    }
  }

  return (
    <div>
      <div className={'flex flex-col items-center'}>
        <h2 className={'title'}>Создайте смарт-контракт</h2>
        <p className={'subtitle'}>Смарт-контракт с Вашим уникальным текстом будет сохранен в сети блокчейн
          навечно</p>
        <form onSubmit={createContract} className={'flex flex-col pt-[18px] w-[500px]'}>
          <label htmlFor="contract_text" className={'label'}>
            Текст смарт-контракта
          </label>
          <textarea
            id="contract_text"
            name="contract_text"
            rows={7}
            className={'input mt-[10px] px-[10px] py-[12px]'}
            onBlur={getCreateContractInfo}
          />
          <button className={'button-2 mt-[18px]'}>Создать смарт-контракт</button>
        </form>
      </div>

      {transactionFee && <TransactionFee transactionFee={transactionFee}/>}
    </div>
  );
}