import * as react from "react";
import { ConnectWalletButton } from "./connect_wallet";
import NotePad from "./notes";
const HomePage = () => {
  return (
    <div>
      <ConnectWalletButton />
      <NotePad />
    </div>
  );
};

export default HomePage;
