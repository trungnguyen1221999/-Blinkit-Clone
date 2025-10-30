import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import getAllUsersApi from "../../api/adminApi/getAllUserApi";
import { useMutation } from "@tanstack/react-query";
import deleteUserApi from "../../api/adminApi/deleteUserApi";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import DeletePopup from "../../components/DeletePopup";
import addUserApi from "../../api/adminApi/addUserApi";
import AddUserPopup from "../../components/AddUserPopupProps";

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
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState<string[]>([]); // lưu id user(s) sẽ xóa
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const addUserMutation = useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      password: string;
      role: "ADMIN" | "USER";
    }) => await addUserApi(userData),
    onSuccess: () => {
      toast.success("User added successfully");
      setNeededRerender((prev) => !prev);
    },
    onError: () => {
      toast.error("Failed to add user");
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string | string[]) => {
      if (Array.isArray(id)) {
        await Promise.all(id.map((_id) => deleteUserApi(_id)));
      } else {
        await deleteUserApi(id);
      }
    },
    onSuccess: () => {
      toast.success("User(s) deleted successfully");
      setSelectedUsers([]);
      setSelectAll(false);
      setNeededRerender((prev) => !prev);
      setShowDeletePopup(false);
    },
    onError: () => {
      toast.error("Failed to delete user(s)");
      setShowDeletePopup(false);
    },
  });

  // Open popup để xóa 1 user
  const confirmDeleteUser = (id: string) => {
    setUsersToDelete([id]);
    setShowDeletePopup(true);
  };

  // Open popup để xóa nhiều user
  const confirmDeleteSelected = () => {
    if (selectedUsers.length === 0) return;
    setUsersToDelete(selectedUsers);
    setShowDeletePopup(true);
  };

  // Handle select logic
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
      setSelectAll(false);
    } else {
      setSelectedUsers(currentUsers.map((u) => u._id));
      setSelectAll(true);
    }
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };
  const handleAddUser = (userData: {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
  }) => {
    addUserMutation.mutate(userData);
    setShowAddUserPopup(false);
    setNeededRerender((prev) => !prev);
  };

  useEffect(() => {
    const allSelected =
      currentUsers.length > 0 &&
      currentUsers.every((u) => selectedUsers.includes(u._id));
    setSelectAll(allSelected);
  }, [currentUsers, selectedUsers]);

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

          <button
            onClick={() => setShowAddUserPopup(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus size={18} />
            <span>Create User</span>
          </button>
        </div>
      </div>

      {/* SELECTED INFO */}
      {selectedUsers.length > 0 && (
        <div className="flex justify-between items-center mb-4 bg-blue-50 border border-blue-200 px-4 py-2 rounded">
          <span className="text-sm text-gray-700">
            Selected: <strong>{selectedUsers.length}</strong> user
            {selectedUsers.length > 1 ? "s" : ""}
          </span>
          <button
            onClick={confirmDeleteSelected}
            className="flex items-center gap-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
          >
            <Trash2 size={16} />
            Delete Selected
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3 w-10 text-center">No.</th>
              <th className="p-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
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
                <td className="p-3 text-center text-gray-700 font-medium">
                  {startIndex + idx + 1}
                </td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelectUser(user._id)}
                  />
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
                <td className="p-3 flex items-center justify-end gap-3 my-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => confirmDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
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

      {/* DELETE POPUP */}
      {showDeletePopup && (
        <DeletePopup
          count={usersToDelete.length}
          onCancel={() => setShowDeletePopup(false)}
          onConfirm={() => deleteUserMutation.mutate(usersToDelete)}
        />
      )}
      {showAddUserPopup && (
        <AddUserPopup
          onCancel={() => setShowAddUserPopup(false)}
          onConfirm={handleAddUser}
        />
      )}
    </div>
  );
};

export default AdminUsers;
