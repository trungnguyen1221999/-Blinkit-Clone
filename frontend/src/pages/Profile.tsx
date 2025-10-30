import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, type User } from "../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import changeNameApi from "../api/userApi/changeNameApi";
import changeAvatarApi from "../api/userApi/changeAvatarApi";
import getUserApi from "../api/userApi/getUserApi";

// Zod Schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

type ProfileForm = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, setUser } = useAuth();
  const [preview, setPreview] = useState<string>(
    user?.avatar ||
      "https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
  );
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "" },
  });

  // Fetch lại user khi load trang để giữ avatar
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?._id) return;
      try {
        const data = await getUserApi(user._id);
        if (data) {
          setUser(data.data);
          setPreview(
            data.data.avatar ||
              "https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
          );
          reset({ name: data.name });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Mutation đổi tên
  const changeNameMutation = useMutation({
    mutationFn: async (newName: string) => {
      await changeNameApi(user?._id || "", newName);
      return newName;
    },
    onSuccess: (newName: string) => {
      toast.success("Name updated successfully");
      if (user) setUser({ ...user, name: newName });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to change name");
    },
  });

  // Mutation đổi avatar
  const changeAvatarMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await changeAvatarApi(formData);
    },
    onSuccess: (data: any) => {
      toast.success("Avatar updated successfully");
      if (data?.data?.avatar && user) {
        const updatedUser = { ...user, avatar: data.data.avatar };
        setUser(updatedUser);
        setPreview(data.data.avatar);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to change avatar");
    },
  });

  // Handle chọn ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.size > 1024 * 1024) {
      toast.error("File too large (max 1MB)");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Handle submit form
  const onSubmit = async (data: ProfileForm) => {
    try {
      if (data.name !== user?.name) {
        await changeNameMutation.mutateAsync(data.name);
      }
      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);
        await changeAvatarMutation.mutateAsync(formData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">My Profile</h1>
        <p className="text-gray-600">Manage and protect your account</p>
      </div>

      <div className="bg-gray-50 p-6 rounded shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label className="block">
            <p className="mb-1 font-medium">Name</p>
            <input
              type="text"
              {...register("name")}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-200`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </label>

          {/* Avatar */}
          <label className="block">
            <p className="mb-1 font-medium">Avatar</p>
            <div className="flex items-center gap-4">
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
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-200 text-white rounded hover:bg-primary-300 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
