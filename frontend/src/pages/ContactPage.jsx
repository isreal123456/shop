import { useForm } from "react-hook-form";

export default function ContactPage() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border bg-white p-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-sm text-neutral-600">We usually reply within 24 hours.</p>
        <form className="mt-5 space-y-3" onSubmit={handleSubmit(() => {})}>
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Name" {...register("name")} />
          <input className="w-full rounded-lg border px-3 py-2" placeholder="Email" {...register("email")} />
          <textarea className="h-32 w-full rounded-lg border px-3 py-2" placeholder="Message" {...register("message")} />
          <button type="submit" className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">Send Message</button>
        </form>
      </section>

      <section className="space-y-4">
        <article className="rounded-2xl border bg-white p-5">
          <h2 className="text-xl font-semibold">Store Locations</h2>
          <p className="mt-2 text-sm text-neutral-600">New York • London • Dubai</p>
          <div className="mt-3 h-44 rounded-xl bg-neutral-200 p-3 text-sm text-neutral-600">Map Placeholder</div>
        </article>
        <article className="rounded-2xl border bg-white p-5">
          <h2 className="text-xl font-semibold">Contact Details</h2>
          <p className="mt-2 text-sm">Phone: +1 555 123 7788</p>
          <p className="text-sm">Email: support@stylehub.com</p>
          <p className="text-sm">Business Hours: Mon-Sat, 9:00-18:00</p>
          <a href="/faq" className="mt-3 inline-block text-sm underline">Visit FAQ</a>
        </article>
      </section>
    </div>
  );
}
