'use client';

import React, {useState} from "react";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";
import {useModal} from "@/app/context/ModalContext";
import {TransactionFeeInfo, NftFormData} from "@/app/interface/IContract";
import TransactionFee from "@/app/create/components/TransactionFee";
import {_createNft} from "@/app/create/services/_createNft";
import {_getCreateNftInfo} from "@/app/create/services/_getCreateNftInfo";
import "@/app/styles/nft.css"; // We will create this file later

export default function CreateNft() {
  const {isConnected} = useMetaMaskConnection();
  const {showModal, showModalError} = useModal();
  const [transactionFee, setTransactionFee] = useState<TransactionFeeInfo | undefined>(undefined);
  const [formData, setFormData] = useState<NftFormData>({
    name: '',
    symbol: '',
    baseUri: '',
    maxSupply: ''
  });

  async function createNft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConnected) {
      showModal('Необходимо подключить кошелек');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.baseUri || !formData.maxSupply) {
      showModal('Необходимо заполнить все поля');
      return;
    }

    try {
      await _createNft(formData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message);
      } else {
        showModalError('Неизвестная ошибка');
      }
    }
  }

  async function getCreateContractInfo() {
    if (!isConnected) {
      return;
    }

    if (!formData.name || !formData.symbol || !formData.baseUri || !formData.maxSupply) {
      return;
    }

    try {
      const _transactionFee = await _getCreateNftInfo(formData);
      setTransactionFee(_transactionFee);
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message);
        console.log('error', e.message);
      } else {
        showModalError('Неизвестная ошибка');
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputBlur = () => {
    getCreateContractInfo();
  };

  return (
    <div className="nft-container">
      <div className="nft">
        <h2 className="title">Создайте NFT Токен</h2>
        <p className="subtitle">
          Создайте свой собственный NFT Токен на базе стандарта ERC-721
        </p>
        <form onSubmit={createNft} className="nft__form">
          <div className="nft__form-group">
            <label htmlFor="name" className="nft__label">
              Название NFT
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="nft__input"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: My Awesome NFT"
            />
          </div>

          <div className="nft__form-group">
            <label htmlFor="symbol" className="nft__label">
              Символ NFT
            </label>
            <input
              id="symbol"
              name="symbol"
              type="text"
              className="nft__input"
              value={formData.symbol}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: MANFT"
            />
          </div>

          <div className="nft__form-group">
            <label htmlFor="baseUri" className="nft__label">
              Базовый URI
            </label>
            <input
              id="baseUri"
              name="baseUri"
              type="text"
              className="nft__input"
              value={formData.baseUri}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: ipfs://QmWfNfJ.../"
            />
          </div>

          <div className="nft__form-group">
            <label htmlFor="maxSupply" className="nft__label">
              Максимальное количество токенов
            </label>
            <input
              id="maxSupply"
              name="maxSupply"
              type="number"
              className="nft__input"
              value={formData.maxSupply}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: 10000"
            />
          </div>

          <button type="submit" className="nft__button">
            Создать NFT Токен
          </button>
        </form>
      </div>

      {transactionFee && <TransactionFee transactionFee={transactionFee}/>}
    </div>
  );
} 