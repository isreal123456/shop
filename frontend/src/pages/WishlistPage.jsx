import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import Breadcrumbs from "../component/common/Breadcrumbs";
import ProductCard from "../component/common/ProductCard";

export default function WishlistPage() {
  const { state } = useStore();
  const items = products.filter((product) => state.wishlist.includes(product.id));

  return (
    <div>
      <Breadcrumbs />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <button type="button" className="rounded-lg border px-3 py-1.5 text-sm">Share Wishlist</button>
      </div>
      {!items.length ? (
        <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-neutral-600">No saved products yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => <ProductCard key={item.id} product={item} onQuickView={() => {}} />)}
        </div>
      )}
    </div>
  );
}
