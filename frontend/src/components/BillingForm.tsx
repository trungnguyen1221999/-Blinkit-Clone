import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required").max(20, "Phone number is too long"),
  address: z.string().min(2, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(2, "Postal Code is required"),
  cardNumber: z.string().min(16, "Card number is required").max(19, "Card number is too long"),
  expiry: z.string().min(4, "Expiry is required"),
  cvv: z.string().min(3, "CVV is required").max(4, "CVV is too long"),
  nameOnCard: z.string().min(2, "Name on card is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;


const FINNISH_CITIES = [
  "Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Pori", "Lappeenranta", "Kotka", "Joensuu", "Hämeenlinna", "Vaasa", "Rovaniemi"
];


const BillingForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "Finland" }
  });

  const onSubmit = (data: CheckoutFormValues) => {
    // handle full checkout submit
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Billing Fields */}
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Full Name
        <input {...register("fullName")}
          type="text"
          placeholder="Full Name"
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
        />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
      </label>
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Email
        <input {...register("email")}
          type="email"
          placeholder="Email"
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </label>
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Phone Number
        <input {...register("phone")}
          type="tel"
          placeholder="Phone Number"
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
      </label>
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Address
        <input {...register("address")}
          type="text"
          placeholder="Address"
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
        />
        {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
      </label>
      <div className="flex gap-4">
        <label className="flex-1 flex flex-col gap-2 text-slate-700 font-semibold">
          City
          <select {...register("city")}
            className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base">
            <option value="">Select City</option>
            {FINNISH_CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
        </label>
        <label className="flex-1 flex flex-col gap-2 text-slate-700 font-semibold">
          Country
          <input {...register("country")}
            type="text"
            placeholder="Country"
            className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
            readOnly
          />
          {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Postal Code
        <input {...register("postalCode")}
          type="text"
          placeholder="Postal Code"
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
        />
        {errors.postalCode && <span className="text-red-500 text-sm">{errors.postalCode.message}</span>}
      </label>
   
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Card Number
        <input {...register("cardNumber")}
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base tracking-widest"
        />
        {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber.message}</span>}
      </label>
      <div className="flex gap-4">
        <label className="flex-1 flex flex-col gap-2 text-slate-700 font-semibold">
          Expiry
          <input {...register("expiry")}
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
          />
          {errors.expiry && <span className="text-red-500 text-sm">{errors.expiry.message}</span>}
        </label>
        <label className="flex-1 flex flex-col gap-2 text-slate-700 font-semibold">
          CVV
          <input {...register("cvv")}
            type="password"
            maxLength={4}
            placeholder="123"
            className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
          />
          {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2 text-slate-700 font-semibold">
        Name on Card
        <input {...register("nameOnCard")}
          type="text"
          placeholder="Cardholder Name"
          className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
        />
        {errors.nameOnCard && <span className="text-red-500 text-sm">{errors.nameOnCard.message}</span>}
      </label>
      <button type="submit" className="mt-2 py-3 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition">Pay Now</button>
    </form>
  );
};

export default BillingForm;
