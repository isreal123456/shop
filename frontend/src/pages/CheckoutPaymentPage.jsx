import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { useStore } from "../context/StoreContext";

export default function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const { state, total, placeOrder } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    placeOrder({
      items: state.cart,
      total,
      shippingDetails: JSON.parse(sessionStorage.getItem("checkout-shipping") || "{}"),
      shippingMethod: sessionStorage.getItem("checkout-method") || "standard",
      paymentMethod: data.paymentMethod,
    });
    navigate("/checkout/confirmation");
  }

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">Checkout • Payment</h1>
      <form className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={handleSubmit(onSubmit)}>
        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-lg font-semibold">Payment Method</p>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="radio" value="card" defaultChecked {...register("paymentMethod")} /> Credit / Debit Card</label>
            <label className="flex items-center gap-2"><input type="radio" value="paypal" {...register("paymentMethod")} /> PayPal</label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Card Number</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("card", { required: "Card number required" })} />
              {errors.card && <p className="mt-1 text-xs text-rose-600">{errors.card.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Expiry</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("expiry", { required: "Expiry required" })} />
              {errors.expiry && <p className="mt-1 text-xs text-rose-600">{errors.expiry.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">CVV</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("cvv", { required: "CVV required" })} />
              {errors.cvv && <p className="mt-1 text-xs text-rose-600">{errors.cvv.message}</p>}
            </div>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" {...register("sameAsShipping", { required: true })} /> Billing address is same as shipping</label>
          {errors.sameAsShipping && <p className="mt-1 text-xs text-rose-600">You must confirm billing address.</p>}
          <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" {...register("terms", { required: true })} /> I agree to terms and conditions</label>
          {errors.terms && <p className="mt-1 text-xs text-rose-600">Please accept terms.</p>}

          <button type="submit" className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">Place Order</button>
        </section>

        <aside className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-lg font-semibold">Order Review</p>
          <p className="mt-3 text-sm text-neutral-600">Items: {state.cart.length}</p>
          <p className="mt-1 text-sm text-neutral-600">Secure checkout and encrypted payment.</p>
          <p className="mt-4 text-2xl font-bold">${total.toFixed(2)}</p>
        </aside>
      </form>
    </div>
  );
}
