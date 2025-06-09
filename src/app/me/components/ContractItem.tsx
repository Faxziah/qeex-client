"use client"

import { useState } from "react"
import Link from "next/link"
import type { IContract } from "@/app/interface/IContract"
import { formatDate } from "@/app/helpers/formatDate"
import "../../styles/contract-item.css"

interface ContractItemProps {
  contract: IContract
}

const ContractItem = ({ contract }: ContractItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`contract-item ${isExpanded ? "expanded" : ""}`}>
      <div className="contract-item-header" onClick={toggleExpand}>
        <div className="contract-item-title">
          <h3>{contract.contract_type_id}</h3>
          <span className={`contract-item-status ${contract.status.toLowerCase()}`}>{contract.status}</span>
        </div>
        <div className="contract-item-type">{contract.address}</div>
        <div className="contract-item-toggle">
          <span className="toggle-icon">{isExpanded ? "−" : "+"}</span>
        </div>
      </div>

      <div className="contract-item-content">
        <div className="contract-item-details">
          <div className="contract-item-detail">
            <span className="detail-label">Адрес контракта:</span>
            <span className="detail-value address">
              <a
                href={`https://etherscan.io/address/${contract.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="address-link"
              >
                {contract.address}
              </a>
            </span>
          </div>
          <div className="contract-item-detail">
            <span className="detail-label">Сеть:</span>
            <span className="detail-value">{contract.contract_type_id}</span>
          </div>
          <div className="contract-item-detail">
            <span className="detail-label">Дата создания:</span>
            <span className="detail-value">{formatDate(contract.created_at)}</span>
          </div>
          {contract.status && (
            <div className="contract-item-detail">
              <span className="detail-label">Описание:</span>
              <span className="detail-value">{contract.block_number}</span>
            </div>
          )}
        </div>

        <div className="contract-item-actions">
          <Link href={`/contract/${contract.id}`} className="btn btn-primary">
            Управление
          </Link>
          <button className="btn btn-secondary">Экспорт ABI</button>
        </div>
      </div>
    </div>
  )
}

export default ContractItem
