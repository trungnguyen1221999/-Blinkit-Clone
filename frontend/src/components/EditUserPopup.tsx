import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import editUserApi from "../api/adminApi/editUserApi";

interface EditUserPopupProps {
  user: {
    _id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    verify_email?: boolean;
    mobile?: string;
  };
  onCancel: () => void;
  onConfirm: (updatedData: any) => void;
}

// Validation schema
const editUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]),
  verify_email: z.boolean().optional(),
  mobile: z.string().optional(),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

const EditUserPopup: React.FC<EditUserPopupProps> = ({
  user,
  onCancel,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      verify_email: user.verify_email || false,
      mobile: user.mobile || "",
    },
  });

  const onSubmit = async (data: EditUserFormData) => {
    try {
      setApiError(null);
      setLoading(true);
      const response = await editUserApi(user._id, data);
      onConfirm(response.data);
    } catch (error: any) {
      console.error(error);
      setApiError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg p-6 w-96"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit User</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="New Password (optional)"
              {...register("password")}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Role */}
          <div>
            <select
              {...register("role")}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Mobile */}
          <div>
            <input
              type="text"
              placeholder="Mobile (optional)"
              {...register("mobile")}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Verify email */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("verify_email")} />
            <label className="text-sm text-gray-700">Email verified</label>
          </div>

          {/* API Error */}
          {apiError && (
            <p className="text-red-600 text-sm font-medium mt-2">{apiError}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Pencil size={16} /> Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserPopup;
