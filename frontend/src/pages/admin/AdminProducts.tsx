import { Pencil, Trash2, Plus, Package, Search, Filter } from "lucide-react";

const AdminProducts = () => {
  const products = [
    {
      id: "1",
      name: "Basic T-Shirt",
      sku: "TSHIRT001",
      price: 24.99,
      quantity: 120,
      category: "Men's Fashion",
      createdAt: "2025-10-20",
      images: ["https://via.placeholder.com/60x60.png?text=T-Shirt"],
    },
    {
      id: "2",
      name: "Ceramic Mug",
      sku: "MUG002",
      price: 14.5,
      quantity: 45,
      category: "Home Accessories",
      createdAt: "2025-10-25",
      images: ["https://via.placeholder.com/60x60.png?text=Mug"],
    },
    {
      id: "3",
      name: "Women's Hoodie",
      sku: "HD003",
      price: 39.99,
      quantity: 78,
      category: "Women's Fashion",
      createdAt: "2025-09-30",
      images: ["https://via.placeholder.com/60x60.png?text=Hoodie"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-white to-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Product Management</h1>
            <p className="text-slate-600">Manage your inventory and product catalog</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Total Products: <strong className="text-slate-700">{products.length}</strong>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                In Stock: <strong className="text-slate-700">{products.filter(p => p.quantity > 0).length}</strong>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                Low Stock: <strong className="text-slate-700">{products.filter(p => p.quantity < 10).length}</strong>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            {/* Search and Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Search Products</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by name, SKU..."
                  className="pl-10 pr-4 py-2.5 w-64 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/20 focus:border-primary-200 transition-colors text-sm bg-white shadow-sm h-[42px]"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Filter Category</label>
              <select className="min-w-[150px] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200/20 focus:border-primary-200 transition-colors bg-white shadow-sm h-[42px]">
                <option value="All">All Categories</option>
                <option value="Men's Fashion">Men's Fashion</option>
                <option value="Women's Fashion">Women's Fashion</option>
                <option value="Home Accessories">Home Accessories</option>
              </select>
            </div>

            {/* Add Product Button */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide opacity-0">Action</label>
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium h-[42px]">
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="p-4 text-center font-semibold text-slate-700 w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-200 bg-gray-100 border-gray-300 rounded focus:ring-primary-200 focus:ring-2"
                    />
                  </div>
                </th>
                <th className="p-4 text-left font-semibold text-slate-700">Product</th>
                <th className="p-4 text-left font-semibold text-slate-700">SKU</th>
                <th className="p-4 text-left font-semibold text-slate-700">Price</th>
                <th className="p-4 text-left font-semibold text-slate-700">Stock</th>
                <th className="p-4 text-left font-semibold text-slate-700">Category</th>
                <th className="p-4 text-left font-semibold text-slate-700">Created</th>
                <th className="p-4 text-center font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product, idx) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-all duration-200 group"
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-200 bg-gray-100 border-gray-300 rounded focus:ring-primary-200 focus:ring-2"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-xl border-2 border-white shadow-sm"
                        />
                        {product.quantity < 10 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="text-xs text-slate-500">Product ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                      {product.sku}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-semibold text-slate-800">${product.price.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">USD</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        product.quantity > 50 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : product.quantity > 10
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {product.quantity} units
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>
                      <p className="font-medium">{new Date(product.createdAt).toLocaleDateString("en-US")}</p>
                      <p className="text-xs text-slate-500">{new Date(product.createdAt).toLocaleDateString("en-US", { weekday: 'short' })}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-slate-400 hover:text-primary-200 hover:bg-primary-50 rounded-lg transition-all duration-200 group-hover:scale-110"
                        title="Edit product"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group-hover:scale-110"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No products found</h3>
          <p className="text-slate-500 mb-6">Start building your product catalog by adding your first product.</p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
            <Plus size={18} />
            Add First Product
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
