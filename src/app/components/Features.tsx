import Image from "next/image";
import "@/app/styles/features.css";
import SectionTitle from "@/app/components/SectionTitle";

export default function Features() {
  return (
    <div className={'features-container'}>
      <div className={'features'}>
        <SectionTitle
          title={'Выделяйся. Просто. Быстро.'}
          subtitle={'Создай смарт-контракт, который всегда будет с тобой и делись с кем-угодно'}
          background={'Features'}
        />

        <div className={'features-rows'}>
          <div className={'features-row'}>
            <div className={'features-row-image'}>
              <Image
                src={'/images/feature-1.png'}
                width={200}
                height={200}
                alt="Feature 1"
              />
            </div>
            <div className={'features-row-text'}>
              <h4 className={'title'}>Поздравь креативно с днем рождения</h4>
              <p className={'text'}>&#34;Кирилл, с днем рождения! Тебе сегодня 21!&#34;</p>
            </div>
          </div>

          <div className={'features-row'}>
            <div className={'features-row-text'}>
              <h4 className={'title'}>Оставь послание в будущее</h4>
              <p className={'text'}>&#34;Сейчас 2025 год, ИИ скоро захватит мир!&#34;</p>
            </div>
            <div className={'features-row-image'}>
              <Image
                src={'/images/feature-2.png'}
                width={200}
                height={200}
                alt="Feature 1"
              />
            </div>
          </div>

          <div className={'features-row'}>
            <div className={'features-row-image'}>
              <Image
                src={'/images/feature-3.png'}
                width={200}
                height={200}
                alt="Feature 1"
              />
            </div>
            <div className={'features-row-text'}>
              <h4 className={'title'}>Подшути над другом</h4>
              <p className={'text'}>&#34;Игорь Семякин, ты теперь в блокчейн))&#34;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}