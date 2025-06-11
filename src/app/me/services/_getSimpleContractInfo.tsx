'use client';

import {ethers} from "ethers";
import {IEverlastingContract} from "@/app/interface/IEverlastingContract";
import {EVERLASTING_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {ModalContextProps} from "@/app/context/ModalContext";
import {voidFunction} from "@/app/helpers/voidFunction";
import {IContract} from "@/app/interface/IContract";
import {IChain} from "@/app/interface/Chains";
import {getChainById} from "@/app/interface/Chains";

export async function _getSimpleContractInfo(
  contract: IContract,
  showModal: ModalContextProps['showModal']
): Promise<void> {

  if (!window.ethereum) {
    showModal("Ошибка", "MetaMask не установлен.", 'error');
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const network = await provider.getNetwork();
    if (contract.chain_id !== Number(network.chainId)) {
      const chain: IChain | undefined = getChainById(contract.chain_id);

      if (!chain) {
        showModal("Ошибка", "Сеть не поддерживается", 'error');
        return;
      }

      showModal("Ошибка", `Необходимо переключиться на сеть контракта ${chain.name}`, 'error');
      return;
    }

    const everlastingContractAbi = await fetch(EVERLASTING_CONTRACT_TEMPLATE_PATH);
    const {abi: contractAbi} = await everlastingContractAbi.json();

    const simpleContract = new ethers.Contract(contract.address, contractAbi, provider) as unknown as IEverlastingContract;

    const text = await simpleContract.getText();

    showModal(`Смарт-контракт ${contract.address}`, text ?? "", undefined, voidFunction, voidFunction, true);

  } catch (e: any) {
    console.error('error _getSimpleContractInfo', e);
    showModal("Ошибка", "Не удалось получить текст контракта: " + e.message, 'error');
  }
}
