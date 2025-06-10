import Link from "next/link"

export default function ContractsType() {
  return (
    <div className="w-full py-12 md:py-16 lg:py-20" id={'contracts-type'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Responsive Section Title */}
          <div className="relative text-center mb-12 md:mb-16 lg:mb-10">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-gray-600 bg-clip-text opacity-20 select-none -mt-20 md:-mt-24 lg:-mt-32">
                CONTRACTS
              </span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-0">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6 text-center text-gray-900 dark:text-white">
                Смарт-контракты
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
                <div className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ты можешь создать различные смарт-контракты
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mt-12 md:mt-16">
            {/* Простой смарт-контракт */}
            <div
              className="rounded-2xl md:rounded-3xl lg:rounded-[32px] bg-gradient-to-br from-cyan-200 via-blue-200 to-blue-300 p-8 md:p-10 lg:p-12 xl:p-[50px] flex flex-col justify-between items-center text-center xl:col-span-1 h-full">
              <div className="flex flex-col items-center">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-800">
                  Простой смарт-контракт
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 md:mb-12 lg:mb-16 leading-relaxed">
                  Простой смарт-контракт позволяет тебе создать свой смарт-контракт с уникальным текстом, который будет
                  хранится вечно в блокчейне
                </p>
              </div>
              <Link
                href="/create/simple-contract"
                className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 rounded-full text-gray-800 font-medium hover:bg-white/20 transition-all duration-300 text-sm md:text-base mt-auto"
              >
                Перейти к созданию
              </Link>
            </div>

            {/* Криптовалюта */}
            <div
              className="rounded-2xl md:rounded-3xl lg:rounded-[32px] bg-gradient-to-br from-pink-200 via-purple-200 to-purple-300 p-8 md:p-10 lg:p-12 xl:p-[50px] flex flex-col justify-between items-center text-center h-full">
              <div className="flex flex-col items-center">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-800">
                  Криптовалюта
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 md:mb-12 lg:mb-16 leading-relaxed">
                  Криптовалюта, или ERC-20 токен, позволяет тебе создать собственную валюту. Цена на нее может взлететь
                </p>
              </div>
              <Link
                href="/create/cryptocurrency"
                className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 rounded-full text-gray-800 font-medium hover:bg-white/20 transition-all duration-300 text-sm md:text-base mt-auto"
              >
                Перейти к созданию
              </Link>
            </div>

            {/* NFT-токен */}
            <div
              className="rounded-2xl md:rounded-3xl lg:rounded-[32px] bg-gradient-to-br from-cyan-200 via-blue-200 to-purple-200 p-8 md:p-10 lg:p-12 xl:p-[50px] flex flex-col justify-between items-center text-center lg:col-span-2 xl:col-span-1 h-full">
              <div className="flex flex-col items-center">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-800">
                  NFT-токен
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 md:mb-12 lg:mb-16 leading-relaxed">
                  NFT-токен, или ERC-721, позволяет тебе создать уникальный и неповторимый токен. Возможно, даже
                  произведение искусства
                </p>
              </div>
              <Link
                href="/create/nft"
                className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-white/30 rounded-full text-gray-800 font-medium hover:bg-white/20 transition-all duration-300 text-sm md:text-base mt-auto"
              >
                Перейти к созданию
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
