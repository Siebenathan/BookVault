import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import LinkComponentWithUnderline from "../inputs/LinkComponents/LinkComponentWithUnderline/LinkComponentWithUnderline";

function Footer() {
  return (
    <footer className="bg-black-blacker w-full h-full max-h-[250px] flex justify-center">
      <div className="w-full max-w-[1280px] p-10 flex items-center justify-between">
        <img
          className="max-w-[100px] max-h-[100px] bg-white rounded-xl"
          src="/images/logo_sem_fundo.png"
          alt="BookVault-Logo"
        />
        <h1 className="text-white text-4xl">@BookVault</h1>
        <ul className="bg-white p-4 rounded-xl text-lg">
          <li>
            <LinkComponentWithUnderline linkText="Terms of service" to="/" />
          </li>
          <li className="flex items-center gap-1">
            Social Media:{" "}
            <a
              className="text-xl"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <FaFacebook className="text-blue-600" />
            </a>
            <a
              className="text-xl"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <FaInstagram />
            </a>
            <a className="text-xl" href="https://www.x.com/" target="_blank">
              <FaSquareXTwitter />
            </a>
          </li>
          <li>
            <LinkComponentWithUnderline linkText="Contact" to="/" />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
