import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const cartItemCount = 3; // This would come from your cart context/state

  return (
    <button className="relative flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md group">
      <div className="relative">
        <ShoppingCart size={20} className="text-slate-600 group-hover:text-slate-800 transition-colors" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {cartItemCount > 9 ? '9+' : cartItemCount}
          </span>
        )}
      </div>
      <span className="hidden md:inline-block text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
        Cart
      </span>
    </button>
  );
};

export default Cart;
