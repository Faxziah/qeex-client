"use client";

import {type IContract, ContractStatusRus, ContractTypeRus, ContractType} from "@/app/interface/IContract";
import {_getSimpleContractInfo} from "@/app/me/services/_getSimpleContractInfo";
import {formatDateDMYHI} from "@/app/helpers/formatDate";
import {useModal} from "@/app/context/ModalContext";
import Link from "next/link";
import {getChainById} from "@/app/interface/Chains";
import {_getERC20ContractInfo} from "@/app/me/services/_getERC20ContractInfo";
import {_getERC721ContractInfo} from "@/app/me/services/_getERC721ContractInfo";

const statusStyles = {
  new: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  paid: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  wait_deployment:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  deployed:
    "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  error: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
};

const contractTypeIcons = {
  [ContractType.ERC20]: "💰",
  [ContractType.ERC721]: "🖼️",
  [ContractType.SIMPLE_CONTRACT]: "📄",
};

export default function ContractItem({contract}: { contract: IContract }) {
  const {showModal} = useModal();

  const handleContractAction = () => {
    if (contract.contract_type_id === ContractType.ERC20) {
      _getERC20ContractInfo(contract, showModal);
    } else if (contract.contract_type_id === ContractType.ERC721) {
      _getERC721ContractInfo(contract, showModal);
    } else {
      _getSimpleContractInfo(contract, showModal);
    }
  };

  const getActionText = () => {
    switch (contract.contract_type_id) {
      case ContractType.ERC20:
        return "Нажмите для просмотра информации о криптовалюте";
      case ContractType.ERC721:
        return "Нажмите для просмотра информации об NFT-токене";
      default:
        return "Нажмите для просмотра текста смарт-контракта";
    }
  };

  return (
    <div
      className="group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 transition-all duration-200 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-600 hover:-translate-y-1 text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Contract Icon */}
          <div
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm">
            <span className="text-white text-lg">{contractTypeIcons[contract.contract_type_id] || "📄"}</span>
          </div>

          {/* Block Number */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Блок № {contract.block_number}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {ContractTypeRus[contract.contract_type_id]}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${statusStyles[contract.status] || statusStyles.new}`}
        >
          {ContractStatusRus[contract.status]}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Network Info */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Сеть {getChainById(contract.chain_id)?.name ?? "Неизвестно"}
          </span>
        </div>

        {/* Owner Address */}
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-medium">Владелец:</span>{" "}
          <code className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-xs">
            {contract.user.address.slice(0, 6)}...{contract.user.address.slice(-4)}
          </code>
        </div>

        {/* Creation Date */}
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <span className="font-medium">Создан:</span> {formatDateDMYHI(contract.created_at)}
        </div>

        {/* Contract Address */}
        <div className="pt-2">
          {
            (() => {
              const chain = getChainById(contract.chain_id);
              if (chain?.explorerUrl) {
                return (
                  <Link
                    href={`${chain.explorerUrl}address/${contract.address}`}
                    target="_blank"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium"
                  >
                    <span>Адрес контракта</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                );
              } else {
                return (
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium">Адрес:</span>{" "}
                    <code
                      className="bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-xs">{contract.address}</code>
                  </div>
                );
              }
            })()
          }
        </div>
      </div>

      {/* Action Area */}
      <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={handleContractAction}
          className="group/btn w-full flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 cursor-pointer"
        >
          <span
            className="text-sm text-neutral-700 dark:text-neutral-300 group-hover/btn:text-neutral-900 dark:group-hover/btn:text-white">
            {getActionText()}
          </span>
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-neutral-400 group-hover/btn:text-neutral-600 dark:group-hover/btn:text-neutral-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
