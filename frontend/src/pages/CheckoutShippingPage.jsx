import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { useStore } from "../context/StoreContext";

export default function CheckoutShippingPage() {
  const navigate = useNavigate();
  const { total } = useStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    sessionStorage.setItem("checkout-shipping", JSON.stringify(data));
    navigate("/checkout/method");
  }

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">Checkout • Shipping Information</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form className="rounded-2xl border border-black/10 bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("phone", { required: "Phone is required" })} />
              {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("address", { required: "Address is required" })} />
              {errors.address && <p className="mt-1 text-xs text-rose-600">{errors.address.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">City</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("city", { required: "City is required" })} />
              {errors.city && <p className="mt-1 text-xs text-rose-600">{errors.city.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Postal Code</label>
              <input className="mt-1 w-full rounded-lg border px-3 py-2" {...register("postal", { required: "Postal code is required" })} />
              {errors.postal && <p className="mt-1 text-xs text-rose-600">{errors.postal.message}</p>}
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" {...register("saveAddress")} /> Save address for next time</label>
          <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" {...register("guestCheckout")} /> Continue as guest</label>
          <button type="submit" className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">Continue to Shipping Method</button>
        </form>

        <aside className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-lg font-semibold">Order Summary</p>
          <p className="mt-3 text-sm text-neutral-600">Current estimated total</p>
          <p className="mt-1 text-2xl font-bold">${total.toFixed(2)}</p>
          <Link to="/cart" className="mt-5 inline-block text-sm underline">Back to cart</Link>
        </aside>
      </div>
    </div>
  );
}
