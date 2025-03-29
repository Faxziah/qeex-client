'use client';

import ConnectButton from "@/app/components/ConnectButton";
import ContractCreateForm from "@/app/create/components/ContractCreateForm";
import {useMetaMaskConnection} from "@/app/hooks/useMetaMaskConnection";

export default function Home() {
  const {isConnected} = useMetaMaskConnection();

  return (
    <div className="p-4">
      <main>
        <ConnectButton/>
        <ContractCreateForm isConnected={isConnected}/>
      </main>
    </div>
  );
}