import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { useStore } from "../../context/StoreContext";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
];

export default function Header() {
  const { state } = useStore();
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur ${sticky ? "shadow-lg" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button type="button" className="rounded-lg border border-neutral-300 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <FiMenu />
        </button>
        <Link to="/" className="text-2xl font-extrabold tracking-tight">StyleHub</Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-black" : "text-neutral-600 hover:text-black"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form className="ml-auto hidden max-w-md flex-1 items-center rounded-xl border border-neutral-300 px-3 py-2 md:flex" action="/search">
          <FiSearch className="text-neutral-500" />
          <input
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="w-full bg-transparent px-2 text-sm outline-none"
            aria-label="Search"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link to="/account/login" className="rounded-lg p-2 hover:bg-neutral-100" aria-label="Account">
            <FiUser />
          </Link>
          <Link to="/account/wishlist" className="relative rounded-lg p-2 hover:bg-neutral-100" aria-label="Wishlist">
            <FiHeart />
            {!!state.wishlist.length && <span className="absolute -right-1 -top-1 rounded-full bg-black px-1.5 text-[10px] text-white">{state.wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="relative rounded-lg p-2 hover:bg-neutral-100" aria-label="Cart">
            <FiShoppingBag />
            {!!cartCount && <span className="absolute -right-1 -top-1 rounded-full bg-black px-1.5 text-[10px] text-white">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-60 bg-black/35 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="h-full w-80 bg-white p-4" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xl font-bold">Menu</p>
              <button type="button" aria-label="Close menu" className="rounded-lg p-2 hover:bg-neutral-100" onClick={() => setMobileOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="bg-gray-200 rounded-3xl">
            <nav className="">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100">
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/account/login" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100">Account</NavLink>
              <NavLink to="/account/orders" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100">Orders</NavLink>
            </nav>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
