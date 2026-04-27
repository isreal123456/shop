import { Link } from "react-router-dom";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import { useStore } from "../../context/StoreContext";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, state } = useStore();
  const liked = state.wishlist.includes(product.id);

  return (
    <article className="group rounded-2xl border border-black/10 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-neutral-500">{product.brand}</p>
          <Link to={`/product/${product.slug}`} className="mt-1 block font-semibold hover:underline">
            {product.name}
          </Link>
          <p className="text-sm text-neutral-600">{product.category}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`rounded-full p-2 ${liked ? "bg-rose-100 text-rose-600" : "bg-neutral-100"}`}
        >
          <FiHeart />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-bold">${product.price}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="rounded-lg border border-neutral-200 p-2"
            aria-label="Quick view"
          >
            <FiEye />
          </button>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="rounded-lg bg-black p-2 text-white"
            aria-label="Add to cart"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </article>
  );
}
