import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import type { SubCategory } from "../../components/category/SubCategoryPopup";
import SubCategoryPopup from "../../components/category/SubCategoryPopup";
import type { Category } from "../../components/category/CategoryTag";

const AdminSubCategory = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    {
      _id: "1",
      name: "SubCategory 1",
      image: "https://via.placeholder.com/60",
      category: [{ _id: "c1", name: "Category 1" }],
    },
  ]);

  const categories: Category[] = [
    { _id: "c1", name: "Category 1" },
    { _id: "c2", name: "Category 2" },
    { _id: "c3", name: "Category 3" },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [editingSub, setEditingSub] = useState<SubCategory | null>(null);
  const [deleteSub, setDeleteSub] = useState<SubCategory | null>(null);

  // Mở popup thêm mới
  const handleAddClick = () => {
    setEditingSub(null);
    setShowPopup(true);
  };

  // Mở popup sửa
  const handleEdit = (sub: SubCategory) => {
    setEditingSub(sub);
    setShowPopup(true);
  };

  // Mở popup xóa
  const handleDelete = (sub: SubCategory) => {
    setDeleteSub(sub);
  };

  // Xác nhận xóa
  const confirmDelete = () => {
    if (deleteSub) {
      setSubCategories((prev) => prev.filter((s) => s._id !== deleteSub._id));
      setDeleteSub(null);
    }
  };

  // Hủy xóa
  const cancelDelete = () => {
    setDeleteSub(null);
  };

  // Thêm hoặc cập nhật subcategory
  const handleSaveSubCategory = (sub: SubCategory) => {
    setSubCategories((prev) => {
      const existIndex = prev.findIndex((s) => s._id === sub._id);
      if (existIndex > -1) {
        const newArr = [...prev];
        newArr[existIndex] = sub;
        return newArr;
      }
      return [...prev, sub];
    });
    setShowPopup(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">SubCategories</h2>
        <button
          onClick={handleAddClick}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add SubCategory
        </button>
      </div>

      <table className="w-full text-sm text-left border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">No.</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Parent Categories</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((sub, idx) => (
            <tr
              key={sub._id}
              className={`border-b ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="p-3 text-center">{idx + 1}</td>
              <td className="p-3 text-center">
                {sub.image && (
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-12 h-12 object-cover rounded cursor-pointer"
                  />
                )}
              </td>
              <td className="p-3">{sub.name}</td>
              <td className="p-3">
                {sub.category.map((c) => c.name).join(", ") || "None"}
              </td>
              <td className="p-3 flex gap-5 justify-center items-center">
                <button
                  onClick={() => handleEdit(sub)}
                  className="p-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  <Edit size={25} />
                </button>
                <button
                  onClick={() => handleDelete(sub)}
                  className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Add/Edit */}
      {showPopup && (
        <SubCategoryPopup
          categories={categories}
          initialData={editingSub}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSaveSubCategory}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteSub && (
        <div
          onClick={cancelDelete}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg p-8 w-[400px] max-w-[90%] flex flex-col relative"
          >
            <h3 className="text-2xl font-semibold mb-6">Delete SubCategory</h3>
            <p className="mb-6">
              Are you sure you want to delete "{deleteSub.name}"?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubCategory;
