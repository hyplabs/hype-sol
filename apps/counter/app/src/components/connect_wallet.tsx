import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button, Dropdown } from "flowbite-react";
import { MdContentCopy, MdLogout, MdSwapHoriz } from "react-icons/md";

export const ConnectWalletButton = () => {
  const { wallet, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  if (!wallet || !publicKey) {
    return (
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Connect Wallet
      </Button>
    );
  }

  const copyAddressHandler = async () => {
    await navigator.clipboard.writeText(publicKey.toBase58());
  };

  const changeWalletHandler = async () => {
    setVisible(true);
  };

  const base58 = publicKey.toBase58();

  return (
    <Dropdown label="Connected">
      <Dropdown.Header>
        <span className="block text-sm">{wallet.adapter.name}</span>
        <span className="block text-sm font-medium truncate">
          {base58.slice(0, 8) + ".." + base58.slice(36, 44)}
        </span>
      </Dropdown.Header>
      <Dropdown.Item icon={MdContentCopy} onClick={copyAddressHandler}>
        Copy address
      </Dropdown.Item>
      <Dropdown.Item icon={MdSwapHoriz} onClick={changeWalletHandler}>
        Change wallet
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={MdLogout} onClick={disconnect}>
        Disconnect
      </Dropdown.Item>
    </Dropdown>
  );
};
