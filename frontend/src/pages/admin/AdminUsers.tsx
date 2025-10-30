import React from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const AdminUsers = () => {
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: "2025-10-01",
      avatar: "https://via.placeholder.com/60x60.png?text=JD",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Customer",
      createdAt: "2025-10-10",
      avatar: "https://via.placeholder.com/60x60.png?text=JS",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Moderator",
      createdAt: "2025-09-25",
      avatar: "https://via.placeholder.com/60x60.png?text=MJ",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User List</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>Create User</span>
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
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created At</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 text-gray-600">{user.role}</td>
                <td className="p-3 text-gray-600">{user.createdAt}</td>
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

export default AdminUsers;
