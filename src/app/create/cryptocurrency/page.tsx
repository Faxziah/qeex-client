"use client"

import type React from "react"
import { useState } from "react"
import { useMetaMaskConnection } from "@/app/hooks/useMetaMaskConnection"
import { useModal } from "@/app/context/ModalContext"
import type { TransactionFeeInfo, CryptocurrencyFormData } from "@/app/interface/IContract"
import TransactionFee from "@/app/create/components/TransactionFee"
import { _getCreateCryptocurrencyInfo } from "@/app/create/services/_getCreateCryptocurrencyInfo"
import { _createCryptocurrency } from "../services/_createCryptocurrency"

export default function CreateCryptocurrency() {
  const { isConnected } = useMetaMaskConnection()
  const { showModal, showModalError } = useModal()
  const [transactionFee, setTransactionFee] = useState<TransactionFeeInfo | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CryptocurrencyFormData>({
    name: "",
    symbol: "",
    totalSupply: "",
  })

  async function createCryptocurrency(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isConnected) {
      showModal("Необходимо подключить кошелек")
      return
    }

    if (!formData.name || !formData.symbol || !formData.totalSupply) {
      showModal("Необходимо заполнить все поля")
      return
    }

    setIsLoading(true)
    try {
      await _createCryptocurrency(formData)
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message)
      } else {
        showModalError("Неизвестная ошибка")
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function getCreateContractInfo() {
    if (!isConnected) {
      return
    }

    if (!formData.name || !formData.symbol || !formData.totalSupply) {
      return
    }

    try {
      const _transactionFee = await _getCreateCryptocurrencyInfo(formData)
      setTransactionFee(_transactionFee)
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message)
        console.log("error", e.message)
      } else {
        showModalError("Неизвестная ошибка")
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInputBlur = () => {
    getCreateContractInfo()
  }

  const isFormValid = formData.name && formData.symbol && formData.totalSupply

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-16 sm:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-teal-400 bg-clip-text text-transparent mb-6">
              Создайте криптовалюту
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Создайте свою собственную криптовалюту на базе стандарта ERC-20
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 sm:p-10">
            <form onSubmit={createCryptocurrency} className="space-y-8">
              {/* Form Header */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">Параметры токена</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Настройте основные характеристики вашей криптовалюты
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Token Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Название криптовалюты
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Например: My Token"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Полное название вашего токена (например, "Bitcoin", "Ethereum")
                  </p>
                </div>

                {/* Token Symbol */}
                <div>
                  <label
                    htmlFor="symbol"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Символ криптовалюты
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                    </div>
                    <input
                      id="symbol"
                      name="symbol"
                      type="text"
                      value={formData.symbol}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Например: MTK"
                      maxLength={10}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 uppercase"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Краткое обозначение (BTC, ETH, MTK)
                  </p>
                </div>

                {/* Total Supply */}
                <div>
                  <label
                    htmlFor="totalSupply"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Общее количество токенов
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      id="totalSupply"
                      name="totalSupply"
                      type="number"
                      value={formData.totalSupply}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Например: 1000000"
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Максимальное количество токенов в обращении
                  </p>
                </div>
              </div>

              {/* Token Preview */}
              {isFormValid && (
                <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                  <h4 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 mb-4">
                    Предварительный просмотр токена
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{formData.name}</div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-500">Название</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        {formData.symbol.toUpperCase()}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-500">Символ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        {Number(formData.totalSupply).toLocaleString()}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-500">Общий объем</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Connection Warning */}
              {!isConnected && (
                <div className="flex items-center space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-sm text-amber-700 dark:text-amber-300">
                    Для создания криптовалюты необходимо подключить MetaMask кошелек
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isConnected || !isFormValid || isLoading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Создание криптовалюты...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    <span>Создать криптовалюту</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Transaction Fee Section */}
      {transactionFee && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-(--background)">
          <TransactionFee transactionFee={transactionFee}/>
        </div>
      )}

      <style jsx>{`
          @keyframes blob {
              0% {
                  transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
