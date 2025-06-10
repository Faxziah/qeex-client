"use client"

import type React from "react"
import { useState } from "react"
import { useMetaMaskConnection } from "@/app/hooks/useMetaMaskConnection"
import { useModal } from "@/app/context/ModalContext"
import type { TransactionFeeInfo, NftFormData } from "@/app/interface/IContract"
import TransactionFee from "@/app/create/components/TransactionFee"
import { _createNft } from "@/app/create/services/_createNft"
import { _getCreateNftInfo } from "@/app/create/services/_getCreateNftInfo"

export default function CreateNft() {
  const { isConnected } = useMetaMaskConnection()
  const { showModal, showModalError } = useModal()
  const [transactionFee, setTransactionFee] = useState<TransactionFeeInfo | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<NftFormData>({
    name: "",
    symbol: "",
    baseUri: "",
  })

  async function createNft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isConnected) {
      showModal("Необходимо подключить кошелек")
      return
    }

    if (!formData.name || !formData.symbol || !formData.baseUri) {
      showModal("Необходимо заполнить все поля")
      return
    }

    setIsLoading(true)
    try {
      await _createNft(formData)
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

    if (!formData.name || !formData.symbol || !formData.baseUri) {
      return
    }

    try {
      const _transactionFee = await _getCreateNftInfo(formData)
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

  const isFormValid = formData.name && formData.symbol && formData.baseUri
  const isValidUri =
    formData.baseUri && (formData.baseUri.startsWith("ipfs://") || formData.baseUri.startsWith("https://"))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-16 sm:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div
            className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div
            className="absolute top-0 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div
            className="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
              Создайте NFT Токен
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Создай свой собственный NFT Токен на базе стандарта ERC-721
            </p>
          </div>

          {/* Main Form Card */}
          <div
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 sm:p-10">
            <form onSubmit={createNft} className="space-y-8">
              {/* Form Header */}
              <div className="flex items-center space-x-3 mb-8">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">Параметры NFT коллекции</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Настройте основные характеристики вашей NFT коллекции
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* NFT Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Название NFT коллекции
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
                      placeholder="Например: My Awesome NFT"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Полное название вашей NFT коллекции (например, "Bored Ape Yacht Club")
                  </p>
                </div>

                {/* NFT Symbol */}
                <div>
                  <label
                    htmlFor="symbol"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Символ NFT коллекции
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
                      placeholder="Например: MANFT"
                      maxLength={10}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 uppercase"
                    />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Краткое обозначение коллекции (BAYC, PUNK, MANFT)
                  </p>
                </div>

                {/* Base URI */}
                <div>
                  <label
                    htmlFor="baseUri"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Базовый URI метаданных
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <input
                      id="baseUri"
                      name="baseUri"
                      type="text"
                      value={formData.baseUri}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Например: ipfs://QmWfNfJ.../ или https://api.example.com/metadata/"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        formData.baseUri && !isValidUri
                          ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                          : "border-neutral-300 dark:border-neutral-600 focus:ring-purple-500"
                      }`}
                    />
                    {formData.baseUri && isValidUri && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      URL-адрес, где хранятся метаданные NFT (изображения, описания, атрибуты)
                    </p>
                    {formData.baseUri && !isValidUri && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        URI должен начинаться с "ipfs://" или "https://"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* NFT Preview */}
              {isFormValid && isValidUri && (
                <div
                  className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-4">
                    Предварительный просмотр NFT коллекции
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-700 dark:text-purple-400">{formData.name}</div>
                      <div className="text-sm text-purple-600 dark:text-purple-500">Название коллекции</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-700 dark:text-purple-400">
                        {formData.symbol.toUpperCase()}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-500">Символ</div>
                    </div>
                    <div className="text-center sm:col-span-2 lg:col-span-1">
                      <div className="text-xl font-bold text-purple-700 dark:text-purple-400">ERC-721</div>
                      <div className="text-sm text-purple-600 dark:text-purple-500">Стандарт токена</div>
                    </div>
                  </div>

                  {/* URI Preview */}
                  <div
                    className="mt-4 p-3 bg-white dark:bg-neutral-700 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-1">Базовый URI:</div>
                    <div className="text-xs text-purple-700 dark:text-purple-400 font-mono break-all">
                      {formData.baseUri}
                    </div>
                  </div>
                </div>
              )}

              {/* URI Info Card */}
              <div
                className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5"
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
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      Что такое базовый URI?
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-400 mb-3">
                      Базовый URI — это адрес, где хранятся метаданные ваших NFT. Каждый токен будет иметь уникальный
                      ID, который добавляется к базовому URI для получения полного адреса метаданных.
                    </p>
                    <div className="text-xs text-blue-700 dark:text-blue-500 space-y-1">
                      <div>
                        <strong>Пример:</strong> Базовый URI: <code>ipfs://QmHash.../</code>
                      </div>
                      <div>
                        <strong>Токен #1:</strong> <code>ipfs://QmHash.../1</code>
                      </div>
                      <div>
                        <strong>Токен #2:</strong> <code>ipfs://QmHash.../2</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Warning */}
              {!isConnected && (
                <div
                  className="flex items-center space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
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
                    Для создания NFT коллекции необходимо подключить MetaMask кошелек
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isConnected || !isFormValid || !isValidUri || isLoading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Создание NFT коллекции...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Создать NFT коллекцию</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Transaction Fee Section */}
      {transactionFee && (
        <TransactionFee transactionFee={transactionFee}/>
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
