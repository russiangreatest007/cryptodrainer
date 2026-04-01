'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { createConfig, WagmiProvider, Config } from 'wagmi';
import { mainnet, bsc, sepolia } from 'viem/chains';
import { 
  RainbowKitProvider, 
  getDefaultWallets 
} from '@rainbow-me/rainbowkit';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@rainbow-me/rainbowkit/styles.css';
import '@solana/wallet-adapter-react-ui/styles.css';

const queryClient = new QueryClient();

const chains = [mainnet, bsc, sepolia];
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'DEMO_PROJECT_ID';

const { chains: fastChains, publicClient } = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
  },
});

const config = createConfig({
  chains: fastChains,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sepolia.id]: http(),
  },
});

const solanaNetwork = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(solanaNetwork);
const solanaWallets = [
  new PhantomWalletAdapter(),
  new BackpackWalletAdapter(),
];

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={solanaWallets} autoConnect>
              <WalletModalProvider>
                {children}
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}