import { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

const Login = () => {
  const { isLogin, user } = useContext(LoginContext)!;

  return (
    <Link to={"/login"} className="flex space-x-2 items-center">
      <div className="scale-90 md:scale-100">
        <FaRegUserCircle size={25} />
      </div>
      {isLogin ? (
        <p className="text-lg font-medium hidden md:block">{user?.name}</p>
      ) : (
        <p className="text-lg font-medium hidden md:block">Login</p>
      )}
    </Link>
  );
};

export default Login;
