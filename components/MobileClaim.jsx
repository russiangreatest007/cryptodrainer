import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function MobileClaim() {
  const { connected } = useWallet();
  
  return (
    <div className="w-full">
      <WalletMultiButton 
        className="!w-full !bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !font-bold !py-4 !px-6 !rounded-2xl !text-base hover:!from-blue-600 hover:!to-purple-700"
      />
      {!connected && (
        <p className="text-center text-white/70 text-xs mt-2">Connect Phantom/Backpack for SOL rewards</p>
      )}
    </div>
  );
}