import { useEffect, useState } from "react";

const KEY = "stylehub-cookie-consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(KEY) === "yes";
    setOpen(!hasConsent);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-2xl border border-black/10 bg-white p-4 shadow-2xl">
      <p className="text-sm text-neutral-700">
        We use cookies to improve experience, analytics, and personalized offers.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-lg border border-black px-3 py-1.5 text-sm"
          onClick={() => setOpen(false)}
        >
          Decline
        </button>
        <button
          type="button"
          className="rounded-lg bg-black px-3 py-1.5 text-sm text-white"
          onClick={() => {
            localStorage.setItem(KEY, "yes");
            setOpen(false);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
