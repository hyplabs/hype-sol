import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Navbar } from "flowbite-react";

const Nav = () => {
  return (
    <>
      <div>
        <Navbar>
          <Navbar.Brand href="https://hypotenuse.ca/">
            <img
              src="https://hypotenuse.ca/img/navbar-logo2.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Hypotenuse Labs
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <WalletMultiButton className="custom" />
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="/navbars" active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">About</Navbar.Link>
            <Navbar.Link href="/navbars">Services</Navbar.Link>
            <Navbar.Link href="/navbars">Pricing</Navbar.Link>
            <Navbar.Link href="/navbars">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Nav;
