import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <header className="shadow-md bg-white">
      <div className="container mx-auto flex justify-center py-4">
        {/* logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-8 md:h-10" />
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
