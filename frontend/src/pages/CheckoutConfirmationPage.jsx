import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function CheckoutConfirmationPage() {
  const { state } = useStore();
  const latest = state.orders[0];

  if (!latest) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
        <p className="text-2xl font-semibold">No recent order found.</p>
        <Link to="/shop" className="mt-4 inline-block rounded-xl bg-black px-4 py-2 text-sm text-white">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-8 text-center">
      <p className="text-4xl">🎉</p>
      <h1 className="mt-3 text-3xl font-bold">Thank you for your order</h1>
      <p className="mt-2 text-neutral-600">Order #{latest.id}</p>
      <p className="mt-2 text-sm text-neutral-600">Estimated delivery: 3-5 business days</p>
      <div className="mt-6 rounded-xl bg-neutral-100 p-4 text-left">
        <p className="font-semibold">Order summary</p>
        <p className="mt-1 text-sm">Items: {latest.items.length}</p>
        <p className="mt-1 text-sm">Total: ${latest.total.toFixed(2)}</p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white">Continue Shopping</Link>
        {!state.user && <Link to="/account/login" className="rounded-xl border border-neutral-300 px-5 py-2.5 text-sm">Create Account</Link>}
      </div>
    </div>
  );
}
