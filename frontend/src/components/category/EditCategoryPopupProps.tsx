import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import type { Category } from "./AddCategoryPopup";

interface EditCategoryPopupProps {
  initialData: Category;
  onClose: () => void;
  onSubmit: (cat: Category, newImage?: File) => void;
  loading?: boolean;
}

interface FormData {
  name: string;
  image: FileList;
}

const EditCategoryPopup = ({
  initialData,
  onClose,
  onSubmit,
  loading = false,
}: EditCategoryPopupProps) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState(initialData.image.url);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    reset({
      name: initialData.name,
      image: undefined as any,
    });
    setImagePreview(initialData.image.url);
    setSelectedFile(null);
  }, [initialData, reset]);

  const watchImage = watch("image");

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else if (!selectedFile) {
      setImagePreview(initialData.image.url);
    }
  }, [watchImage, initialData.image.url, selectedFile]);

  const onSubmitForm = (data: FormData) => {
    if (!data.name) return;
    onSubmit(
      {
        _id: initialData._id,
        name: data.name,
        image: initialData.image, // giữ object cũ nếu không đổi
      },
      selectedFile || undefined
    );
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
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          disabled={loading}
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-semibold mb-6">Edit Category</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <input
            type="text"
            placeholder="Category Name"
            {...register("name", { required: true })}
            className="border rounded px-3 py-2 w-full"
            defaultValue={initialData.name}
          />

          <div
            className="w-32 h-32 border rounded flex items-center justify-center overflow-hidden mt-2 cursor-pointer"
            onClick={() => document.getElementById("editCatFileInput")?.click()}
          >
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
            id="editCatFileInput"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById("editCatFileInput")?.click()}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            Upload Image
          </button>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryPopup;
