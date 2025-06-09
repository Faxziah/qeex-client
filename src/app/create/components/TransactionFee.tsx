"use client"
import type { TransactionFeeInfo } from "@/app/interface/IContract"

export default function TransactionFee({ transactionFee }: { transactionFee: TransactionFeeInfo }) {
  const totalFee =
    Number.parseFloat(String(transactionFee.fee)) + Number.parseFloat(String(transactionFee.blockchainFee))

  return (
    <div className="bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Стоимость транзакции</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Детализация комиссий за создание смарт-контракта
              </p>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-4">
            {/* Service Fee */}
            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-neutral-900 dark:text-white">Комиссия сервиса</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">Плата за использование платформы</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-neutral-900 dark:text-white">${transactionFee.fee}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">USD</div>
              </div>
            </div>

            {/* Network Fee */}
            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-neutral-900 dark:text-white">Комиссия сети</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Gas fee для выполнения транзакции
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                  ${transactionFee.blockchainFee}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">USD</div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 dark:border-neutral-600 my-4"></div>

            {/* Total */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-emerald-900 dark:text-emerald-300">Общая стоимость</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-400">Итоговая сумма к оплате</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-300">${totalFee.toFixed(3)}</div>
                <div className="text-sm text-emerald-700 dark:text-emerald-400">USD</div>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Информация о комиссиях</h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  Комиссия сети может изменяться в зависимости от загруженности блокчейна. Окончательная сумма будет
                  подтверждена в MetaMask перед выполнением транзакции.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
