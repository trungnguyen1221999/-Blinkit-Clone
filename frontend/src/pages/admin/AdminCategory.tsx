import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Category } from "../../components/category/CategoryPopup";
import CategoryPopup from "../../components/category/CategoryPopup";
import DeletePopup from "../../components/category/DeletePopup";

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([
    { _id: "1", name: "Category 1", image: "https://via.placeholder.com/60" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [deleteCat, setDeleteCat] = useState<Category | null>(null);

  const handleAddClick = () => {
    setEditingCat(null);
    setShowPopup(true);
  };

  const handleEdit = (cat: Category) => {
    setEditingCat(cat);
    setShowPopup(true);
  };

  const handleDelete = (cat: Category) => setDeleteCat(cat);

  const confirmDelete = () => {
    if (deleteCat) {
      setCategories((prev) => prev.filter((c) => c._id !== deleteCat._id));
      setDeleteCat(null);
    }
  };

  const cancelDelete = () => setDeleteCat(null);

  const handleSaveCategory = (cat: Category) => {
    setCategories((prev) => {
      const existIndex = prev.findIndex((c) => c._id === cat._id);
      if (existIndex > -1) {
        const newArr = [...prev];
        newArr[existIndex] = cat;
        return newArr;
      }
      return [...prev, cat];
    });
    setShowPopup(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <button
          onClick={handleAddClick}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <table className="w-full text-sm text-left border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">No.</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr
              key={cat._id}
              className={`border-b ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="p-3 text-center">{idx + 1}</td>
              <td className="p-3 text-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="p-3">{cat.name}</td>
              <td className="p-3 flex gap-5 justify-center items-center">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  <Edit size={25} />
                </button>
                <button
                  onClick={() => handleDelete(cat)}
                  className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  <Trash2 size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <CategoryPopup
          initialData={editingCat}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSaveCategory}
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
