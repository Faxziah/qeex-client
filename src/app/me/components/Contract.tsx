'use client';

import React from "react";
import {IContract} from "@/app/interface/IContract";
import {_getContract} from "@/app/me/services/_getContract";
import {formatDateDMYHI} from "@/app/helpers/formatDate";
import {useModal} from "@/app/context/ModalContext";
import {voidFunction} from "@/app/helpers/voidFunction";
import Image from "next/image";
import Link from 'next/link';
import {Chains} from "@/app/constants/chains";

export default function Contract({contract}: { contract: IContract }) {
  const {showModal} = useModal();

  async function getContract(contractAddress: string) {
    const contractText: string | undefined = await _getContract(contractAddress);
    showModal(`Смарт-контракт ${contract.address}`, contractText ?? '', undefined, voidFunction, voidFunction, true);
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
        <h3>Блок № {contract.block_number}</h3>
        <div className={'item-status'}>{contract.status}</div>
      </div>
      <div className={'item-info'}>
        <div className={'item-description'}>
          <h4>Сеть {Chains[contract.chain_id].name ?? 'Неизвестно'}</h4>
          <h5>Адрес владельца: {contract.user.address}</h5>
          <h3>Дата создания: {formatDateDMYHI(contract.created_at)}</h3>

          {Chains[contract.chain_id].explorerUrl ? (

            <Link
              href={Chains[contract.chain_id].explorerUrl + 'address/' + contract.address}
              target={'_blank'}
              className={'pt-[16px] inline-block'}>
              <button className={'button-2'}>Адрес смарт-контракта: {contract.address}</button>
            </Link>
          ) : (
            <h4>Адрес смарт-контракта: {contract.address}</h4>
          )}
        </div>
        <div className={'item-preview'} onClick={() => getContract(contract.address)}>
          <p>Нажмите для просмотра текста смарт-контракта</p>
        </div>
        <div className={'item-tools'}>
          <Image
            src={'/svg/pencil.svg'}
            width={15}
            height={15}
            alt="Show contract"
            onClick={() => getContract(contract.address)}
            className={'svg'}
          />
        </div>
      </div>
    </div>
  );
}
