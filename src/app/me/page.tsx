import ConnectButton from "@/app/create/components/ConnectButton";

export default function Home() {
  return (
    <div className="p-4">
      <main>
        <ConnectButton/>

        <div className="flex flex-col items-center">
          <h1
            className="text-4xl font-extrabold dark:text-white">Мои контракты</h1>
        </div>
      </main>
    </div>
  );
}