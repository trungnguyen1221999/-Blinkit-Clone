import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import type { Category } from "../../components/category/AddCategoryPopup";
import AddCategoryPopup from "../../components/category/AddCategoryPopup";
import EditCategoryPopup from "../../components/category/EditCategoryPopupProps";
import DeletePopup from "../../components/category/DeletePopup";
import { useMutation } from "@tanstack/react-query";
import {
  getCategoriesApi,
  deleteCategoryApi,
  updateCategoryApi,
} from "../../api/categoryApi/categoryApi";
import { toast } from "react-toastify";

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [deleteCat, setDeleteCat] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Load categories
  const getCategoriesMutation = useMutation<Category[], any>({
    mutationFn: getCategoriesApi,
    onSuccess: (data) => {
      setCategories(data);
      toast.success("Categories loaded successfully");
    },
    onError: () => toast.error("Failed to load categories"),
  });

  // Delete category
  const deleteCategoryMutation = useMutation<void, any, string>({
    mutationFn: deleteCategoryApi,
    onSuccess: () => toast.success("Category deleted successfully"),
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to delete category"
      );
    },
  });

  // Update category
  const updateCategoryMutation = useMutation<
    Category, // result type
    any, // error type
    { id: string; formData: FormData } // variables type
  >({
    mutationFn: ({ id, formData }) => updateCategoryApi(id, formData),
    onSuccess: (updatedCat) => {
      setCategories((prev) =>
        prev.map((c) => (c._id === updatedCat._id ? updatedCat : c))
      );
      toast.success("Category updated successfully");
      setShowEditPopup(false);
      setEditingCat(null);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update category"
      );
    },
  });

  useEffect(() => {
    setLoading(true);
    getCategoriesMutation.mutate(undefined, {
      onSettled: () => setLoading(false),
    });
  }, []);

  const handleAddCategory = (cat: Category) => {
    setCategories((prev) => [...prev, cat]);
    setShowAddPopup(false);
  };

  const handleEdit = (cat: Category) => {
    setEditingCat(cat);
    setShowEditPopup(true);
  };

  const handleDelete = (cat: Category) => setDeleteCat(cat);

  const confirmDelete = () => {
    if (!deleteCat) return;
    setCategories((prev) => prev.filter((c) => c._id !== deleteCat._id));
    deleteCategoryMutation.mutate(deleteCat._id);
    setDeleteCat(null);
  };

  const cancelDelete = () => setDeleteCat(null);
  const handleEditCategory = (cat: Category, newImage?: File) => {
    const formData = new FormData();
    formData.append("name", cat.name);
    if (newImage) formData.append("image", newImage); // append only when newImage exists
    updateCategoryMutation.mutate({ id: cat._id, formData });
  };
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowAddPopup(true)}
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full pl-9"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, idx) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border text-center">
                    <img
                      src={cat.image.url}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">{cat.name}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleEdit(cat)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(cat)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 border text-center text-gray-400"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* POPUPS */}
      {showAddPopup && (
        <AddCategoryPopup
          onClose={() => setShowAddPopup(false)}
          onSubmit={handleAddCategory}
        />
      )}

      {showEditPopup && editingCat && (
        <EditCategoryPopup
          initialData={editingCat}
          onClose={() => {
            setShowEditPopup(false);
            setEditingCat(null);
          }}
          onSubmit={handleEditCategory}
        />
      )}

      {deleteCat && (
        <DeletePopup
          itemName={deleteCat.name}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminCategory;
