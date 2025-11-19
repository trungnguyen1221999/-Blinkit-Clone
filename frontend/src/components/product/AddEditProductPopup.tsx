import { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import AddCategoryPopup from "../category/AddCategoryPopup";
import AddSubCategoryPopup from "../category/AddSubCategoryPopup";

interface Product {
  _id: string;
  name: string;
  images: { url: string; public_id: string }[];
  category: { _id: string; name: string }[];
  SubCategory: { _id: string; name: string }[];
  unit: string;
  stock: number;
  price: number;
  discount?: number;
  description: string;
  more_details: Record<string, any>;
  publish: boolean;
  createdAt: string;
}

interface ProductForm {
  name: string;
  category: string[];
  SubCategory: string[];
  unit: string;
  stock: number;
  price: number;
  discount: number;
  description: string;
  more_details: Record<string, any>;
  publish: boolean;
}

interface AddEditProductPopupProps {
  isOpen: boolean;
  product: Product | null;
  productForm: ProductForm;
  setProductForm: (form: ProductForm) => void;
  selectedImages: File[];
  setSelectedImages: (images: File[]) => void;
  imagePreviewUrls: string[];
  setImagePreviewUrls: (urls: string[]) => void;
  categories: any[];
  subCategories: any[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onCreateCategory?: () => void;
  onCreateSubCategory?: () => void;
  onCategoryCreated?: (newCategory: any) => void;
  onSubCategoryCreated?: (newSubCategory: any) => void;
  isLoading?: boolean;
}

const AddEditProductPopup = ({
  isOpen,
  product,
  productForm,
  setProductForm,
  selectedImages,
  setSelectedImages,
  imagePreviewUrls,
  setImagePreviewUrls,
  categories,
  subCategories,
  onClose,
  onSubmit,
  onCreateCategory,
  onCreateSubCategory,
  onCategoryCreated,
  onSubCategoryCreated,
  isLoading = false
}: AddEditProductPopupProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'media'>('basic');
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateSubCategory, setShowCreateSubCategory] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(previews);
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviews);
  };

  const filteredSubCategories = subCategories.filter((subCat: any) =>
    productForm.category.some(catId => subCat.category.some((c: any) => c._id === catId))
  );

  // Sort categories alphabetically and split A-M, N-Z
  const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));
  const categoriesAM = sortedCategories.filter(cat => cat.name.toLowerCase()[0] <= 'm');
  const categoriesNZ = sortedCategories.filter(cat => cat.name.toLowerCase()[0] >= 'n');

  // Sort subcategories alphabetically and split A-M, N-Z
  const sortedSubCategories = [...filteredSubCategories].sort((a, b) => a.name.localeCompare(b.name));
  const subCategoriesAM = sortedSubCategories.filter(subCat => subCat.name.toLowerCase()[0] <= 'm');
  const subCategoriesNZ = sortedSubCategories.filter(subCat => subCat.name.toLowerCase()[0] >= 'n');

  const addMoreDetail = () => {
    const key = `detail_${Date.now()}`;
    setProductForm({
      ...productForm,
      more_details: { ...productForm.more_details, [key]: '' }
    });
  };

  const removeMoreDetail = (key: string) => {
    const newDetails = { ...productForm.more_details };
    delete newDetails[key];
    setProductForm({ ...productForm, more_details: newDetails });
  };

  const updateMoreDetail = (key: string, value: string) => {
    setProductForm({
      ...productForm,
      more_details: { ...productForm.more_details, [key]: value }
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-200 to-primary-100 px-8 py-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
          >
            <X size={24} />
          </button>
          
          <div className="pr-16">
            <h3 className="text-2xl font-bold text-white mb-2">
              {product ? "Edit Product" : "Add New Product"}
            </h3>
            <p className="text-white/90 text-sm">
              {product ? "Update product information and settings" : "Create a new product for your catalog"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-50 px-8 border-b border-slate-200 mt-4">
          <div className="flex space-x-1">
            {[
              { id: 'basic', label: 'Basic Info', icon: '📋' },
              { id: 'details', label: 'Details', icon: '📝' },
              { id: 'media', label: 'Media', icon: '🖼️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-t-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-200 text-black border-t-2 border-primary-200 -mb-px'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="flex-1 overflow-y-auto p-8 max-h-[calc(95vh-240px)]">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Product Name - Full width */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200 text-lg"
                    placeholder="Enter a compelling product name"
                  />
                </div>

                {/* Price Section - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Price Before Discount */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Price Before Discount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">€</span>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  {/* Discount Percentage */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Discount Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={productForm.discount}
                        onChange={(e) => setProductForm({...productForm, discount: parseFloat(e.target.value)})}
                        className="w-full px-4 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                        placeholder="0"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">%</span>
                    </div>
                  </div>

                  {/* Final Price Display */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Final Price (After Discount)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">€</span>
                      <input
                        type="text"
                        readOnly
                        value={productForm.discount > 0 
                          ? (productForm.price * (1 - productForm.discount / 100)).toFixed(2)
                          : productForm.price.toFixed(2)
                        }
                        className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 font-semibold cursor-not-allowed"
                      />
                      {productForm.discount > 0 && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <span className="text-xs text-green-600 font-medium">
                            Save €{(productForm.price * (productForm.discount / 100)).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    {productForm.discount > 0 && (
                      <p className="text-xs text-green-600 mt-2">
                        Customer saves {productForm.discount}% (€{(productForm.price * (productForm.discount / 100)).toFixed(2)})
                      </p>
                    )}
                  </div>
                </div>

                {/* Stock and Unit - 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                      placeholder="Available quantity"
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Unit of Measurement
                    </label>
                    <input
                      type="text"
                      value={productForm.unit}
                      onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                      placeholder="e.g., kg, pcs, liter, box"
                    />
                  </div>
                </div>

                {/* Categories - Full row with 2 columns */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-slate-700">
                      Categories
                    </label>
                    <button
                      type="button"
                      onClick={onCreateCategory || (() => setShowCreateCategory(true))}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-200 hover:text-primary-300 hover:bg-primary-50 rounded-lg transition-all duration-200"
                    >
                      <Plus size={14} />
                      New Category
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Categories A-M */}
                    <div>
                      <p className="text-xs text-slate-600 mb-2 font-medium">A - M</p>
                      <select
                        multiple
                        value={productForm.category}
                        onChange={(e) => {
                          const values = Array.from(e.target.selectedOptions, option => option.value);
                          setProductForm({...productForm, category: values, SubCategory: []});
                        }}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200 min-h-[140px]"
                      >
                        {categoriesAM.map((category: any) => (
                          <option key={category._id} value={category._id} className="py-2">
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Categories N-Z */}
                    <div>
                      <p className="text-xs text-slate-600 mb-2 font-medium">N - Z</p>
                      <select
                        multiple
                        value={productForm.category}
                        onChange={(e) => {
                          const values = Array.from(e.target.selectedOptions, option => option.value);
                          setProductForm({...productForm, category: values, SubCategory: []});
                        }}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200 min-h-[140px]"
                      >
                        {categoriesNZ.map((category: any) => (
                          <option key={category._id} value={category._id} className="py-2">
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Hold Ctrl/Cmd to select multiple categories</p>
                </div>

                {/* SubCategories - Full row with 2 columns */}
                {filteredSubCategories.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-slate-700">
                        SubCategories
                      </label>
                      <button
                        type="button"
                        onClick={onCreateSubCategory || (() => setShowCreateSubCategory(true))}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-200 hover:text-primary-300 hover:bg-primary-50 rounded-lg transition-all duration-200"
                      >
                        <Plus size={14} />
                        New SubCategory
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* SubCategories A-M */}
                      <div>
                        <p className="text-xs text-slate-600 mb-2 font-medium">A - M</p>
                        <select
                          multiple
                          value={productForm.SubCategory}
                          onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, option => option.value);
                            setProductForm({...productForm, SubCategory: values});
                          }}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200 min-h-[120px]"
                        >
                          {subCategoriesAM.map((subCategory: any) => (
                            <option key={subCategory._id} value={subCategory._id} className="py-2">
                              {subCategory.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* SubCategories N-Z */}
                      <div>
                        <p className="text-xs text-slate-600 mb-2 font-medium">N - Z</p>
                        <select
                          multiple
                          value={productForm.SubCategory}
                          onChange={(e) => {
                            const values = Array.from(e.target.selectedOptions, option => option.value);
                            setProductForm({...productForm, SubCategory: values});
                          }}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200 min-h-[120px]"
                        >
                          {subCategoriesNZ.map((subCategory: any) => (
                            <option key={subCategory._id} value={subCategory._id} className="py-2">
                              {subCategory.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Hold Ctrl/Cmd to select multiple subcategories</p>
                  </div>
                )}

                {/* Publish Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-slate-700">Publish Product</h4>
                    <p className="text-sm text-slate-500">Make this product visible to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.publish}
                      onChange={(e) => setProductForm({...productForm, publish: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-200"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Product Description
                  </label>
                  <textarea
                    rows={5}
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200 resize-none"
                    placeholder="Describe your product features, benefits, and what makes it special..."
                  />
                </div>

                {/* More Details */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-semibold text-slate-700">
                      Additional Details
                    </label>
                    <button
                      type="button"
                      onClick={addMoreDetail}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-primary-200 hover:text-primary-300 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                      Add Detail
                    </button>
                  </div>

                  {/* Default Fields */}
                  <div className="space-y-3">
                    {/* Country of Origin */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value="Country of origin/country of manufacture"
                        readOnly
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                      />
                      <input
                        type="text"
                        value={productForm.more_details["Country of origin/country of manufacture"] || ""}
                        onChange={(e) => updateMoreDetail("Country of origin/country of manufacture", e.target.value)}
                        placeholder="e.g., Norway, Vietnam, Thailand"
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                      />
                      <div className="w-10 flex items-center justify-center text-slate-400">
                        <span className="text-xs">📍</span>
                      </div>
                    </div>

                    {/* EAN Code */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value="EAN code"
                        readOnly
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                      />
                      <input
                        type="text"
                        value={productForm.more_details["EAN code"] || ""}
                        onChange={(e) => updateMoreDetail("EAN code", e.target.value)}
                        placeholder="e.g., 2000448100001"
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                      />
                      <div className="w-10 flex items-center justify-center text-slate-400">
                        <span className="text-xs">🏷️</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Additional Details */}
                  <div className="space-y-3">
                    {Object.entries(productForm.more_details)
                      .filter(([key]) => key !== "Country of origin/country of manufacture" && key !== "EAN code")
                      .map(([key, value]) => (
                      <div key={key} className="flex gap-3">
                        <input
                          type="text"
                          value={key.startsWith('detail_') ? '' : key}
                          onChange={(e) => {
                            const newDetails = { ...productForm.more_details };
                            delete newDetails[key];
                            newDetails[e.target.value] = value;
                            setProductForm({ ...productForm, more_details: newDetails });
                          }}
                          placeholder="Detail name (e.g., Brand, Weight, Material)"
                          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                        />
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) => updateMoreDetail(key, e.target.value)}
                          placeholder="Detail value"
                          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-200 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeMoreDetail(key)}
                          className="p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {Object.entries(productForm.more_details)
                    .filter(([key]) => key !== "Country of origin/country of manufacture" && key !== "EAN code")
                    .length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <p>No custom details added yet.</p>
                      <p className="text-sm">Click "Add Detail" to include specifications, features, or other product information.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Product Images
                  </label>
                  
                  {/* Upload Area */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-2xl p-8 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-100 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                        <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-primary-200 transition-colors duration-200" />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-700 mb-2">Upload Product Images</h4>
                      <p className="text-slate-500 mb-4">
                        Drag and drop your images here, or click to browse
                      </p>
                      <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-200 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                        <Upload className="mr-2 h-5 w-5" />
                        Choose Images
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                      <p className="text-xs text-slate-400 mt-3">
                        PNG, JPG, GIF up to 10MB each • Maximum 10 images
                      </p>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {(imagePreviewUrls.length > 0 || (product && product.images.length > 0)) && (
                    <div className="mt-6">
                      <h5 className="text-sm font-semibold text-slate-700 mb-4">
                        {imagePreviewUrls.length > 0 ? 'New Images' : 'Current Images'}
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviewUrls.length > 0 
                          ? imagePreviewUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={url} 
                                  alt={`Preview ${index + 1}`} 
                                  className="w-full h-32 object-cover rounded-xl border-2 border-slate-200 group-hover:border-primary-200 transition-colors duration-200" 
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                >
                                  <X size={16} />
                                </button>
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                  #{index + 1}
                                </div>
                              </div>
                            ))
                          : product?.images.map((img, index) => (
                              <div key={index} className="relative">
                                <img 
                                  src={img.url} 
                                  alt={`Current ${index + 1}`} 
                                  className="w-full h-32 object-cover rounded-xl border-2 border-slate-200" 
                                />
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                  #{index + 1}
                                </div>
                              </div>
                            ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center p-8 bg-slate-50 border-t border-slate-200">
            <div className="text-sm text-slate-500">
              {product ? 'Update existing product' : 'Create new product'}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 rounded-xl border border-slate-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-200 to-primary-100 hover:shadow-lg disabled:opacity-50 rounded-xl transition-all duration-200 hover:scale-105"
              >
                {isLoading
                  ? "Saving..."
                  : product
                  ? "Update Product"
                  : "Create Product"
                }
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Add Category Popup */}
      {showCreateCategory && (
        <AddCategoryPopup
          onClose={() => setShowCreateCategory(false)}
          onSubmit={(newCategory) => {
            if (onCategoryCreated) {
              onCategoryCreated(newCategory);
            }
            setShowCreateCategory(false);
            toast.success("Category created! You can now select it.");
          }}
        />
      )}

      {/* Add SubCategory Popup */}
      {showCreateSubCategory && (
        <AddSubCategoryPopup
          categories={categories}
          onClose={() => setShowCreateSubCategory(false)}
          onSubmit={(newSubCategory) => {
            if (onSubCategoryCreated) {
              onSubCategoryCreated(newSubCategory);
            }
            setShowCreateSubCategory(false);
            toast.success("SubCategory created! You can now select it.");
          }}
        />
      )}
    </div>
  );
};

export default AddEditProductPopup;
