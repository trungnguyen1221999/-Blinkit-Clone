import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import Login from "./Login";
import Cart from "./Cart";
const Header = () => {
  return (
    <header className="shadow-md">
      <div className="container mx-auto flex p-5 justify-between items-center space-x-5">
        {/* logo */}
        <Link to={"/"}>
          <img src={logo} width={120} alt="logo" />
        </Link>
        {/* search bar */}
        <div>
          <Search />
        </div>
        {/* cart */}

        <div className="flex gap-3 md:gap-5 lg:gap-10">
          <Login />
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
