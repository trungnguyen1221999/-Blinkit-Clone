import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const cardSchema = z.object({
  cardNumber: z.string().min(16, "Card number is required").max(19),
  expiry: z.string().min(4, "Expiry is required"),
  cvv: z.string().min(3, "CVV is required").max(4),
  nameOnCard: z.string().min(2, "Name on card is required"),
});

type CardFormValues = z.infer<typeof cardSchema>;

const CardPaymentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
  });

  const onSubmit = (data: CardFormValues) => {
    // handle card payment submit
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit" className="mt-2 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition">Pay Now</button>
    </form>
  );
};

export default CardPaymentForm;
