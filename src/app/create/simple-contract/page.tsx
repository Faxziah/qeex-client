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
    <div className="simple-contract">
      <div className="simple-contract__container">
        <h2 className="title">Создайте смарт-контракт</h2>
        <p className="subtitle">
          Смарт-контракт с Вашим уникальным текстом будет сохранен в сети блокчейн навечно
        </p>
        <form onSubmit={createContract} className="simple-contract__form">
          <label htmlFor="contract_text" className="simple-contract__label">
            Текст смарт-контракта
          </label>
          <textarea
            id="contract_text"
            name="contract_text"
            rows={7}
            className="simple-contract__textarea"
            onBlur={getCreateContractInfo}
          />
          <button type="submit" className="simple-contract__button">
            Создать смарт-контракт
          </button>
        </form>
      </div>

      {transactionFee && <TransactionFee transactionFee={transactionFee}/>}
    </div>
  );
}