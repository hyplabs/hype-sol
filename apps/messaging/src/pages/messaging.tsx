import { useWallet } from "@solana/wallet-adapter-react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

import Onboarding from "../components/messaging/onboarding";

const MessagingPage = () => {
  const { wallet, publicKey } = useWallet();

  let content = (
    <Alert
      color="info"
      additionalContent={
        <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
          Connect your wallet to access the messaging application.
        </div>
      }
      icon={HiInformationCircle}
    >
      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-800">
        Connect Wallet
      </h3>
    </Alert>
  );

  if (wallet && publicKey) {
    content = <Onboarding />;
  }

  return (
    <div className="container mx-auto">
      <section className="flex justify-center">{content}</section>
    </div>
  );
};

export default MessagingPage;
