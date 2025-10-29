import { useAuth } from "../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // 🔹 state lưu menu active
  const [activeMenu, setActiveMenu] = useState<string>("");

  // 🔹 khi route thay đổi, set menu tương ứng
  useEffect(() => {
    if (location.pathname.includes("/profile")) setActiveMenu("profile");
    else if (location.pathname.includes("/change-password"))
      setActiveMenu("change-password");
    else if (location.pathname.includes("/purchases"))
      setActiveMenu("purchases");
    else setActiveMenu("");
  }, [location.pathname]);

  // 🔹 check parent active
  const isParentActive = (parent: string) => {
    if (parent === "my-account") {
      return activeMenu === "profile" || activeMenu === "change-password";
    }
    return activeMenu === parent;
  };

  // 🔹 class helper
  const getMenuClass = (menuKey: string, isParent = false) =>
    `block px-2 py-1 rounded transition-colors cursor-pointer ${
      isParent
        ? isParentActive(menuKey)
          ? "font-bold text-primary-200"
          : ""
        : activeMenu === menuKey
        ? "font-bold text-primary-200"
        : "hover:bg-gray-100"
    }`;

  return (
    <div className="container mx-auto my-10 flex min-h-screen bg-gray-50">
      {/* Left Nav */}
      <nav className="w-2/10 bg-white border-r p-6 flex flex-col">
        {/* User info */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.avatar}
            alt="user avatar"
            className="w-20 h-20 rounded-full mb-2"
          />
          <h2 className="font-semibold text-lg">{user?.name || "User Name"}</h2>
          <button className="flex items-center mt-2 text-sm text-primary-200 hover:underline cursor-pointer">
            <span>✏️</span>
            <Link to="/user/account/profile" className="ml-1">
              Edit Profile
            </Link>
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-4">
          {/* My Account Parent */}
          <li>
            <Link
              to="/user/account/profile"
              className={getMenuClass("my-account", true)}
            >
              My Account
            </Link>
            <ul className="ml-4 mt-2 space-y-2">
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
            </ul>
          </li>

          {/* My Purchase */}
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

      {/* Right Content */}
      <div className="w-8/10 p-6 bg-white rounded shadow-sm">{children}</div>
    </div>
  );
};

export default UserLayout;
