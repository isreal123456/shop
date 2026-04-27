import Breadcrumbs from "../component/common/Breadcrumbs";
import { useStore } from "../context/StoreContext";

export default function OrderHistoryPage() {
  const { state } = useStore();

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">Order History</h1>
      <div className="mt-6 space-y-3">
        {!state.orders.length && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-600">No orders yet.</div>
        )}
        {state.orders.map((order) => (
          <article key={order.id} className="rounded-2xl border border-black/10 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{order.id}</p>
              <p className="text-sm text-neutral-600">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="mt-2 text-sm text-neutral-600">Status: {order.status}</p>
            <p className="text-sm text-neutral-600">Items: {order.items.length}</p>
            <p className="mt-1 font-semibold">Total: ${order.total.toFixed(2)}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" className="rounded-lg border px-3 py-1.5 text-sm">Track Order</button>
              <button type="button" className="rounded-lg border px-3 py-1.5 text-sm">Reorder</button>
              <button type="button" className="rounded-lg border px-3 py-1.5 text-sm">View Invoice</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
