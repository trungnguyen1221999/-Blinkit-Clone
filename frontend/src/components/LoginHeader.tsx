import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <header className="bg-white shadow-lg border-b border-slate-200">
      <div className="container mx-auto flex justify-center py-6 md:py-8">
        <Link 
          to="/" 
          className="hover:scale-105 transition-transform duration-200 group"
        >
          <img 
            src={logo} 
            alt="Blinkit Logo" 
            className="h-10 md:h-12 group-hover:brightness-110 transition-all duration-200" 
          />
        </Link>
      </div>
    </header>
  );
};

export default LoginHeader;
