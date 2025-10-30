import { useAuth } from "../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>("");

  useEffect(() => {
    if (location.pathname.includes("/profile")) setActiveMenu("profile");
    else if (location.pathname.includes("/change-password"))
      setActiveMenu("change-password");
    else if (location.pathname.includes("/purchases"))
      setActiveMenu("purchases");
    else setActiveMenu("");
  }, [location.pathname]);

  const getMenuClass = (menuKey: string) =>
    `px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
      activeMenu === menuKey
        ? "text-primary-200 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="container mx-auto my-10 min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* NAV */}
      <nav className="bg-white border-b md:border-b-0 md:border-r p-4 md:p-6 flex flex-col md:w-2/10 w-full">
        {/* Avatar + name */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden bg-white border border-gray-200">
            <img
              src={
                user?.avatar ||
                "https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
              }
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="mt-2 font-semibold text-sm md:text-base text-center">
            {user?.name || "User Name"}
          </h2>
          <Link
            to="/user/account/profile"
            className="text-xs md:text-sm text-primary-200 hover:underline mt-1"
          >
            Edit Profile
          </Link>
        </div>

        {/* MENU */}
        <ul className="flex md:flex-col justify-center md:justify-start gap-4 md:gap-3 text-sm md:text-base">
          {/* ❌ Ẩn "My Account" khi ở mobile */}
          <li className="hidden md:block">
            <Link
              to="/user/account/profile"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700"
            >
              My Account
            </Link>
          </li>

          <li>
            <Link
              to="/user/account/profile"
              onClick={() => setActiveMenu("profile")}
              className={getMenuClass("profile")}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/user/account/change-password"
              onClick={() => setActiveMenu("change-password")}
              className={getMenuClass("change-password")}
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link
              to="/user/purchases"
              onClick={() => setActiveMenu("purchases")}
              className={getMenuClass("purchases")}
            >
              My Purchase
            </Link>
          </li>
        </ul>
      </nav>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-6 bg-white shadow-sm rounded">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
