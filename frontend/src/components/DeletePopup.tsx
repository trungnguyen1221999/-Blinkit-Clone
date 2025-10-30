import { Trash2 } from "lucide-react";
import { useEffect } from "react";

interface DeletePopupProps {
  count: number; // số user sẽ xóa
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  count,
  onCancel,
  onConfirm,
}) => {
  // Ngăn scroll khi popup mở
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // reset khi popup đóng
    };
  }, []);

  return (
    <div
      onClick={onCancel} // click vào nền -> đóng popup
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // ngăn sự kiện click lan ra ngoài
        className="bg-white rounded-lg shadow-lg p-6 w-96"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Delete
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete {count} user{count > 1 ? "s" : ""}?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
