import ConnectButton from "@/app/create/components/ConnectButton";
import ContractCreateForm from "@/app/create/components/ContractCreateForm";

export default function Home() {
  return (
    <div className="p-4">
      <main>
        <ConnectButton/>
        <ContractCreateForm/>
      </main>
    </div>
  );
}