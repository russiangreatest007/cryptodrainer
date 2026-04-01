import { defineChain } from 'viem';
export const bsc = defineChain({
  id: 56,
  name: 'BSC Mainnet',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: { default: 'https://bsc-dataseed1.binance.org' }
});

export const config = {
  chains: [mainnet, bsc],
  transports: { /* RPCs */ }
};