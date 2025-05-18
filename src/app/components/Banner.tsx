import Image from "next/image";
import Link from 'next/link';
import ConnectButton from "@/app/components/ConnectButton";

export default function Banner() {
  return (
    <div className={'banner'}>
      <div className={'banner__container'}>
        <div className={'banner-text-image__container'}>
          <div className={'banner-text__container'}>
            <h1 className={'banner__title title-2'}>Создайте свой первый смарт-контракт в блокчейн
              с <br/><span>SWAP MASTER</span>
            </h1>
            <h2 className={'subtitle-2'}>Ваш уникальный смарт-контракт будет сохранен в блокчейн навечно</h2>
            <div className={'banner-buttons__container'}>
              <Link className={'button-3'} href="/create/simple-contract">Создать смарт-контракт</Link>
              <Link className={'button-transparent'} href="/create">Виды смарт-контрактов</Link>
            </div>
          </div>
          <div className={'banner-image__container'}>
            <Image
              src="/images/banner.png"
              width={500} height={500}
              alt="Logo"
              className={'banner-image'}
            />
          </div>
        </div>
        <div className={'banner-slides__container'}>
          <div className={'banner-slide'}>
            <h3>Подключите кошелек Metamask</h3>
            <h4><ConnectButton/></h4>
          </div>
          <div className={'banner-slide'}>
            <h3>Выберите смарт-контракт</h3>
            <h4><Link href="/create/simple-contract">И заполните нужные данные</Link></h4>
          </div>
          <div className={'banner-slide'}>
            <h3>Подтвердите транзакции</h3>
            <h4><Link href="/create">Первая транзакция - комиссия за работу сервиса, вторая - создание вашего
              смарт-контракта</Link></h4>
          </div>
          <div className={'banner-slide'}>
            <h3>Перейдите в личный кабинет</h3>
            <h4><Link href="/me">Отслеживайте свои смарт-контракты на странице &#34;Мои смарт-контракты&#34;</Link></h4>
          </div>
        </div>
      </div>
    </div>
  );
}