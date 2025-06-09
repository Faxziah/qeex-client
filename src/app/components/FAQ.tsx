import SectionTitle from "@/app/components/SectionTitle";
import AccordionItem from "@/app/components/AccordionItem";
import "@/app/styles/faq.css";

export default function FAQ() {

  return (
    <div className={'faq-container'} id={'faq-container'}>
      <SectionTitle
        title={'FAQ'}
        background={'FAQ'}
      />

      <div className={'faq'}>
        <div className="accordion">
          <AccordionItem title={'Какая стоимость создания смарт-контракта?'}
                         content={'Стоимость складывается из комиссии сервиса в размере $1 (в ETH) и газа сети (эта сумму получает сеть, сервис ее не получает)'}/>
          <AccordionItem title={'Как создать смарт-контракт?'}
                         content={'Подключите криптокошелек, создания выбранного смарт-контракта, заполните нужные данные и подтвердите транзакцию для загрузки смарт-контракта в сеть блокчейна'}/>
          <AccordionItem title={'Где я могу посмотреть созданные смарт-контракты?'}
                         content={'Созданные смарт-контракты доступны, как в личном кабинете, так и на официальном сайт сети - etherscan'}/>
        </div>
      </div>
    </div>
  );
}