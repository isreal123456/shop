import { Link } from "react-router-dom";
import { FiArrowRight, FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

const companyLinks = [
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Press & Blog" },
  { to: "/contact", label: "Careers" },
  { to: "/shop", label: "Affiliates" },
];

const supportLinks = [
  { to: "/faq", label: "Shipping Policy" },
  { to: "/faq", label: "Return Policy" },
  { to: "/account/orders", label: "Track Order" },
  { to: "/contact", label: "Contact Support" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: FiInstagram },
  { href: "https://facebook.com", label: "Facebook", icon: FiFacebook },
  { href: "https://twitter.com", label: "Twitter", icon: FiTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FiLinkedin },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#111111] text-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-white">StyleHub</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-400">Premium fashion and lifestyle essentials for modern everyday living.</p>
          <div className="mt-4 flex gap-3 text-lg">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-neutral-700 p-2 text-neutral-300 transition hover:border-neutral-500 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Customer Service</p>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Newsletter</p>
          <p className="mt-3 text-sm text-neutral-400">Get style drops, product launches, and members-only offers.</p>
          <form className="mt-3 flex gap-2" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              aria-label="Email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none ring-0 placeholder:text-neutral-500 focus:border-neutral-500"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-lg bg-white px-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Join
              <FiArrowRight />
            </button>
          </form>
          <p className="mt-2 text-xs text-neutral-500">By subscribing, you agree to our terms and privacy policy.</p>
          <p className="mt-4 text-xs text-neutral-500">Visa • Mastercard • PayPal • Apple Pay</p>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-neutral-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} StyleHub. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link to="/faq" className="transition hover:text-neutral-300">Privacy</Link>
            <span aria-hidden="true">•</span>
            <Link to="/faq" className="transition hover:text-neutral-300">Terms</Link>
            <span aria-hidden="true">•</span>
            <Link to="/contact" className="transition hover:text-neutral-300">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
