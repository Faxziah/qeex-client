import Image from "next/image";

export default function CreateContractButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
      <a
        className=" group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50 "
        href="/create/simple-contract">
        <div className="flex items-center justify-center w-5 h-5">
          <Image src="/svg/rocket.svg" width={20} height={20} alt="Rocket" className={'invert'}/>
        </div>
        <span className="relative">Создай свой первый смарт-контракт</span></a><a
      className=" group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 bg-transparent text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-black/30 focus:ring-gray-400/50 "
      href="/#contracts-type">
      <div className="flex items-center justify-center w-5 h-5">
        <Image src="/svg/contract.svg" width={20} height={20} alt="Contract" className={'svg'}/>
      </div>
      <span className="relative">Виды смарт-контрактов</span></a></div>
  )
}
