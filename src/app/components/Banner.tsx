import Image from "next/image";
import Link from "next/link";
import ConnectButton from "@/app/components/ConnectButton";
import "@/app/styles/banner.css";

export default function Banner() {
  return (
    <div className={'banner-container'}>
      <div className={'banner'}>
        <div className={'banner-text-image-container'}>
          <div className={'banner-text-container'}>
            <h1 className={'banner__title title-2'}>Создай свой первый смарт-контракт в блокчейн
              с <br/><span>SWAP MASTER</span>
            </h1>
            <h2 className={'subtitle-2'}>Твой уникальный смарт-контракт будет сохранен в блокчейн навечно</h2>
            <div className={'banner-buttons-container'}>
              <Link className={'button-3'} href="/create/simple-contract">Создать смарт-контракт</Link>
              <Link className={'button-transparent'} href="/#contracts-type-container">Виды смарт-контрактов</Link>
            </div>
          </div>
          <div className={'banner-image-container'}>
            <Image
              src="/images/banner.png"
              width={500}
              height={500}
              alt="Banner"
              className={'banner-image'}
            />
          </div>
        </div>
        <div className={'banner-slides-container'}>
          <div className={'banner-slide'}>
            <h3>Подключите кошелек Metamask</h3>
            <h4><ConnectButton/></h4>
          </div>
          <div className={'banner-slide'}>
            <h3>Выбери смарт-контракт</h3>
            <h4><Link href="/create/simple-contract">И заполни информацию о смарт-контракте</Link></h4>
          </div>
          <div className={'banner-slide'}>
            <h3>Подтвердите транзакции</h3>
            <h4><Link href="/create/simple-contract">Первая транзакция - скромная комиссия сервиса, вторая - создание
              твоего уникального
              смарт-контракта</Link></h4>
          </div>
          <div className={'banner-slide'}>
            <h3>Перейдите в личный кабинет</h3>
            <h4><Link href="/me">Отслеживай свои смарт-контракты в личном
              кабинете</Link></h4>
          </div>
        </div>
      </div>
    </div>
  );
}