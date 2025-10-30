import { Pencil, Trash2, Plus } from "lucide-react";

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>Create Product</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 w-10">
                <input type="checkbox" />
              </th>
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Price ($)</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created At</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="p-3 text-gray-600">{product.sku}</td>
                <td className="p-3 text-gray-600">
                  {product.price.toFixed(2)}
                </td>
                <td className="p-3 text-gray-600">{product.quantity}</td>
                <td className="p-3 text-gray-600">{product.category}</td>
                <td className="p-3 text-gray-600">{product.createdAt}</td>
                <td className="p-3 text-right">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
