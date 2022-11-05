import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Inbox from "./components/messaging/inbox";
import Onboarding from "./components/messaging/onboarding";
import HomePage from "./pages/home";
import MessagingPage from "./pages/messaging";

const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new SolflareWalletAdapter()], []);

  return (
    <div className="h-screen">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/messaging" element={<MessagingPage />}>
                <Route path="/messaging/" element={<Onboarding />} />
                <Route path="/messaging/:address" element={<Inbox />} />
              </Route>
            </Routes>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default App;
