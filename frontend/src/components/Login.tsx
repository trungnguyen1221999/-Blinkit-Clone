import { FaRegUserCircle } from "react-icons/fa";

const Login = () => {
  return (
    <button className="flex space-x-2 items-center">
      <FaRegUserCircle size={25} />
      <p className="text-lg font-medium hidden md:block">Login</p>
    </button>
  );
};

export default Login;
