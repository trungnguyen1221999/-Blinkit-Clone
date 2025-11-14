import { useState } from "react";
import { Edit, Trash2, Plus, FolderOpen, Search } from "lucide-react";
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
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-white to-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Category Management</h1>
            <p className="text-slate-600">Organize your products with categories and subcategories</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Total Categories: <strong className="text-slate-700">{categories.length}</strong>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Active: <strong className="text-slate-700">{categories.length}</strong>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            {/* Search Categories */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Search Categories</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-10 pr-4 py-2.5 w-64 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/20 focus:border-primary-200 transition-colors text-sm bg-white shadow-sm h-[42px]"
                />
              </div>
            </div>

            {/* Add Category Button */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide opacity-0">Action</label>
              <button
                onClick={handleAddClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium h-[42px]"
              >
                <Plus size={18} />
                <span>Add Category</span>
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
                <th className="p-4 text-center font-semibold text-slate-700 w-16">#</th>
                <th className="p-4 text-left font-semibold text-slate-700">Category</th>
                <th className="p-4 text-left font-semibold text-slate-700">Details</th>
                <th className="p-4 text-center font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat, idx) => (
                <tr
                  key={cat._id}
                  className="hover:bg-slate-50 transition-all duration-200 group"
                >
                  <td className="p-4 text-center font-medium text-slate-600">
                    {idx + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{cat.name}</h3>
                        <p className="text-sm text-slate-500">Category ID: {cat._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          ✓ Active
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          Main Category
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Created: {new Date().toLocaleDateString("en-US")}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2.5 text-slate-400 hover:text-primary-200 hover:bg-primary-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                        title="Edit category"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                        title="Delete category"
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
      {categories.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No categories found</h3>
          <p className="text-slate-500 mb-6">Start organizing your products by creating your first category.</p>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            <Plus size={18} />
            Create First Category
          </button>
        </div>
      )}

      {/* POPUPS */}
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
