import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Link to={"/login"} className="flex space-x-2 items-center">
      <div className="scale-90 md:scale-100">
        <FaRegUserCircle size={25} />
      </div>
      <p className="text-lg font-medium hidden md:block">Login</p>
    </Link>
  );
};

export default Login;
