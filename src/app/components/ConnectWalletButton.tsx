'use client';

import {ConnectButton, lightTheme, darkTheme} from "thirdweb/react";
import {anvil, mainnet, sepolia, arbitrum} from "thirdweb/chains";
import {createThirdwebClient} from "thirdweb";
import {createWallet, inAppWallet} from "thirdweb/wallets";
import {useActiveWalletChain} from "thirdweb/react";
import {useTheme} from "next-themes";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;
const client = createThirdwebClient({clientId});
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "telegram",
        "email",
        "phone",
        "facebook",
        "apple",
        "guest",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];
const chains = [anvil, mainnet, sepolia, arbitrum];

export default function ConnectWalletButton() {
  const chain = useActiveWalletChain();
  const {resolvedTheme} = useTheme();

  const theme =
    resolvedTheme === "dark"
      ? darkTheme({colors: {}})
      : lightTheme({colors: {}});

  const styles =
    resolvedTheme === "dark"
      ? {
        border: '1px solid #333333', backgroundColor: "#ffffff", color: "#171717",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
      }
      : {
        border: '1px solid #333333', backgroundColor: "#303030FF", color: "#ededed",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)"
      };

  return (
    <div>
      <ConnectButton
        client={client}
        wallets={wallets}
        chain={chain}
        chains={chains}
        connectModal={{
          title: "Подключи кошелек",
          size: "compact",
          showThirdwebBranding: false
        }}
        connectButton={{
          label: "Подключить кошелек",
          style: styles
        }}
        theme={theme}
      />
    </div>
  );
}
