import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import getAllUsersApi from "../../api/adminApi/getAllUserApi";
import { useMutation } from "@tanstack/react-query";
import deleteUserApi from "../../api/adminApi/deleteUserApi";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";

const AdminUsers = () => {
  const [users, setUsers] = useState<
    Array<{
      _id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      avatar: string;
      status: "Active" | "Inactive" | "Suspended";
      verify_email: boolean;
    }>
  >([]);

  const [roleFilter, setRoleFilter] = useState<"All" | "Admin" | "User">("All");
  const [neededRerender, setNeededRerender] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersApi();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [neededRerender]);

  // Filter users by role
  const filteredUsers =
    roleFilter === "All"
      ? users
      : users.filter(
          (user) => user.role.toLowerCase() === roleFilter.toLowerCase()
        );

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => await deleteUserApi(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      setNeededRerender((prev) => !prev);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const handleDeleteUser = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User List</h2>
        <div className="flex gap-4 items-center">
          {/* FILTER */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "All" | "Admin" | "User")
            }
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            <span>Create User</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 w-10 text-center">No.</th>
              <th className="p-3 w-10">
                <input type="checkbox" />
              </th>
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Is Verified</th>
              <th className="p-3">Created At</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user, idx) => (
              <tr
                key={user._id}
                className={`border-b hover:bg-gray-100 transition-colors ${
                  user.verify_email
                    ? "bg-green-50"
                    : idx % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
              >
                {/* Number column */}
                <td className="p-3 text-center text-gray-700 font-medium">
                  {startIndex + idx + 1}
                </td>

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
                <td className="p-3 text-gray-600">{user.status}</td>
                <td className="p-3 text-gray-600">
                  {user.verify_email ? "✅" : "❌"}
                </td>
                <td className="p-3 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="p-3 text-right">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {currentUsers.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AdminUsers;
