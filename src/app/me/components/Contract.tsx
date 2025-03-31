'use client';

import React from "react";
import {IContract} from "@/app/me/interface/IContract";
import {_getContract} from "@/app/me/services/_getContract";
import {formatDateDMYHI} from "@/app/helpers/formatDate";
import {useModal} from "@/app/context/ModalContext";
import {voidFunction} from "@/app/helpers/voidFunction";
import Image from "next/image";

export default function Contract({id, chain_id, address, created_at}: IContract) {
  const {showModal} = useModal();

  async function getContract(contractAddress: string) {
    const contractText: string | undefined = await _getContract(contractAddress);
    showModal(`Смарт-контракт ${address}`, contractText ?? '', undefined, voidFunction, voidFunction, true);
  }

  return (
    <div className={'item'}>
      <div className={'item-title'}>
        <div className={'item-logo'}>
          <Image
            src={'/svg/simple-contract.svg'}
            width={40}
            height={40}
            alt="Simple contract icon"
            className={'svg'}
          />
        </div>
        <h3>Смарт-контракт блока № {id}</h3>
      </div>
      <div className={'item-info'}>
        <div className={'item-description'}>
          <h4>Сеть № {chain_id}</h4>
          <h5>Адрес владельца: {address}</h5>
          <h4>Адрес смарт-контракта: {address}</h4>
          <h3>Дата создания: {formatDateDMYHI(created_at)}</h3>
        </div>
        <div className={'item-preview'} onClick={() => getContract(address)}>
          <p>Нажмите для просмотра текста смарт-контракта</p>
        </div>
        <div className={'item-tools'}>
          <Image
            src={'/svg/pencil.svg'}
            width={15}
            height={15}
            alt="Show contract"
            onClick={() => getContract(address)}
            className={'svg'}
          />
        </div>
      </div>
    </div>
  );
}
