import { Link } from "react-router-dom";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { useStore } from "../context/StoreContext";

export default function AccountDashboardPage() {
  const { state } = useStore();
  const name = state.user?.name || "Guest";

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">My Account</h1>
      <p className="mt-1 text-neutral-600">Welcome back, {name}.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5"><p className="text-sm text-neutral-500">Orders</p><p className="text-3xl font-bold">{state.orders.length}</p></div>
        <div className="rounded-2xl border bg-white p-5"><p className="text-sm text-neutral-500">Wishlist</p><p className="text-3xl font-bold">{state.wishlist.length}</p></div>
        <div className="rounded-2xl border bg-white p-5"><p className="text-sm text-neutral-500">Cart Items</p><p className="text-3xl font-bold">{state.cart.length}</p></div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link to="/account/orders" className="rounded-2xl border bg-white p-5">View Order History</Link>
        <Link to="/account/settings" className="rounded-2xl border bg-white p-5">Manage Account Settings</Link>
        <Link to="/account/wishlist" className="rounded-2xl border bg-white p-5">Open Wishlist</Link>
        <Link to="/shop" className="rounded-2xl border bg-white p-5">Continue Shopping</Link>
      </div>

      <section className="mt-8 rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        {!state.orders.length ? (
          <p className="mt-2 text-sm text-neutral-600">No orders yet.</p>
        ) : (
          <div className="mt-3 space-y-2 text-sm">
            {state.orders.slice(0, 3).map((order) => (
              <p key={order.id}>#{order.id} • {order.status} • ${order.total.toFixed(2)}</p>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
