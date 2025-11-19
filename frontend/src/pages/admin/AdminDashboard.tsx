import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  ListOrdered,
  ChartColumnStacked
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '../../api/adminApi/productApi';
import { getAllUserApi } from '../../api/adminApi/getAllUserApi';
import { getCategoriesApi } from '../../api/categoryApi/categoryApi';
import { getSubCategoriesApi } from '../../api/subCategoryApi/subCategoryApi';

const AdminDashboard = () => {
  // Queries for data
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProductsApi,
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUserApi,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
  });

  const { data: subCategories = [] } = useQuery({
    queryKey: ['sub-categories'],
    queryFn: getSubCategoriesApi,
  });

  // Calculate statistics
  const totalProducts = products?.length || 0;
  const totalUsers = users?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalSubCategories = subCategories?.length || 0;
  const publishedProducts = products?.filter((p: any) => p.publish)?.length || 0;
  const lowStockProducts = products?.filter((p: any) => (p.stock || 0) < 10)?.length || 0;
  
  // Mock revenue data (you can replace with real API calls)
  const todayRevenue = 12450.75;
  const monthlyRevenue = 345620.80;
  const totalOrders = 1245;
  const pendingOrders = 23;

  // Quick action buttons
  const quickActions = [
    {
      title: 'Add Product',
      description: 'Create new product',
      icon: <Package size={20} />,
      link: '/admin/products',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Add Category',
      description: 'Create new category',
      icon: <ListOrdered size={20} />,
      link: '/admin/categories',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Add SubCategory',
      description: 'Create new subcategory',
      icon: <ChartColumnStacked size={20} />,
      link: '/admin/sub-categories',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Manage Users',
      description: 'View all users',
      icon: <Users size={20} />,
      link: '/admin/users',
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Statistics cards
  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${(monthlyRevenue || 0).toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: <DollarSign size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Today Revenue',
      value: `$${(todayRevenue || 0).toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive',
      icon: <TrendingUp size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Orders',
      value: (totalOrders || 0).toLocaleString(),
      change: '+15.3%',
      changeType: 'positive',
      icon: <ShoppingBag size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Users',
      value: (totalUsers || 0).toLocaleString(),
      change: '+6.8%',
      changeType: 'positive',
      icon: <Users size={24} />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Recent activity (mock data)
  const recentActivity = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '5 minutes ago', type: 'user' },
    { id: 2, action: 'Product added', user: 'Admin', time: '15 minutes ago', type: 'product' },
    { id: 3, action: 'Order completed', user: 'Jane Smith', time: '30 minutes ago', type: 'order' },
    { id: 4, action: 'Category created', user: 'Admin', time: '1 hour ago', type: 'category' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={16} />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${action.bgColor} ${action.textColor} group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-500">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp size={16} className="text-green-500 mr-1" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Inventory Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl font-bold text-slate-800">{totalProducts}</div>
              <div className="text-sm text-slate-600">Total Products</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{publishedProducts}</div>
              <div className="text-sm text-slate-600">Published</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
              <div className="text-sm text-slate-600">Low Stock</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{totalCategories}</div>
              <div className="text-sm text-slate-600">Categories</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle size={20} />
              <span className="font-medium">Inventory Alerts</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              {lowStockProducts > 0 ? (
                `${lowStockProducts} products are running low on stock. Consider restocking soon.`
              ) : (
                'All products have sufficient stock levels.'
              )}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'product' ? 'bg-green-100 text-green-600' :
                  activity.type === 'order' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'user' ? <Users size={16} /> :
                   activity.type === 'product' ? <Package size={16} /> :
                   activity.type === 'order' ? <ShoppingBag size={16} /> :
                   <ListOrdered size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <p className="text-xs text-slate-500">by {activity.user}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-medium text-green-800">System Online</p>
              <p className="text-sm text-green-600">All services running normally</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Eye className="text-blue-600" size={24} />
            <div>
              <p className="font-medium text-blue-800">Active Sessions</p>
              <p className="text-sm text-blue-600">156 users online</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <Star className="text-purple-600" size={24} />
            <div>
              <p className="font-medium text-purple-800">Server Performance</p>
              <p className="text-sm text-purple-600">Excellent (98.5%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
