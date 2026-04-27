import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-black/10 bg-white p-10 text-center">
      <p className="text-6xl font-black">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-neutral-600">We could not find what you are looking for.</p>
      <input className="mt-5 w-full rounded-xl border px-4 py-3" placeholder="Search products" aria-label="Search" />
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
        <Link to="/shop?category=Women" className="rounded-full border px-3 py-1">Women</Link>
        <Link to="/shop?category=Men" className="rounded-full border px-3 py-1">Men</Link>
        <Link to="/shop?category=Accessories" className="rounded-full border px-3 py-1">Accessories</Link>
      </div>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white">Back to Home</Link>
    </div>
  );
}
