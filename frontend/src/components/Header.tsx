import logo from "../assets/logo.png";
import Search from "./Search";
const Header = () => {
  return (
    <header className="h-20 shadow-md">
      <div className="container mx-auto flex p-5 justify-between items-center">
        {/* logo */}
        <div>
          <img src={logo} width={120} alt="logo" />
        </div>
        {/* search bar */}
        <Search />
        {/* cart */}
        login and cart
      </div>
      ;
    </header>
  );
};

export default Header;
