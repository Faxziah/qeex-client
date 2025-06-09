import Image from "next/image"
import Link from "next/link"
import ConnectButton from "@/app/components/ConnectButton"

export default function Banner() {
  return (
    <div className="w-full pt-8 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 md:gap-16 lg:gap-24">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Создай свой первый смарт-контракт в блокчейн с{" "}
              <span className="bg-gradient-to-r from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0] text-transparent bg-clip-text">
                SWAP MASTER
              </span>
            </h1>

            <h2 className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
              Твой уникальный смарт-контракт будет сохранен в блокчейн навечно
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
              <Link
                href="/create/simple-contract"
                className="px-6 py-3 bg-[#B2EBF2] text-black font-medium rounded-full text-center hover:bg-opacity-90 transition-all"
              >
                Создать смарт-контракт
              </Link>
              <Link
                href="/#contracts-type-container"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-center text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Виды смарт-контрактов
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[520px] relative overflow-hidden">
              <Image src="/images/banner.png" fill alt="Banner" className="object-contain scale-150 z-0" priority />
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full backdrop-blur-lg bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="p-4 hover:bg-gray-100 dark:hover:bg-black/30 rounded-xl transition-all group">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] relative">
              <span className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#0891b2] dark:bg-[#B2EBF2] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Подключите кошелек Metamask
            </h3>
            <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
              <ConnectButton />
            </div>
          </div>

          <div className="p-4 hover:bg-gray-100 dark:hover:bg-black/30 rounded-xl transition-all group">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] relative">
              <span className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#0891b2] dark:bg-[#B2EBF2] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Выбери смарт-контракт
            </h3>
            <Link
              href="/create/simple-contract"
              className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white block"
            >
              И заполни информацию о смарт-контракте
            </Link>
          </div>

          <div className="p-4 hover:bg-gray-100 dark:hover:bg-black/30 rounded-xl transition-all group">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] relative">
              <span className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#0891b2] dark:bg-[#B2EBF2] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Подтвердите транзакции
            </h3>
            <Link
              href="/create/simple-contract"
              className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white block"
            >
              Первая транзакция - комиссия сервиса, вторая - создание твоего уникального смарт-контракта
            </Link>
          </div>

          <div className="p-4 hover:bg-gray-100 dark:hover:bg-black/30 rounded-xl transition-all group">
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] relative">
              <span className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#0891b2] dark:bg-[#B2EBF2] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              Перейдите в личный кабинет
            </h3>
            <Link
              href="/me"
              className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white block"
            >
              Отслеживай свои смарт-контракты в личном кабинете
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
