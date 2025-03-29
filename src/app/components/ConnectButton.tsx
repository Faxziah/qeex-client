"use client";

import React, {useEffect} from "react";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";


export default function ConnectButton() {
  const {isConnected, connect} = useMetaMaskConnection();

  return (
    <div>
      <button
        type="button"
        className={"text underline-violet"}
        onClick={connect}
      >
        {isConnected ? "Подключено" : "Подключить кошелек"}
      </button>
    </div>
  );
}