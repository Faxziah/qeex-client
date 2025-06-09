'use client';

import React from "react";
import {IContract, ContractStatusRus, ContractTypeRus, ContractType} from "@/app/interface/IContract";
import {_getContract} from "@/app/me/services/_getContract";
import {formatDateDMYHI} from "@/app/helpers/formatDate";
import {useModal} from "@/app/context/ModalContext";
import {voidFunction} from "@/app/helpers/voidFunction";
import Image from "next/image";
import Link from 'next/link';
import {Chains} from "@/app/constants/chains";
import "@/app/styles/contract-item.css";
import {ethers} from "ethers";
import {NFT_CONTRACT_TEMPLATE_PATH, TOKEN_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";

export default function ContractItem({contract}: { contract: IContract }) {
  const {showModal} = useModal();

  async function getContract(contractAddress: string) {
    const contractText: string | undefined = await _getContract(contractAddress);
    showModal(`Смарт-контракт ${contract.address}`, contractText ?? '', undefined, voidFunction, voidFunction, true);
  }

  async function getERC20ContractInfo(contractAddress: string) {
    if (typeof window.ethereum === 'undefined') {
      showModal('Ошибка', 'MetaMask не установлен.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const erc20ContractAbi = await fetch(TOKEN_CONTRACT_TEMPLATE_PATH);
      const {abi: contractAbi} = await erc20ContractAbi.json();

      const erc20Contract = new ethers.Contract(contractAddress, contractAbi, provider);

      const name = await erc20Contract.name();
      const symbol = await erc20Contract.symbol();
      const decimals = await erc20Contract.decimals();
      const totalSupply = ethers.formatUnits(await erc20Contract.totalSupply(), decimals);

      const contractBalance = ethers.formatUnits(await provider.getBalance(contractAddress), 18);
      const userTokenBalance = ethers.formatUnits(await erc20Contract.balanceOf(contract.user.address), decimals);

      const modalContent = `
        <p><strong>Название:</strong> ${name}</p>
        <p><strong>Символ:</strong> ${symbol}</p>
        <p><strong>Общее предложение:</strong> ${totalSupply}</p>
        <p><strong>Адрес смарт-контракта:</strong> ${contractAddress}</p>
        <p><strong>Баланс контракта (ETH):</strong> ${contractBalance}</p>
        <p><strong>Ваш баланс токенов:</strong> ${userTokenBalance} ${symbol}</p>
      `;

      showModal(`Информация о криптовалюте ${symbol}`, modalContent, undefined, voidFunction, voidFunction, true);
    } catch (error) {
      console.error("Error fetching ERC20 contract info:", error);
      showModal('Ошибка', 'Не удалось получить информацию о криптовалюте.');
    }
  }

  async function getERC721ContractInfo(contractAddress: string) {
    if (typeof window.ethereum === 'undefined') {
      showModal('Ошибка', 'MetaMask не установлен.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const erc721ContractAbi = await fetch(NFT_CONTRACT_TEMPLATE_PATH);
      const {abi: contractAbi} = await erc721ContractAbi.json();

      const erc721Contract = new ethers.Contract(contractAddress, contractAbi, provider);

      const name = await erc721Contract.name();
      const symbol = await erc721Contract.symbol();
      const baseUri = await erc721Contract.tokenURI(0);

      let imageUrl = '';
      try {
        const metadataResponse = await fetch(baseUri);
        const metadata = await metadataResponse.json();
        if (metadata.image) {
          imageUrl = metadata.image;
        }
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
      }

      const modalContent = `
        ${imageUrl ? `<img src="${imageUrl}" alt="NFT Image" class="nft-modal-image"/>` : ''}
        <p><strong>Название:</strong> ${name}</p>
        <p><strong>Символ:</strong> ${symbol}</p>
        <p><strong>URI:</strong> ${baseUri}</p>
        <p><strong>Адрес смарт-контракта:</strong> ${contractAddress}</p>
      `;

      showModal(`Информация об NFT-токене ${symbol}`, modalContent, undefined, voidFunction, voidFunction, true);
    } catch (error) {
      console.error("Error fetching ERC721 contract info:", error);
      showModal('Ошибка', 'Не удалось получить информацию об NFT-токене.');
    }
  }

  return (
    <div className={'contract-item'}>
      <div className={'contract-item-title'}>
        <div className={'contract-item-logo'}>
          <Image
            src={'/svg/simple-contract.svg'}
            width={40}
            height={40}
            alt="Simple contract icon"
            className={'svg'}
          />
        </div>
        <h3>Блок № {contract.block_number}</h3>
        <div className={`contract-item-status ${contract.status}`}>
          <p>{ContractStatusRus[contract.status]}</p>
          <p className={'mt-2'}>{ContractTypeRus[contract.contract_type_id]}</p>
        </div>
      </div>
      <div className={'contract-item-info'}>
        <div className={'contract-item-description'}>
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
        <div className={'contract-item-preview'} onClick={() => {
          if (contract.contract_type_id === ContractType.ERC20) {
            getERC20ContractInfo(contract.address);
          } else if (contract.contract_type_id === ContractType.ERC721) {
            getERC721ContractInfo(contract.address);
          } else {
            getContract(contract.address);
          }
        }}>
          {contract.contract_type_id === ContractType.ERC20 && <p>Нажмите для просмотра информации о криптовалюте</p>}
          {contract.contract_type_id === ContractType.ERC721 && <p>Нажмите для просмотра информации об nft-токене</p>}
          {contract.contract_type_id === ContractType.SIMPLE_CONTRACT &&
            <p>Нажмите для просмотра текста смарт-контракта</p>}
        </div>
        <div className={'contract-item-tools'}>
          <Image
            src={'/svg/pencil.svg'}
            width={15}
            height={15}
            alt="Show contract"
            onClick={() => {
              if (contract.contract_type_id === ContractType.ERC20) {
                getERC20ContractInfo(contract.address);
              } else if (contract.contract_type_id === ContractType.ERC721) {
                getERC721ContractInfo(contract.address);
              } else {
                getContract(contract.address);
              }
            }}
            className={'svg'}
          />
        </div>
      </div>
    </div>
  );
}
