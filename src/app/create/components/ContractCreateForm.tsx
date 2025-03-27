"use client";

import React from "react";
import {_createContract} from "@/app/create/services/_createContract";

interface props {
  isConnected: boolean;
}

export default function ConnectButton({isConnected}: props) {

  async function createContract(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isConnected) {
      alert("Please install MetaMask");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const contractText = formData.get("contract_text") as string;

    await _createContract(contractText);
  }

  return (
    <div>
      <main className="flex justify-center items-center">

        <form onSubmit={createContract}>
          <div className="space-y-12">

            <div className="pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Создайте свой контракт с уникальным текстом в
                блокчейн</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Контракт с Вашим уникальным текстом будет сохранен в сети блокчейн навечно
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="contract_text" className="block text-sm/6 font-medium text-gray-900">
                    Текст контракта
                  </label>
                  <div className="mt-2">
                <textarea
                  id="contract_text"
                  name="contract_text"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                {/*<button type="button" className="text-sm/6 font-semibold text-gray-900">*/}
                {/*  Cancel*/}
                {/*</button>*/}
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}