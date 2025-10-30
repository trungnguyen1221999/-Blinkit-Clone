import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ListOrdered,
  ShoppingBag,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import Pagination from "../components/Pagination";

interface AdminLayoutProps {
  children: React.ReactNode;
  totalPages?: number; // tổng số trang
  currentPage?: number; // trang hiện tại
  onPageChange?: (page: number) => void; // hàm khi đổi trang
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <ListOrdered size={18} />,
    },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={18} /> },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <UserCircle size={18} />,
    },
  ];

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
  };

  return (
    <div className="container mx-auto my-10 min-h-screen flex bg-gray-100 rounded border">
      {/* NAV LEFT */}
      <aside className="w-64 bg-white shadow-md border-r flex flex-col">
        {/* Admin profile */}
        <div className="flex flex-col items-center p-4 border-b">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
            <img
              src={
                user?.avatar ||
                "https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-free-png.png"
              }
              alt="admin avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="mt-2 font-semibold text-base text-center">
            {user?.name || "Admin Name"}
          </h2>
          <Link
            to="/user/account/profile"
            className="text-sm text-primary-200 hover:underline mt-1"
          >
            Edit Profile
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col p-6">
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
