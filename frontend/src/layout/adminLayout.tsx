import React, { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ListOrdered,
  ShoppingBag,
  UserCircle,
} from "lucide-react"; // icon đẹp, dễ dùng

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

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

  return (
    <div className="container flex min-h-screen bg-gray-100 mx-auto my-10 border">
      {/* NAV LEFT */}
      <aside className="w-64 bg-white shadow-md border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
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
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
