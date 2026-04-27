import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../component/common/Breadcrumbs";
import ProductCard from "../component/common/ProductCard";
import QuickViewModal from "../component/common/QuickViewModal";
import LoadingSkeleton from "../component/common/LoadingSkeleton";
import { brands, categories, colors, products, sizes } from "../data/products";

function inRange(price, min, max) {
  return price >= min && price <= max;
}

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const presetCategory = searchParams.get("category") || "";
  const [quickView, setQuickView] = useState(null);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: presetCategory,
    brand: "",
    color: "",
    size: "",
    rating: 0,
    min: 0,
    max: 300,
  });

  const filtered = useMemo(() => {
    let data = products.filter((p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.color || p.colors.includes(filters.color)) &&
      (!filters.size || p.sizes.includes(filters.size)) &&
      (!filters.rating || p.rating >= filters.rating) &&
      inRange(p.price, filters.min, filters.max),
    );

    if (sort === "price-asc") data = [...data].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") data = [...data].sort((a, b) => b.price - a.price);
    if (sort === "rating") data = [...data].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") data = [...data].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === "popular") data = [...data].sort((a, b) => Number(b.isPopular) - Number(a.isPopular));

    return data;
  }, [filters, sort]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  function applyFilter(key, value) {
    setLoading(true);
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setLoading(false), 350);
  }

  function clearFilter(key) {
    const fallback = { rating: 0, min: 0, max: 300 };
    applyFilter(key, fallback[key] ?? "");
  }

  return (
    <div>
      <Breadcrumbs />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Shop Collection</h1>
          <p className="text-sm text-neutral-600">{filtered.length} results found</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className={`rounded-lg border px-3 py-1.5 text-sm ${view === "grid" ? "bg-black text-white" : ""}`} onClick={() => setView("grid")}>Grid</button>
          <button type="button" className={`rounded-lg border px-3 py-1.5 text-sm ${view === "list" ? "bg-black text-white" : ""}`} onClick={() => setView("list")}>List</button>
          <select className="rounded-lg border border-neutral-300 px-3 py-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5 rounded-2xl border border-black/10 bg-white p-4">
          <div>
            <p className="text-sm font-semibold">Categories</p>
            <select className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" value={filters.category} onChange={(e) => applyFilter("category", e.target.value)}>
              <option value="">All</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <p className="text-sm font-semibold">Price Range</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input type="number" className="rounded-lg border px-2 py-1.5 text-sm" value={filters.min} onChange={(e) => applyFilter("min", Number(e.target.value))} />
              <input type="number" className="rounded-lg border px-2 py-1.5 text-sm" value={filters.max} onChange={(e) => applyFilter("max", Number(e.target.value))} />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Rating</p>
            <select className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" value={filters.rating} onChange={(e) => applyFilter("rating", Number(e.target.value))}>
              <option value={0}>All</option>
              <option value={4}>4★ & up</option>
              <option value={4.5}>4.5★ & up</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-semibold">Size</p>
            <select className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" value={filters.size} onChange={(e) => applyFilter("size", e.target.value)}>
              <option value="">All</option>
              {sizes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <p className="text-sm font-semibold">Color</p>
            <select className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" value={filters.color} onChange={(e) => applyFilter("color", e.target.value)}>
              <option value="">All</option>
              {colors.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          <div>
            <p className="text-sm font-semibold">Brand</p>
            <select className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" value={filters.brand} onChange={(e) => applyFilter("brand", e.target.value)}>
              <option value="">All</option>
              {brands.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || value === 0) return null;
              return (
                <button key={key} type="button" className="rounded-full border border-black/20 px-3 py-1 text-xs" onClick={() => clearFilter(key)}>
                  {key}: {value} ✕
                </button>
              );
            })}
          </div>

          {loading ? (
            <LoadingSkeleton count={8} />
          ) : !filtered.length ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
              <p className="text-xl font-semibold">No products found</p>
              <p className="mt-2 text-sm text-neutral-600">Try adjusting filters or browse new arrivals.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paged.map((product) => (
                <div key={product.id} className="grid gap-4 rounded-2xl border border-black/10 bg-white p-4 md:grid-cols-[180px_1fr]">
                  <img src={product.images[0]} alt={product.name} className="h-44 w-full rounded-xl object-cover" />
                  <div>
                    <p className="text-sm text-neutral-500">{product.brand}</p>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{product.description}</p>
                    <p className="mt-3 text-lg font-bold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2">
            <button type="button" className="rounded-lg border px-3 py-1.5 text-sm" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
            <span className="text-sm">{page} / {totalPages}</span>
            <button type="button" className="rounded-lg border px-3 py-1.5 text-sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
          </div>
        </section>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
