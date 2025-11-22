import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createOrderApi } from "../api/orderApi";
import { resetCartApi } from "../api/cartApi";
import { useAuth } from "../Context/AuthContext";
import OrderSuccessPopup from "./OrderSuccessPopup";
import OrderErrorPopup from "./OrderErrorPopup";
import FullNameField from "./billingFields/FullNameField";
import EmailField from "./billingFields/EmailField";
import PhoneField from "./billingFields/PhoneField";
import AddressField from "./billingFields/AddressField";
import CityField from "./billingFields/CityField";
import CountryField from "./billingFields/CountryField";
import PostalCodeField from "./billingFields/PostalCodeField";
import CardNumberField from "./billingFields/CardNumberField";
import ExpiryField from "./billingFields/ExpiryField";
import CVVField from "./billingFields/CVVField";
import NameOnCardField from "./billingFields/NameOnCardField";

// Add your validation schema and types as needed
// import { billingSchema } from "../utils/billingSchema";

export type CheckoutFormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
};

const BillingForm = ({ products = [], total = 0, totalSave = 0 }) => {
  const [orderDetail, setOrderDetail] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  // Use guestId if not logged in (same logic as Cart)
  const guestIdRaw = !user ? localStorage.getItem("guestId") : undefined;
  const guestId = guestIdRaw ?? undefined;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormValues>({
    // resolver: zodResolver(billingSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "Kai",
      email: "test@example.com",
      phone: "0401234567",
      address: "123 Main St",
      city: "Helsinki",
      country: "Finland",
      postalCode: "00100",
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/25",
      cvv: "123",
      nameOnCard: "Kai",
    },
  });

  // Add your submit handler here
  const onSubmit = async (data: any) => {
    try {
      // Call your order API
      let payload;
      // Tạo orderId, paymentId, và invoice_receipt ngẫu nhiên
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const invoice_receipt = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      if (user?._id) {
        payload = {
          ...data,
          products,
          total,
          totalSave,
          userId: user._id,
          orderId,
          paymentId,
          invoice_receipt,
        };
      } else if (guestId) {
        payload = {
          ...data,
          products,
          total,
          totalSave,
          guestId,
          orderId,
          paymentId,
          invoice_receipt,
        };
      } else {
        setError("No userId or guestId found");
        return;
      }
      const response = await createOrderApi(payload);
      setOrderDetail(response);
      reset();
      // Reset cart in React Query
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      // Clear cart in localStorage (for guest)
      localStorage.removeItem("cart");
      // Reset cart in backend
      await resetCartApi({ userId: user?._id, guestId });
    } catch (err: any) {
      setError(err?.message || "Payment failed");
    }
  };

  return (
    <>
      {orderDetail && (
        <OrderSuccessPopup
          orderDetail={orderDetail}
          total={total}
          totalSave={totalSave}
          products={products}
          onClose={() => setOrderDetail(null)}
        />
      )}
      {error && (
        <OrderErrorPopup
          error={error}
          onClose={() => setError(null)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4 bg-white rounded-xl shadow-md">
        <FullNameField register={register} errors={errors} />
        <EmailField register={register} errors={errors} />
        <PhoneField register={register} errors={errors} />
        <AddressField register={register} errors={errors} />
        <div className="flex gap-4">
          <CityField register={register} errors={errors} />
          <CountryField register={register} errors={errors} />
        </div>
        <PostalCodeField register={register} errors={errors} />
        <CardNumberField register={register} errors={errors} />
        <div className="flex gap-4">
          <ExpiryField register={register} errors={errors} />
          <CVVField register={register} errors={errors} />
        </div>
        <NameOnCardField register={register} errors={errors} />
        <button type="submit" className="mt-4 py-4 px-8 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold text-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transition w-full">Pay Now</button>
      </form>
    </>
  );
};

export default BillingForm;