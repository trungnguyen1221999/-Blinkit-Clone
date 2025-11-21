import React from "react";
import { ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCartApi } from "../api/cartApi";
import { useAuth } from "../Context/AuthContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const guestIdRaw = !user ? localStorage.getItem("guestId") : undefined;
  const guestId = guestIdRaw ?? undefined;
  const { data: cart = [], isLoading, error } = useQuery({
    queryKey: ["cart", user?._id || guestId || "guest"],
    queryFn: () => getCartApi({ userId: user?._id, guestId }),
    enabled: !!user?._id || !!guestId,
  });

  console.log("CartDrawer open:", open);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200
        ${open ? "translate-x-0" : "translate-x-full"}`}
      style={{ willChange: "transform" }}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-[-1] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShoppingCart size={22} className="text-primary-600" />
          <span className="font-bold text-lg text-slate-800">Your Cart</span>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-red-500 text-xl font-bold">×</button>
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="text-center text-slate-400 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">Error loading cart</div>
        ) : cart.length === 0 ? (
          <div className="text-center text-slate-400 py-8">Your cart is empty</div>
        ) : (
          <ul className="space-y-4">
            {cart.map((item: any) => (
              <li key={item._id} className="flex items-center gap-3 border-b pb-2 last:border-b-0">
                <img src={item.productId?.images?.[0]?.url || "/images/placeholder-product.jpg"} alt={item.productId?.name || "Product"} className="w-14 h-14 object-contain rounded bg-slate-100" />
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 line-clamp-1">{item.productId?.name || "Product"}</div>
                  <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-primary-600">${item.productId?.price?.toFixed(2) || "-"}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">Checkout</button>
      </div>
    </div>
  );
};

export default CartDrawer;
