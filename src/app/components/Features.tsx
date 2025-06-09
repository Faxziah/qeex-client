import Image from "next/image"

export default function Features() {
  return (
    <div className="w-full pt-0 pb-24 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Responsive Section Title */}
          <div className="relative text-center mb-12 md:mb-16 lg:mb-10">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-gray-600 bg-clip-text opacity-20 select-none -mt-20 md:-mt-24 lg:-mt-32">
                FEATURES
              </span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6 mt-32 lg:mt-0 text-gray-900 dark:text-white">
                Выделяйся. Просто. Быстро.
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
                <div className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Создай смарт-контракт, который всегда будет с тобой и делись с кем-угодно
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-16 md:gap-20 lg:gap-0 w-full max-w-6xl">
            {/* Feature 1 - Image Left, Text Right */}
            <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-4 lg:gap-6">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72">
                  <Image
                    src="/images/feature-1.png"
                    fill
                    alt="Feature 1"
                    className="object-contain scale-110 md:scale-115"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 relative inline-block group text-gray-900 dark:text-white">
                  <span className="absolute -left-7 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 group-hover:bg-[#B2EBF2] transition-colors"></span>
                  <span className="group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] transition-colors">
                    Поздравь креативно с днем рождения
                  </span>
                </h4>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  "Кирилл, с днем рождения! Тебе сегодня 21!"
                </p>
              </div>
            </div>

            {/* Feature 2 - Text Left, Image Right */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-2 md:gap-4 lg:gap-6">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72">
                  <Image
                    src="/images/feature-2.png"
                    fill
                    alt="Feature 2"
                    className="object-contain scale-110 md:scale-115"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 relative inline-block group text-gray-900 dark:text-white">
                  <span className="absolute -left-7 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 group-hover:bg-[#B2EBF2] transition-colors"></span>
                  <span className="group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] transition-colors">
                    Оставь послание в будущее
                  </span>
                </h4>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  "Сейчас 2025 год, ИИ скоро захватит мир!"
                </p>
              </div>
            </div>

            {/* Feature 3 - Image Left, Text Right */}
            <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-4 lg:gap-6">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <div className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72">
                  <Image
                    src="/images/feature-3.png"
                    fill
                    alt="Feature 3"
                    className="object-contain scale-110 md:scale-115"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 relative inline-block group text-gray-900 dark:text-white">
                  <span className="absolute -left-7 top-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-y-1/2 group-hover:bg-[#B2EBF2] transition-colors"></span>
                  <span className="group-hover:text-[#0891b2] dark:group-hover:text-[#B2EBF2] transition-colors">
                    Подшути над другом
                  </span>
                </h4>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  "Игорь Семякин, ты теперь в блокчейне))"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
