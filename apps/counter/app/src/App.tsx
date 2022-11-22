import Header from "./components/header";
import HomePage from "./pages/home";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const localStorageKey = "walletAdapter";
  const endpoint = useMemo(() => "http://localhost:8899", []);
  const wallets = useMemo(
    () => [new SolflareWalletAdapter(), new PhantomWalletAdapter()],
    []
  );

  return (
    <div className="h-screen">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider
          localStorageKey={localStorageKey}
          wallets={wallets}
          autoConnect
        >
          <WalletModalProvider>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default App;
