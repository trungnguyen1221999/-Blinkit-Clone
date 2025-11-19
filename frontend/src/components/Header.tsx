import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logoMobo from "../assets/logo_mobile.png";
import Search from "./Search";
import Login from "./Login";
import Cart from "./Cart";
import ProductDropdown from "./ProductDropdown";

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto flex p-4 md:p-6 justify-between items-center gap-4 md:gap-6">
        {/* Logo */}
        <Link 
          to={"/"} 
          className="hidden sm:block sm:w-32 md:w-40 hover:scale-105 transition-transform duration-200"
        >
          <img src={logo} alt="Blinkit Logo" className="w-full h-auto" />
        </Link>
        <Link 
          to={"/"} 
          className="block sm:hidden w-20 hover:scale-105 transition-transform duration-200"
        >
          <img src={logoMobo} alt="Blinkit Mobile Logo" className="w-full h-auto" />
        </Link>

        {/* Products Dropdown */}
        <div className="hidden sm:block">
          <ProductDropdown />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <Search />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Login />
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
