import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../component/common/ProductCard";

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter((item) =>
      item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q),
    );
  }, [query]);

  const suggestion = products.find((item) => item.name.toLowerCase().includes("shirt"));

  return (
    <div>
      <h1 className="text-3xl font-bold">Search Results</h1>
      <p className="mt-2 text-sm text-neutral-600">Query: "{query}" • {results.length} matches</p>

      {!results.length ? (
        <div className="mt-6 rounded-2xl border border-dashed bg-white p-10 text-center">
          <p className="text-xl font-semibold">No results found</p>
          <p className="mt-2 text-sm text-neutral-600">Try checking spelling or browsing categories.</p>
          {suggestion && (
            <p className="mt-3 text-sm">Did you mean <Link to={`/product/${suggestion.slug}`} className="underline">{suggestion.name}</Link>?</p>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}
        </div>
      )}
    </div>
  );
}
