"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Какая стоимость создания смарт-контракта?",
    answer:
      "Стоимость складывается из комиссии сервиса в размере $1 (в ETH) и газа сети (эта сумму получает сеть, сервис ее не получает)",
  },
  {
    question: "Как создать смарт-контракт?",
    answer:
      "Выберите тип контракта, заполните необходимые поля, подтвердите транзакцию в кошельке и дождитесь подтверждения в блокчейне.",
  },
  {
    question: "Где я могу посмотреть созданные смарт-контракты?",
    answer:
      "Все созданные контракты можно посмотреть в разделе 'Мои контракты' в личном кабинете или через блокчейн-эксплорер по адресу контракта.",
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full py-12 md:py-16 lg:py-20" id={'faq'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Responsive Section Title */}
          <div className="relative text-center mb-12 md:mb-16 lg:mb-10">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-gray-600 bg-clip-text opacity-20 select-none -mt-20 md:-mt-24 lg:-mt-32">
                FAQ
              </span>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-0">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6 text-center text-gray-900 dark:text-white">
                FAQ
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
                <div className="w-2 h-2 bg-gray-800 dark:bg-white rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="w-full max-w-4xl space-y-4 md:space-y-6">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left pt-4 pb-6 md:py-6 group hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-all duration-200 ${
                        openItems.includes(index) ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 md:pb-6">
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
