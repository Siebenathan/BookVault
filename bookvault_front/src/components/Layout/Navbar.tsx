import Button from "../inputs/Button";
import { useNavigate } from "react-router-dom";
import LinkComponentWithUnderline from "../inputs/LinkComponents/LinkComponentWithUnderline/LinkComponentWithUnderline";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className=" bg-bege max-h-32 flex justify-center items-center h-20">
      <div className="max-w-7xl justify-around flex items-center w-full h-full">
        <div className="h-28 w-1/4">
          <img
            src={`/images/logo_sem_fundo.png`}
            alt="Bookvault_logo"
            className="h-full"
          />
        </div>
        <ul className="flex justify-center gap-10 w-2/4 text-lg h-full items-center">
          <li className="text-2xl">
          <LinkComponentWithUnderline to="/books" linkText="Books" className="bg-bege"></LinkComponentWithUnderline>
          </li>
          <li className="text-2xl">
            <LinkComponentWithUnderline to="/" linkText="Authors" className="bg-bege"></LinkComponentWithUnderline>
          </li>
          <li className="text-2xl">
            <LinkComponentWithUnderline to="/perfil" linkText="Perfil" className="bg-bege"></LinkComponentWithUnderline>
          </li>
        </ul>
        <div className="w-1/4">
          <Button
            text="Sign in"
            onClick={() => {navigate("/login")}}
            className="bg-erin-green text-black text-2xl hover:bg-black-blacker shadow-md hover:text-white w-2/4 h-16 rounded-2xl"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
