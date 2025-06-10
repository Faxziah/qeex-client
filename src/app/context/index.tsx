'use client'

import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, cookieToInitialState, type Config } from 'wagmi'
import { createAppKit } from '@reown/appkit/react'
import { config, networks, projectId, wagmiAdapter } from "@/app/config";
import { mainnet } from '@reown/appkit/networks'

const queryClient = new QueryClient()

const metadata = {
  name: 'Qeex',
  description: 'Qeex',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1/', // Replace YOUR_APP_URL
  icons: ['http://127.0.0.1/favicon.ico'], // Replace YOUR_ICON_URL
}

if (!projectId) {
  console.error("AppKit Initialization Error: Project ID is missing.");
} else {
  createAppKit({
    adapters: [wagmiAdapter],
    projectId: projectId!,
    networks: networks,
    defaultNetwork: mainnet,
    metadata,
    features: {
      analytics: true,
      email: false,
      swaps: false,
      onramp: false,
      socials: [],
      // @ts-ignore
      reownBranding: false // отключить внизу референсы к разработчикам
    },
    themeVariables: {
      "--w3m-accent": "#2563eb",
      "--w3m-border-radius-master": "1.5px",
    },
  })
}

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(config as Config, cookies)

  return (
    <WagmiProvider config={config as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}