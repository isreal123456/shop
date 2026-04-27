export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-[#1c1c1c] p-8 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-300">About StyleHub</p>
        <h1 className="mt-3 text-4xl font-bold">Our Story</h1>
        <p className="mt-3 max-w-2xl text-neutral-300">We started StyleHub to make premium, wearable design accessible without compromise.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border bg-white p-5"><h2 className="text-xl font-semibold">Mission</h2><p className="mt-2 text-sm text-neutral-600">Deliver high quality essentials with transparent sourcing.</p></article>
        <article className="rounded-2xl border bg-white p-5"><h2 className="text-xl font-semibold">Values</h2><p className="mt-2 text-sm text-neutral-600">Quality, inclusivity, and responsible craftsmanship.</p></article>
        <article className="rounded-2xl border bg-white p-5"><h2 className="text-xl font-semibold">Vision</h2><p className="mt-2 text-sm text-neutral-600">Build the most trusted everyday style destination.</p></article>
      </section>

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="text-2xl font-bold">Our Team</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Maya", "Creative Director"],
            ["Ken", "Product Lead"],
            ["Aisha", "Brand Strategist"],
            ["Luis", "Operations Lead"],
          ].map(([name, role]) => (
            <article key={name} className="rounded-xl bg-neutral-100 p-4">
              <div className="h-20 w-20 rounded-full bg-neutral-300" />
              <p className="mt-3 font-semibold">{name}</p>
              <p className="text-sm text-neutral-600">{role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="text-2xl font-bold">Timeline</h2>
        <ul className="mt-4 space-y-3 text-sm text-neutral-700">
          <li>2019: StyleHub launched with curated capsule collection.</li>
          <li>2021: Expanded to accessories and footwear.</li>
          <li>2024: Reached 50k+ customers globally.</li>
          <li>2026: New personalization and fit tools launched.</li>
        </ul>
      </section>
    </div>
  );
}
