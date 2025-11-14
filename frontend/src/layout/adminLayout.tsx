import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ListOrdered,
  ShoppingBag,
  UserCircle,
  ChartColumnStacked,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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
    {
      name: "SubCategories",
      path: "/admin/sub-categories",
      icon: <ChartColumnStacked size={18} />,
    },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={18} /> },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <UserCircle size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Modern Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-slate-200 flex flex-col relative">
        {/* Header with logo */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-primary-200 to-primary-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <LayoutDashboard className="text-primary-200" size={20} />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Admin Panel</h1>
              <p className="text-white/80 text-xs">Blinkit Management</p>
            </div>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="p-6 border-b border-slate-200">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={
                      user?.avatar ||
                      "https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-free-png.png"
                    }
                    alt="admin avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm truncate">
                  {user?.name || "Admin Name"}
                </h3>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
            <Link
              to="/user/account/profile"
              className="inline-flex items-center gap-1 mt-3 px-3 py-1.5 text-xs font-medium text-primary-200 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-200"
            >
              <Settings size={12} />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            Main Menu
          </h4>
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? "bg-gradient-to-r from-primary-200/10 to-primary-100/10 text-primary-200 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 to-primary-100 rounded-r-full"></div>
                )}
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? "bg-primary-200/10 text-primary-200" 
                    : "bg-slate-100 group-hover:bg-slate-200 text-slate-500"
                }`}>
                  {React.cloneElement(item.icon, { size: 16 })}
                </div>
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-primary-200 rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-colors group">
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200">
              <Bell size={16} />
            </div>
            <span className="font-medium text-sm">Notifications</span>
            <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
            <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200">
              <LogOut size={16} />
            </div>
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="text-sm text-slate-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200/20 focus:border-primary-200 transition-colors text-sm"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Profile Dropdown */}
              <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={user?.avatar || "https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-free-png.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-slate-50/50 to-white">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
