'use client';

import React from "react";
import {_createContract} from "@/app/create/services/_createContract";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";
import {useModal} from "@/app/context/ModalContext";

export default function Home() {
  const {isConnected} = useMetaMaskConnection();
  const {showModal} = useModal();

  async function createContract(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConnected) {
      showModal('Ошибка', 'Необходимо подключить кошелек', 'error');
      return;
    }

    const formData = new FormData(event.currentTarget);
    let contractText = formData.get("contract_text") as string;
    contractText = contractText.trim();

    if (!contractText) {
      showModal('Ошибка', 'Необходимо ввести текст', 'error');
      return;
    }

    await _createContract(contractText);
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
          />
          <button className={'button-2 mt-[18px]'}>Создать смарт-контракт</button>
        </form>
      </div>
    </div>
  );
}