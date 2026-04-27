import { Link } from "react-router-dom";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "../component/common/ProductCard";
import { useState } from "react";

export default function CartPage() {
  const { state, removeCartItem, updateQty, cartSubtotal, tax, shipping, total, setCoupon } = useStore();
  const [couponInput, setCouponInput] = useState(state.coupon || "");
  const recommended = products.filter((p) => p.isPopular).slice(0, 4);

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      {!state.cart.length ? (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
          <p className="text-2xl font-semibold">Your cart is empty</p>
          <p className="mt-2 text-sm text-neutral-600">Looks like you have not added anything yet.</p>
          <Link to="/shop" className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">Start Shopping</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {state.cart.map((item) => (
              <article key={item.key} className="grid gap-4 rounded-2xl border border-black/10 bg-white p-4 sm:grid-cols-[130px_1fr]">
                <img src={item.image} alt={item.name} className="h-32 w-full rounded-xl object-cover" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-neutral-500">Size: {item.size} • Color: {item.color}</p>
                    <p className="mt-2 text-lg font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="rounded-lg border px-2 py-1" onClick={() => updateQty(item.key, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" className="rounded-lg border px-2 py-1" onClick={() => updateQty(item.key, item.quantity + 1)}>+</button>
                    <button type="button" className="rounded-lg border border-rose-300 px-3 py-1 text-sm text-rose-600" onClick={() => removeCartItem(item.key)}>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-max rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Shipping</span><span>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</span></p>
              <div className="border-t pt-2 text-base font-semibold"><p className="flex justify-between"><span>Total</span><span>${total.toFixed(2)}</span></p></div>
            </div>
            <div className="mt-4 flex gap-2">
              <input className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="Promo code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
              <button type="button" className="rounded-lg border px-3 text-sm" onClick={() => setCoupon(couponInput)}>Apply</button>
            </div>
            <div className="mt-5 grid gap-2">
              <Link to="/shop" className="rounded-lg border border-neutral-300 px-4 py-2 text-center text-sm">Continue Shopping</Link>
              <Link to="/checkout/shipping" className="rounded-lg bg-black px-4 py-2 text-center text-sm font-semibold text-white">Proceed To Checkout</Link>
            </div>
          </aside>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-bold">You may also like</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((item) => <ProductCard key={item.id} product={item} onQuickView={() => {}} />)}
        </div>
      </section>
    </div>
  );
}
