import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import logoutApi from "../api/userApi/logoutApi";

const LoginDropdown = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    // Xóa cookie token nếu cần gọi API logout backend
    await logoutApi();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <Link to="/login" className="flex items-center space-x-2 cursor-pointer">
        <FaRegUserCircle size={25} />
        <span className="hidden md:inline-block text-lg font-medium">
          Login
        </span>
      </Link>
    );
  }

  return (
    <div
      className="relative flex items-center space-x-2 cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <FaRegUserCircle size={25} className="cursor-pointer" />
      <span className="hidden md:inline-block text-lg font-medium">
        {user?.name || "My Account"}
      </span>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 w-48 bg-white border rounded shadow-lg z-50">
          <Link
            to="/user/account/profile"
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            My Account
          </Link>
          <Link
            to="/user/purchases"
            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            My Purchase
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
