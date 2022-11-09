import { ConnectWalletButton } from "./connect_wallet";
import { Navbar } from "flowbite-react";

const Header = () => {
  return (
    <header>
      <Navbar className="max-w-xl mx-auto pb-12">
        <Navbar.Brand href="https://hypotenuse.ca/">
          <img
            src="https://hypotenuse.ca/img/navbar-logo2.png"
            className="mr-3 h-6 sm:h-9"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Hypotenuse Labs
          </span>
        </Navbar.Brand>
        <div className="flex left md:order-2">
          <ConnectWalletButton />
          <Navbar.Toggle />
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
