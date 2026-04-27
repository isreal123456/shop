import { Link } from "react-router-dom";
import { FiX, FiHeart } from "react-icons/fi";
import { useStore } from "../../context/StoreContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, state } = useStore();

  if (!product) return null;

  const liked = state.wishlist.includes(product.id);

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Quick View</h3>
          <button type="button" onClick={onClose} aria-label="Close quick view" className="rounded-full p-2 hover:bg-neutral-100">
            <FiX />
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <img src={product.images[0]} alt={product.name} className="h-72 w-full rounded-xl object-cover" />
          <div>
            <p className="text-sm text-neutral-500">{product.brand}</p>
            <h4 className="mt-1 text-2xl font-bold">{product.name}</h4>
            <p className="mt-2 text-lg font-semibold">${product.price}</p>
            <p className="mt-3 text-sm text-neutral-600">{product.description}</p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="rounded-lg bg-black px-4 py-2 text-sm text-white"
                onClick={() => addToCart(product, 1)}
              >
                Add To Cart
              </button>
              <button
                type="button"
                className={`rounded-lg border px-3 py-2 text-sm ${liked ? "border-rose-500 text-rose-600" : "border-neutral-300"}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <FiHeart className="inline" /> Wishlist
              </button>
              <Link to={`/product/${product.slug}`} className="rounded-lg border border-neutral-300 px-3 py-2 text-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
