import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const ConnectWalletButton = () => {
  const { wallet, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  if (!wallet || !publicKey) {
    return <button onClick={() => setVisible(true)}>Connect wallet</button>;
  }
  const changeWalletHandler = async () => {
    setVisible(true);
  };
  const base58 = publicKey.toBase58();
  return (
    <div>
      <div>{wallet.adapter.name}</div>
      <div>{base58.slice(0, 8) + ".." + base58.slice(36, 44)}</div>
      <button onClick={changeWalletHandler}>Change wallet</button>
      <button onClick={disconnect}>DIsconnect</button>
    </div>
  );
};
