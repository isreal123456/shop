import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { useStore } from "../context/StoreContext";
import { useState } from "react";

const shippingMethods = [
  { id: "standard", name: "Standard", eta: "3-5 days", price: 8 },
  { id: "express", name: "Express", eta: "1-2 days", price: 15 },
];

export default function CheckoutMethodPage() {
  const navigate = useNavigate();
  const { cartSubtotal, tax } = useStore();
  const [method, setMethod] = useState("standard");

  const selected = shippingMethods.find((item) => item.id === method);
  const total = cartSubtotal + tax + selected.price;

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">Checkout • Shipping Method</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="space-y-3">
            {shippingMethods.map((item) => (
              <label key={item.id} className="flex cursor-pointer items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-neutral-600">{item.eta}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${item.price}</span>
                  <input type="radio" checked={method === item.id} onChange={() => setMethod(item.id)} />
                </div>
              </label>
            ))}
          </div>
          <button type="button" className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white" onClick={() => {
            sessionStorage.setItem("checkout-method", method);
            navigate("/checkout/payment");
          }}>
            Continue to Payment
          </button>
        </section>

        <aside className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="text-lg font-semibold">Order Summary</p>
          <p className="mt-3 flex justify-between text-sm"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></p>
          <p className="mt-1 flex justify-between text-sm"><span>Tax</span><span>${tax.toFixed(2)}</span></p>
          <p className="mt-1 flex justify-between text-sm"><span>Shipping</span><span>${selected.price.toFixed(2)}</span></p>
          <p className="mt-3 flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></p>
        </aside>
      </div>
    </div>
  );
}
