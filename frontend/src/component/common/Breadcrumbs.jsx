import { Link, useLocation } from "react-router-dom";

const labels = {
  shop: "Shop",
  cart: "Cart",
  checkout: "Checkout",
  account: "My Account",
  orders: "Order History",
  settings: "Account Settings",
  wishlist: "Wishlist",
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  blog: "Blog",
  search: "Search",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-black">Home</Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const text = labels[segment] || segment.replace(/-/g, " ");
          return (
            <li key={path} className="flex items-center gap-2">
              <span>/</span>
              <Link className="capitalize hover:text-black" to={path}>
                {text}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
