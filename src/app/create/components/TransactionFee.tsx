'use client';

import React from "react";
import {TransactionFeeInfo} from "@/app/interface/IContract";

export default function TransactionFee({transactionFee}: { transactionFee: TransactionFeeInfo }) {
  return (
    <div className={'transaction-fee'}>
      <div>
        <div className={'transaction-fee-row'}>
          <p>Комиссия:</p>
          <p>{transactionFee.fee}$</p>
        </div>
        <div className={'transaction-fee-row'}>
          <p>Комиссия сети:</p>
          <p>{transactionFee.blockchainFee}$</p>
        </div>
      </div>
    </div>
  );
}
