import Link from 'next/link';
import SectionTitle from "@/app/components/SectionTitle";
import "@/app/styles/contracts-type.css";

export default function ContractsType() {
  return (
    <div className={'contracts-type-container'} id={'contracts-type-container'}>
      <SectionTitle
        title={'Виды смарт-контрактов'}
        subtitle={'Ты можешь создать различные смарт-контракты'}
        background={'Contracts'}
      />
      <div className={'contracts-type'}>
        <div className={'contract-type'}>
          <h4 className={'title-2 contract-type-title'}>Простой смарт-контракт</h4>
          <h4 className={'subtitle-2 contract-type-subtitle'}>Простой смарт-контракт позволяет тебе создать свой
            смарт-контракт с уникальным
            текстом, который будет хранится вечно в блокчейне</h4>

          <Link href="/create/simple-contract" className={'button-transparent contract-type-button'}>Перейти к
            созданию</Link>
        </div>

        <div className={'contract-type'}>
          <h4 className={'title-2 contract-type-title'}>Криптовалюта</h4>
          <h4 className={'subtitle-2 contract-type-subtitle'}>Криптовалюта, или ERC-20 токен, позволяет
            тебе создать собственную валюту. Цена на нее может взлететь</h4>
          <Link href="/create/erc-20" className={'button-transparent contract-type-button'}>Перейти к созданию</Link>
        </div>

        <div className={'contract-type'}>
          <h4 className={'title-2 contract-type-title'}>NFT-токен</h4>
          <h4 className={'subtitle-2 contract-type-subtitle'}>NFT-токен, или ERC-721, позволяет
            тебе создать уникальный и неповторимый токен. Возможно, даже произведение искусства</h4>
          <Link href="/create/nft" className={'button-transparent contract-type-button'}>Перейти к созданию</Link>
        </div>
      </div>
    </div>
  );
}