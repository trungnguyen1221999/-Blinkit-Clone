import { useState } from "react";
import { Edit, Trash2, Plus, FolderTree, Search, Tag } from "lucide-react";
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

  // Open add popup
  const handleAddClick = () => {
    setEditingSub(null);
    setShowPopup(true);
  };

  // Open edit popup
  const handleEdit = (sub: SubCategory) => {
    setEditingSub(sub);
    setShowPopup(true);
  };

  // Open delete popup
  const handleDelete = (sub: SubCategory) => {
    setDeleteSub(sub);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (deleteSub) {
      setSubCategories((prev) => prev.filter((s) => s._id !== deleteSub._id));
      setDeleteSub(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteSub(null);
  };

  // Add or update subcategory
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
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-white to-slate-50 rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">SubCategory Management</h1>
            <p className="text-slate-600">Organize products with detailed subcategory classifications</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Total SubCategories: <strong className="text-slate-700">{subCategories.length}</strong>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Parent Categories: <strong className="text-slate-700">{categories.length}</strong>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
            {/* Search SubCategories */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Search SubCategories</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search subcategories..."
                  className="pl-10 pr-4 py-2.5 w-64 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/20 focus:border-primary-200 transition-colors text-sm bg-white shadow-sm h-[42px]"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Filter by Parent</label>
              <select className="min-w-[150px] border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200/20 focus:border-primary-200 transition-colors bg-white shadow-sm h-[42px]">
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Add SubCategory Button */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600 uppercase tracking-wide opacity-0">Action</label>
              <button
                onClick={handleAddClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium h-[42px]"
              >
                <Plus size={18} />
                <span>Add SubCategory</span>
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
                <th className="p-4 text-left font-semibold text-slate-700">SubCategory</th>
                <th className="p-4 text-left font-semibold text-slate-700">Parent Categories</th>
                <th className="p-4 text-left font-semibold text-slate-700">Details</th>
                <th className="p-4 text-center font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subCategories.map((sub, idx) => (
                <tr
                  key={sub._id}
                  className="hover:bg-slate-50 transition-all duration-200 group"
                >
                  <td className="p-4 text-center font-medium text-slate-600">
                    {idx + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {sub.image ? (
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-white shadow-lg flex items-center justify-center">
                            <Tag className="text-slate-400" size={24} />
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{sub.name}</h3>
                        <p className="text-sm text-slate-500">SubCategory ID: {sub._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {sub.category.length > 0 ? (
                        sub.category.map((cat, catIdx) => (
                          <span
                            key={catIdx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 mr-2"
                          >
                            {cat.name}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          No parent category
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          ✓ Active
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          SubCategory
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
                        onClick={() => handleEdit(sub)}
                        className="p-2.5 text-slate-400 hover:text-primary-200 hover:bg-primary-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                        title="Edit subcategory"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(sub)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                        title="Delete subcategory"
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
      {subCategories.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderTree className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No subcategories found</h3>
          <p className="text-slate-500 mb-6">Start organizing your products with detailed subcategory classifications.</p>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-200 to-primary-100 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            <Plus size={18} />
            Create First SubCategory
          </button>
        </div>
      )}

      {/* POPUPS */}
      {showPopup && (
        <SubCategoryPopup
          categories={categories}
          initialData={editingSub}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSaveSubCategory}
        />
      )}

      {/* Modern Delete Confirmation Popup */}
      {deleteSub && (
        <div
          onClick={cancelDelete}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-[480px] max-w-[90%] flex flex-col relative border border-slate-200"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-500" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-2">Delete SubCategory</h3>
            <p className="text-slate-600 text-center mb-8">
              Are you sure you want to delete <strong>"{deleteSub.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors font-medium text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition-all duration-200 font-medium"
              >
                Delete SubCategory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubCategory;
