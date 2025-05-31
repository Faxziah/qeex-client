'use client';

import React, {useState} from "react";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";
import {useModal} from "@/app/context/ModalContext";
import {TransactionFeeInfo, CryptocurrencyFormData} from "@/app/interface/IContract";
import TransactionFee from "@/app/create/components/TransactionFee";
import {_getCreateCryptocurrencyInfo} from "@/app/create/services/_getCreateCryptocurrencyInfo";
import "@/app/styles/cryptocurrency.css";
import { _createCryptocurrency } from "../services/_createCryptocurrency";

export default function CreateCryptocurrency() {
  const {isConnected} = useMetaMaskConnection();
  const {showModal, showModalError} = useModal();
  const [transactionFee, setTransactionFee] = useState<TransactionFeeInfo | undefined>(undefined);
  const [formData, setFormData] = useState<CryptocurrencyFormData>({
    name: '',
    symbol: '',
    totalSupply: ''
  });

  async function createCryptocurrency(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConnected) {
      showModal('Необходимо подключить кошелек');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.totalSupply) {
      showModal('Необходимо заполнить все поля');
      return;
    }

    try {
        await _createCryptocurrency(formData);
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

    if (!formData.name || !formData.symbol || !formData.totalSupply) {
      return;
    }

    try {
      const _transactionFee = await _getCreateCryptocurrencyInfo(formData);
      setTransactionFee(_transactionFee);
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message);
        console.log('error', e.message)
      } else {
        showModalError('Неизвестная ошибка');
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputBlur = () => {
    getCreateContractInfo();
  };

  return (
    <div className="cryptocurrency-container">
      <div className="cryptocurrency">
        <h2 className="title">Создайте криптовалюту</h2>
        <p className="subtitle">
          Создайте свою собственную криптовалюту на базе стандарта ERC-20
        </p>
        <form onSubmit={createCryptocurrency} className="cryptocurrency__form">
          <div className="cryptocurrency__form-group">
            <label htmlFor="name" className="cryptocurrency__label">
              Название криптовалюты
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="cryptocurrency__input"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: My Token"
            />
          </div>
          
          <div className="cryptocurrency__form-group">
            <label htmlFor="symbol" className="cryptocurrency__label">
              Символ криптовалюты
            </label>
            <input
              id="symbol"
              name="symbol"
              type="text"
              className="cryptocurrency__input"
              value={formData.symbol}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: MTK"
            />
          </div>

          <div className="cryptocurrency__form-group">
            <label htmlFor="total_supply" className="cryptocurrency__label">
              Общее количество токенов
            </label>
            <input
              id="total_supply"
              name="totalSupply"
              type="number"
              className="cryptocurrency__input"
              value={formData.totalSupply}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Например: 1000000"
            />
          </div>

          <button type="submit" className="cryptocurrency__button">
            Создать криптовалюту
          </button>
        </form>
      </div>

      {transactionFee && <TransactionFee transactionFee={transactionFee}/>}
    </div>
  );
} 