'use client';

import {ethers} from "ethers";
import {IEverlastingContract} from "@/app/interface/IEverlastingContract";
import {EVERLASTING_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {ModalContextProps} from "@/app/context/ModalContext";
import {voidFunction} from "@/app/helpers/voidFunction";
import {IContract} from "@/app/interface/IContract";

export async function _getSimpleContractInfo(
  contract: IContract,
  showModal: ModalContextProps['showModal'],
  signer: ethers.ContractRunner
): Promise<void> {

  try {
    const everlastingContractAbi = await fetch(EVERLASTING_CONTRACT_TEMPLATE_PATH);
    const {abi: contractAbi} = await everlastingContractAbi.json();

    const simpleContract = new ethers.Contract(contract.address, contractAbi, signer) as unknown as IEverlastingContract;

    const text = await simpleContract.getText();

    showModal(`Смарт-контракт ${contract.address}`, text ?? "", undefined, voidFunction, voidFunction, true);

  } catch (e: any) {
    console.error('error _getSimpleContractInfo', e);
    showModal("Ошибка", "Не удалось получить текст контракта: " + e.message, 'error');
  }
}
