import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";

import { ConnectWalletButton } from "./connect_wallet";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <Navbar>
        <Navbar.Brand href="https://hypotenuse.ca/">
          <img
            src="https://hypotenuse.ca/img/navbar-logo2.png"
            className="mr-3 h-6 sm:h-9"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Hypotenuse Labs
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <ConnectWalletButton />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={location.pathname == "/"}>
            Home
          </Navbar.Link>
          <Navbar.Link
            href="/messaging"
            active={location.pathname == "/messaging"}
          >
            Messaging
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
