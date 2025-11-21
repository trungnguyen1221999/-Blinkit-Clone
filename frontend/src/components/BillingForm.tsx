import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const billingSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(2, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(2, "Postal Code is required"),
});

type BillingFormValues = z.infer<typeof billingSchema>;

const BillingForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
  });

  const onSubmit = (data: BillingFormValues) => {
    // handle billing info submit
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
          <input {...register("city")}
            type="text"
            placeholder="City"
            className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
          />
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
        </label>
        <label className="flex-1 flex flex-col gap-2 text-slate-700 font-semibold">
          Country
          <input {...register("country")}
            type="text"
            placeholder="Country"
            className="rounded-lg border border-slate-200 px-4 py-3 bg-[#f6f7f9] focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition outline-none text-base"
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
      <button type="submit" className="hidden">Submit</button>
    </form>
  );
};

export default BillingForm;
