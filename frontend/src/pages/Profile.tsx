import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
  const { user, setUser } = useAuth();

  // Lưu ảnh preview & file thật
  const [preview, setPreview] = useState<string>(user?.avatar || "");
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Kiểm tra kích thước file (<= 1MB)
      if (selectedFile.size > 1024 * 1024) {
        alert("File is too large! Maximum size is 1MB.");
        return;
      }
      // Tạo URL preview
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Tạo FormData gửi lên backend
      const formData = new FormData();
      formData.append("avatar", file);
      console.log("Uploading avatar:", file);
      // 🔹 gọi API upload ở đây (VD: await uploadAvatarApi(formData))
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">My Profile</h1>
        <p className="text-gray-600">Manage and protect your account</p>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-6 rounded shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block">
            <p className="mb-1 font-medium">Name</p>
            <input
              type="text"
              defaultValue={user?.name || ""}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </label>

          {/* Avatar */}
          <label className="block">
            <p className="mb-1 font-medium">Avatar</p>
            <div className="flex items-center gap-4">
              {/* Hiển thị ảnh preview */}
              <img
                src={preview || "/default-avatar.png"}
                alt="avatar preview"
                className="w-20 h-20 rounded-full border border-gray-300 object-cover"
              />

              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/jpeg, image/png"
                  hidden
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="avatar-upload"
                  className="px-3 py-1 bg-primary-200 text-white rounded cursor-pointer hover:bg-primary-300 text-sm"
                >
                  Select Image
                </label>
                <div className="text-gray-500 text-xs">
                  <p>File size: max 1 MB</p>
                  <p>File extension: .JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="px-4 py-2 bg-primary-200 text-white rounded hover:bg-primary-300 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
