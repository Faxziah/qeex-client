import {ethers} from "ethers";
import {TOKEN_CONTRACT_TEMPLATE_PATH} from "@/app/constants/contractsTemplate";
import {ModalContextProps} from "@/app/context/ModalContext";
import {IContract} from "@/app/interface/IContract";
import {voidFunction} from "@/app/helpers/voidFunction";
import {IERC20} from "@/app/interface/IERC20";

export async function _getERC20ContractInfo(
  contract: IContract,
  showModal: ModalContextProps['showModal'],
  signer: ethers.ContractRunner,
  provider: ethers.BrowserProvider
) {
  if (typeof window.ethereum === "undefined") {
    showModal("Ошибка", "MetaMask не установлен.", 'error');
    return;
  }

  try {
    const erc20ContractAbi = await fetch(TOKEN_CONTRACT_TEMPLATE_PATH);
    const { abi: contractAbi } = await erc20ContractAbi.json();

    const erc20Contract = new ethers.Contract(contract.address, contractAbi, signer) as unknown as IERC20;

    const name = await erc20Contract.name();
    const symbol = await erc20Contract.symbol();
    const decimals = await erc20Contract.decimals();
    const totalSupply = ethers.formatUnits(await erc20Contract.totalSupply(), decimals);

    const contractBalance = ethers.formatUnits(await provider.getBalance(contract.address), 18);
    const userTokenBalance = ethers.formatUnits(await erc20Contract.balanceOf(contract.user.address), decimals);

    const modalContent = `
      <p><strong>Название:</strong> ${name}</p>
      <p><strong>Символ:</strong> ${symbol}</p>
      <p><strong>Общее предложение:</strong> ${totalSupply}</p>
      <p><strong>Адрес смарт-контракта:</strong> ${contract.address}</p>
      <p><strong>Баланс контракта (ETH):</strong> ${contractBalance}</p>
      <p><strong>Ваш баланс токенов:</strong> ${userTokenBalance} ${symbol}</p>
    `;

    showModal(`Информация о криптовалюте ${symbol}`, modalContent, undefined, voidFunction, voidFunction, true);
  } catch (error) {
    console.error("Error fetching ERC20 contract info:", error);
    showModal("Ошибка", "Не удалось получить информацию о криптовалюте.", 'error');
  }
} 