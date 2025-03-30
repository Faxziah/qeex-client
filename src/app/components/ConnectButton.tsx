"use client";

import React from "react";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";

export default function ConnectButton() {
  const {isConnected, connect} = useMetaMaskConnection();

  return (
    <div>
      <button
        type="button"
        className={"text underline-violet cursor-pointer pt-[8px] px-[16px] pb-[24px]"}
        onClick={connect}
      >
        {isConnected ? "Подключено" : "Подключить кошелек"}
      </button>
    </div>
  );
}