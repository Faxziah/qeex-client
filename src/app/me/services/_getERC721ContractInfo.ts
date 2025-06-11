import {ethers} from "ethers";
import {NFT_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {ModalContextProps} from "@/app/context/ModalContext";
import {IContract} from "@/app/interface/IContract";
import {voidFunction} from "@/app/helpers/voidFunction";
import {getChainById, IChain} from "@/app/interface/Chains";

export async function _getERC721ContractInfo(
  contract: IContract,
  showModal: ModalContextProps['showModal']
) {
  if (typeof window.ethereum === "undefined") {
    showModal("Ошибка", "MetaMask не установлен.", 'error');
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const erc721ContractAbi = await fetch(NFT_CONTRACT_TEMPLATE_PATH);
    const { abi: contractAbi } = await erc721ContractAbi.json();

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

    const erc721Contract = new ethers.Contract(contract.address, contractAbi, provider);

    const name = await erc721Contract.name();
    const symbol = await erc721Contract.symbol();
    const baseUri = await erc721Contract.tokenURI(0);

    let imageUrl = "";
    try {
      const metadataResponse = await fetch(baseUri);
      const metadata = await metadataResponse.json();
      if (metadata.image) {
        imageUrl = metadata.image;
      }
    } catch (error) {
      console.error("Error fetching NFT metadata:", error);
    }

    const modalContent = `
      ${imageUrl ? `<img src="${imageUrl}" alt="NFT Image" class="nft-modal-image"/>` : ""}
      <p><strong>Название:</strong> ${name}</p>
      <p><strong>Символ:</strong> ${symbol}</p>
      <p><strong>URI:</strong> ${baseUri}</p>
      <p><strong>Адрес смарт-контракта:</strong> ${contract.address}</p>
    `;

    showModal(`Информация об NFT-токене ${symbol}`, modalContent, undefined, voidFunction, voidFunction, true);
  } catch (error) {
    console.error("Error fetching ERC721 contract info:", error);
    showModal("Ошибка", "Не удалось получить информацию об NFT-токене.", 'error');
  }
} 