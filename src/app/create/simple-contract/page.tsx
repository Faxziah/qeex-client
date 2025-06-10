"use client"

import type React from "react"
import { useState } from "react"
import { _createContract } from "@/app/create/services/_createContract"
import { _getCreateContractInfo } from "@/app/create/services/_getCreateContractInfo"
import { useMetaMaskConnection } from "@/app/hooks/useMetaMaskConnection"
import { useModal } from "@/app/context/ModalContext"
import type { TransactionFeeInfo } from "@/app/interface/IContract"
import TransactionFee from "@/app/create/components/TransactionFee"

export default function Home() {
  const { isConnected } = useMetaMaskConnection()
  const { showModal, showModalError } = useModal()
  const [transactionFee, setTransactionFee] = useState<TransactionFeeInfo | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [contractText, setContractText] = useState("")

  async function createContract(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isConnected) {
      showModal("Необходимо подключить кошелек")
      return
    }

    const formData = new FormData(event.currentTarget)
    let contractText = formData.get("contract_text") as string
    contractText = contractText.trim()

    if (!contractText) {
      showModal("Необходимо ввести текст")
      return
    }

    setIsLoading(true)
    try {
      await _createContract(contractText)
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

  async function getCreateContractInfo(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.preventDefault()

    if (!isConnected) {
      return
    }

    const contractText = event.target.value.trim()

    if (!contractText) {
      return
    }

    try {
      const _transactionFee: TransactionFeeInfo | undefined = await _getCreateContractInfo(contractText)
      setTransactionFee(_transactionFee)
    } catch (e: unknown) {
      if (e instanceof Error) {
        showModalError(e.message)
      } else {
        showModalError("Неизвестная ошибка")
      }
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContractText(e.target.value)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-16 sm:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-300 bg-clip-text text-transparent mb-6">
              Создайте смарт-контракт
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Твой смарт-контракт с уникальным текстом будет сохранен в сети блокчейн навсегда
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 sm:p-10">
            <form onSubmit={createContract} className="space-y-6">
              {/* Form Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Текст смарт-контракта</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Введите любой текст, который хотите сохранить в блокчейне
                  </p>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  id="contract_text"
                  name="contract_text"
                  rows={8}
                  value={contractText}
                  onChange={handleTextChange}
                  onBlur={getCreateContractInfo}
                  placeholder="Ваня Кисляков из 9Б, с днем рождения!!"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />

                {/* Character Counter */}
                <div className="absolute bottom-3 right-3 text-xs text-neutral-400 dark:text-neutral-500">
                  {contractText.length} символов
                </div>
              </div>

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
                    Для создания смарт-контракта необходимо подключить MetaMask кошелек
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isConnected || !contractText.trim() || isLoading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Создание контракта...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Создать смарт-контракт</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Transaction Fee Section */}
      {transactionFee && (
        <TransactionFee transactionFee={transactionFee} />
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
