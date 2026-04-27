import { Link } from "react-router-dom";
import { products, categories } from "../data/products";
import { heroSlides, testimonials } from "../data/siteContent";
import HeroSlider from "../component/home/HeroSlider";
import ProductCard from "../component/common/ProductCard";
import QuickViewModal from "../component/common/QuickViewModal";
import { useState } from "react";

export default function HomePage() {
  const [quickView, setQuickView] = useState(null);
  const featured = products.filter((p) => p.isPopular).slice(0, 8);

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Trending Products</h2>
          <Link to="/shop" className="text-sm font-semibold underline">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold sm:text-3xl">Shop By Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              className="group relative h-48 overflow-hidden rounded-2xl"
            >
              <img
                src={`https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80&sig=${idx}`}
                alt={category}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30" />
              <p className="absolute bottom-4 left-4 text-xl font-semibold text-white">{category}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-[#131313] p-8 text-white">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Special Offer</p>
            <h2 className="mt-3 text-3xl font-bold">Weekend Deal: Up to 40% Off</h2>
            <p className="mt-3 text-neutral-300">Grab curated styles at limited-time prices. Offer ends Sunday midnight.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black">Shop Deals</Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80"
            alt="Offer"
            className="h-64 w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="mt-14 grid gap-6 rounded-3xl bg-[#efe6da] p-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">Why StyleHub</p>
          <h2 className="mt-3 text-3xl font-bold">Designed For Everyday Confidence</h2>
          <p className="mt-3 text-neutral-700">We combine premium fabrics, intentional silhouettes, and responsible sourcing to deliver essentials that last.</p>
          <ul className="mt-5 space-y-2 text-sm text-neutral-700">
            <li>• Free shipping over $100</li>
            <li>• 14-day hassle free returns</li>
            <li>• Secure checkout with trusted payments</li>
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-2xl font-bold">50k+</p><p className="text-sm text-neutral-600">Happy customers</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-2xl font-bold">120+</p><p className="text-sm text-neutral-600">Curated products</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-2xl font-bold">4.8/5</p><p className="text-sm text-neutral-600">Average review rating</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-2xl font-bold">24/7</p><p className="text-sm text-neutral-600">Customer support</p></div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold sm:text-3xl">Customer Reviews</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-2xl border border-black/10 bg-white p-5">
              <p className="text-amber-500">{"★".repeat(item.rating)}</p>
              <p className="mt-3 text-neutral-700">"{item.quote}"</p>
              <p className="mt-4 text-sm font-semibold">{item.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold sm:text-3xl">From Instagram</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <img
              key={idx}
              src={`https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80&sig=${idx}`}
              alt={`Instagram post ${idx + 1}`}
              className="h-40 w-full rounded-xl object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-[#1d1d1d] p-8 text-white">
        <h2 className="text-3xl font-bold">Join Our Newsletter</h2>
        <p className="mt-2 text-neutral-300">Get style guides, early access, and exclusive discounts.</p>
        <form className="mt-5 flex flex-wrap gap-3">
          <input className="min-w-[220px] flex-1 rounded-xl border border-white/30 bg-transparent px-4 py-3" placeholder="Enter your email" aria-label="Email" />
          <button type="button" className="rounded-xl bg-white px-5 py-3 font-semibold text-black">Subscribe</button>
        </form>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
