import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiTruck } from "react-icons/fi";
import Breadcrumbs from "../component/common/Breadcrumbs";
import ProductCard from "../component/common/ProductCard";
import QuickViewModal from "../component/common/QuickViewModal";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, state, addRecent } = useStore();
  const [tab, setTab] = useState("description");
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quickView, setQuickView] = useState(null);

  const product = products.find((item) => item.slug === slug);

  const [size, setSize] = useState(product?.sizes?.[0] || "M");
  const [color, setColor] = useState(product?.colors?.[0] || "Black");

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  }, [product]);

  const recentlyViewedProducts = products.filter((item) => state.recentlyViewed.includes(item.id));

  if (!product) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <p className="text-2xl font-bold">Product not found</p>
      </div>
    );
  }

  useEffect(() => {
    addRecent(product.id);
  }, [slug]);

  useEffect(() => {
    setSelectedImage(0);
    setQty(1);
    setTab("description");
    setSize(product.sizes?.[0] || "M");
    setColor(product.colors?.[0] || "Black");
    setQuickView(null);
  }, [slug, product]);

  return (
    <div>
      <Breadcrumbs />
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-130 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((image, idx) => (
              <button key={image} type="button" onClick={() => setSelectedImage(idx)} className={`overflow-hidden rounded-xl border ${idx === selectedImage ? "border-black" : "border-neutral-200"}`}>
                <img src={image} alt={`Thumbnail ${idx + 1}`} className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-neutral-500">SKU: {product.sku}</p>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-neutral-600">{"★".repeat(Math.round(product.rating))} ({product.reviewCount} reviews)</p>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-3xl font-bold">${product.price}</p>
            <p className="text-lg text-neutral-400 line-through">${product.compareAt}</p>
          </div>

          <p className="mt-4 text-sm text-neutral-700">{product.description}</p>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button key={item} type="button" onClick={() => setSize(item)} className={`rounded-lg border px-3 py-1.5 text-sm ${size === item ? "border-black bg-black text-white" : "border-neutral-300"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button key={item} type="button" onClick={() => setColor(item)} className={`rounded-lg border px-3 py-1.5 text-sm ${color === item ? "border-black bg-black text-white" : "border-neutral-300"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-neutral-300">
              <button type="button" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <span className="px-3">{qty}</span>
              <button type="button" className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button type="button" className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white" onClick={() => addToCart(product, qty, size, color)}>Add To Cart</button>
            <button type="button" className="rounded-xl border border-neutral-300 px-4 py-3 text-sm" onClick={() => toggleWishlist(product.id)}><FiHeart className="inline" /> Wishlist</button>
          </div>

          <p className="mt-4 text-sm text-emerald-700">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
          <div className="mt-4 rounded-xl bg-neutral-100 p-4 text-sm text-neutral-700">
            <p className="font-medium"><FiTruck className="mr-2 inline" /> Free shipping over $100</p>
            <p className="mt-1">14-day return policy and secure checkout guarantee.</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-black/10 bg-white p-5">
        <div className="flex gap-2">
          {[
            ["description", "Description"],
            ["specs", "Specifications"],
            ["reviews", "Reviews"],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={`rounded-lg px-3 py-1.5 text-sm ${tab === id ? "bg-black text-white" : "bg-neutral-100"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-neutral-700">
          {tab === "description" && <p>{product.description}</p>}
          {tab === "specs" && (
            <ul className="list-disc space-y-1 pl-5">
              {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
            </ul>
          )}
          {tab === "reviews" && (
            <div>
              <div className="mb-3 flex flex-wrap gap-2 text-xs">
                <button type="button" className="rounded-full border px-3 py-1">All Reviews</button>
                <button type="button" className="rounded-full border px-3 py-1">5★</button>
                <button type="button" className="rounded-full border px-3 py-1">4★+</button>
              </div>
              <p>Customers love the fit, quality, and finish. Review sentiment: highly positive.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => <ProductCard key={item.id} product={item} onQuickView={setQuickView} />)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Recently Viewed</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentlyViewedProducts.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} onQuickView={setQuickView} />)}
        </div>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
