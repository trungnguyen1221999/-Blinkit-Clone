import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartApi, removeFromCartApi, updateCartQuantityApi } from "../api/cartApi";
import { useAuth } from "../Context/AuthContext";
import { Trash2, Minus, Plus, BadgePercent, User, ShoppingCart, CreditCard } from "lucide-react";
import BillingForm from "../components/BillingForm";
import CardPaymentForm from "../components/CardPaymentForm";


import { useLocation } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const guestIdRaw = !user ? localStorage.getItem("guestId") : undefined;
  const guestId = guestIdRaw ?? undefined;
  const location = useLocation();

  const queryClient = useQueryClient();

  const { data: cart = [], isLoading, error } = useQuery({
    queryKey: ["cart", user?._id || guestId || "guest"],
    queryFn: () => getCartApi({ userId: user?._id, guestId }),
    enabled: !!user?._id || !!guestId,
  });

  // If coming from CartPage with selectedIds, filter cart
  const selectedIds: string[] | undefined = location.state?.selectedIds;
  const displayCart = selectedIds && Array.isArray(selectedIds) && selectedIds.length > 0
    ? cart.filter((item: any) => selectedIds.includes(item._id))
    : cart;

  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      updateCartQuantityApi(cartItemId, quantity),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id || guestId || "guest"],
      }),
  });

  const removeMutation = useMutation({
    mutationFn: (cartItemId: string) => removeFromCartApi(cartItemId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", user?._id || guestId || "guest"],
      }),
  });

  let total = 0;
  let totalSave = 0;
  let originalTotal = 0;
  displayCart.forEach((item: any) => {
    const price = item.productId?.price || 0;
    const discount = typeof item.productId?.discount === "number" ? item.productId.discount : 0;
    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
    total += discountedPrice * item.quantity;
    originalTotal += price * item.quantity;
    if (discount > 0) {
      totalSave += (price - discountedPrice) * item.quantity;
    }
  });

  return (
    <>
      <main className="min-h-screen py-12">
        <div className="mx-auto max-w-6xl px-2 md:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* LEFT: BILLING + PAYMENT */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">Checkout</h1>
              {/* Trust Badges - Enhanced */}
              <div className="flex flex-wrap gap-5 mb-10 justify-center md:justify-start rounded-xl py-4 px-2">
                <div className="flex items-center gap-3 rounded-xl px-5 py-3 min-w-[180px]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15"/><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className="font-bold text-green-700 text-base">100% Secure</div>
                    <div className="text-xs text-slate-500 font-medium">SSL Encrypted Payment</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl px-5 py-3 min-w-[180px]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#3b82f6" opacity="0.12"/><rect x="4" y="7" width="16" height="13" rx="2" stroke="#3b82f6" strokeWidth="2"/><path d="M8 11v2a4 4 0 008 0v-2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                  <div>
                    <div className="font-bold text-blue-700 text-base">Easy Refund</div>
                    <div className="text-xs text-slate-500 font-medium">7-Day Money Back</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl px-5 py-3 min-w-[180px]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#facc15" opacity="0.15"/><path d="M12 6v6l4 2" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className="font-bold text-yellow-700 text-base">24/7 Support</div>
                    <div className="text-xs text-slate-500 font-medium">Always Here for You</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl px-5 py-3 min-w-[180px]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a78bfa" opacity="0.15"/><path d="M8 12l2 2 4-4" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className="font-bold text-purple-700 text-base">Trusted by 10,000+</div>
                    <div className="text-xs text-slate-500 font-medium">Happy Customers</div>
                  </div>
                </div>
              </div>
              {/* Billing */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <User className="w-6 h-6" /> Billing Information
                </h2>
                <BillingForm />
              </section>
              {/* Payment */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6" /> Card Payment
                </h2>
                <CardPaymentForm />
              </section>
            </div>
            {/* RIGHT: ORDER SUMMARY */}
            <aside className="md:w-[420px] p-8 md:p-10 rounded-3xl sticky top-8 h-fit flex flex-col gap-8">
              <h2 className="text-3xl font-bold text-primary-700 mb-4 flex items-center gap-4 ">
                <ShoppingCart className="w-8 h-8" /> Order Summary
              </h2>
              {isLoading ? (
                <div className="text-center text-slate-400 py-8">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">Error loading cart</div>
              ) : displayCart.length === 0 ? (
                <div className="text-center text-slate-400 py-8">Your cart is empty</div>
              ) : (
                <ul className="divide-y divide-slate-100 mb-4">
                  {displayCart.map((item: any) => {
                    const price = item.productId?.price || 0;
                    const discount = typeof item.productId?.discount === "number" ? item.productId.discount : 0;
                    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
                    return (
                      <li key={item._id} className="flex items-center gap-4 py-4 group">
                        <img src={item.productId?.images?.[0]?.url || "/images/placeholder-product.jpg"} className="w-16 h-16 object-contain rounded-lg bg-slate-100 border border-slate-200" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-800 text-base line-clamp-1 mb-1">{item.productId?.name}</div>
                          <div className="flex items-center gap-2 mb-1">
                            <button className="p-1 rounded-full bg-slate-100 hover:bg-primary-100 border border-slate-200 transition" onClick={() => updateQuantityMutation.mutate({ cartItemId: item._id, quantity: Math.max(1, item.quantity - 1) })} disabled={item.quantity <= 1 || updateQuantityMutation.status === "pending"} aria-label="Decrease quantity">
                              <Minus size={16} />
                            </button>
                            <span className="px-2 text-base font-semibold text-slate-700">{item.quantity}</span>
                            <button className="p-1 rounded-full bg-slate-100 hover:bg-primary-100 border border-slate-200 transition" onClick={() => updateQuantityMutation.mutate({ cartItemId: item._id, quantity: item.quantity + 1 })} disabled={updateQuantityMutation.status === "pending"} aria-label="Increase quantity">
                              <Plus size={16} />
                            </button>
                            <button className="ml-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 border border-red-200 transition" onClick={() => removeMutation.mutate(item._id)} disabled={removeMutation.status === "pending"} aria-label="Remove item">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          {discount > 0 && (
                            <div className="flex items-center gap-1 text-xs text-red-500 font-semibold">
                              <BadgePercent size={14} />
                              Save €{((price - discountedPrice) * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end min-w-[90px]">
                          {discount > 0 ? (
                            <>
                              <span className="font-bold text-primary-600 text-base">€{discountedPrice.toFixed(2)}/{item.productId?.unit}</span>
                              <span className="text-xs text-slate-400 line-through">€{price.toFixed(2)}/{item.productId?.unit}</span>
                            </>
                          ) : (
                            <span className="font-bold text-primary-600 text-base">€{price.toFixed(2)}/{item.productId?.unit}</span>
                          )}
                          <span className="text-xs text-slate-500 mt-1">Total: €{(discountedPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="border-t border-slate-200 pt-4 mt-2"></div>
              <div className="flex flex-col gap-1">
                {totalSave > 0 && (
                  <div className="flex items-center justify-between text-base font-semibold text-slate-400 line-through mb-1">
                    <span>Original:</span>
                    <span>€{originalTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xl font-bold text-primary-700">
                  <span>Total:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                {totalSave > 0 && (
                  <div className="text-right text-green-600 font-semibold text-base mt-1">
                    You save <span className="font-bold">€{totalSave.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;
