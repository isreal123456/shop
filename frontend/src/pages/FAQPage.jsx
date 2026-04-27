import { useMemo, useState } from "react";
import { faqs } from "../data/siteContent";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return faqs;
    return faqs
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length);
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <input
        className="mt-4 w-full rounded-xl border border-neutral-300 px-4 py-3"
        placeholder="Search FAQ"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="mt-6 space-y-6">
        {filtered.map((group) => (
          <section key={group.category}>
            <h2 className="text-xl font-semibold">{group.category}</h2>
            <div className="mt-3 space-y-2">
              {group.items.map((item) => {
                const key = `${group.category}-${item.q}`;
                const isOpen = open === key;
                return (
                  <article key={key} className="rounded-xl border border-black/10 bg-white p-4">
                    <button type="button" className="flex w-full items-center justify-between text-left font-medium" onClick={() => setOpen(isOpen ? "" : key)}>
                      {item.q}
                      <span>{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <p className="mt-2 text-sm text-neutral-600">{item.a}</p>}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
