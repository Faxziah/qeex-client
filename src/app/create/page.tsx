'use client';

import ConnectButton from "@/app/create/components/ConnectButton";
import ContractCreateForm from "@/app/create/components/ContractCreateForm";
import {useMetaMaskConnection} from "@/app/create/hooks/useMetaMaskConnection";

export default function Home() {
  const {isConnected} = useMetaMaskConnection();

  return (
    <div className="p-4">
      <main>
        <ConnectButton isConnected={isConnected}/>
        <ContractCreateForm isConnected={isConnected}/>
      </main>
    </div>
  );
}