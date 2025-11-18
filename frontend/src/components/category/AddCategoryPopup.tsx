import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createCategoryApi } from "../../api/categoryApi/categoryApi";
import { toast } from "react-toastify";

export interface Category {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
}

interface CategoryPopupProps {
  initialData?: Category | null;
  onClose: () => void;
  onSubmit: (cat: Category) => void;
}

interface FormData {
  name: string;
  image: FileList;
}

const AddCategoryPopup = ({
  initialData,
  onClose,
  onSubmit,
}: CategoryPopupProps) => {
  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState(
    initialData?.image?.url || ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const data = new window.FormData();
      data.append("name", formData.name);
      if (formData.image && formData.image.length > 0) {
        data.append("image", formData.image[0]);
      }
      return await createCategoryApi(data);
    },
    onSuccess: (newCat) => {
      toast.success("Category created successfully");
      onSubmit(newCat);
      onClose();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to create category";
      toast.error(msg);
    },
  });

  const isLoading = addCategoryMutation.isPending;

  useEffect(() => {
    reset({
      name: initialData?.name || "",
      image: undefined as any,
    });
    setImagePreview(initialData?.image?.url || "");
    setSelectedFile(null);
  }, [initialData, reset]);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else if (!selectedFile && initialData?.image) {
      setImagePreview(initialData.image.url);
    } else if (!selectedFile) {
      setImagePreview("");
    }
  }, [watchImage]);

  const onSubmitForm = (data: FormData) => {
    if (!data.name || isLoading) return;
    addCategoryMutation.mutate(data);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg p-8 w-[400px] max-w-[90%] flex flex-col relative"
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-semibold mb-6">
          {initialData ? "Edit Category" : "Add Category"}
        </h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <input
            type="text"
            placeholder="Category Name"
            {...register("name", { required: true })}
            className="border rounded px-3 py-2 w-full"
            disabled={isLoading}
          />

          <div className="w-32 h-32 border rounded flex items-center justify-center overflow-hidden mt-2 cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Preview</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            {...register("image")}
            id="catFileInput"
            className="hidden"
            disabled={isLoading}
          />

          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              !isLoading && document.getElementById("catFileInput")?.click()
            }
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Image
          </button>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPopup;
