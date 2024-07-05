import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export function getConfig() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

  if (!projectId) {
    throw new Error('NEXT_PUBLIC_WC_PROJECT_ID is not defined.');
  }

  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId }), // projectId değeri tanımlı ve undefined değilse burada kullanılıyor
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
