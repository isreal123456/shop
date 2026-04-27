import { useForm } from "react-hook-form";
import Breadcrumbs from "../component/common/Breadcrumbs";

export default function AccountSettingsPage() {
  const { register, handleSubmit } = useForm({ defaultValues: { name: "", email: "", phone: "" } });

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form className="rounded-2xl border bg-white p-5" onSubmit={handleSubmit(() => {})}>
          <h2 className="text-xl font-semibold">Profile</h2>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-lg border px-3 py-2" placeholder="Name" {...register("name")} />
            <input className="w-full rounded-lg border px-3 py-2" placeholder="Email" {...register("email")} />
            <input className="w-full rounded-lg border px-3 py-2" placeholder="Phone" {...register("phone")} />
          </div>
          <button type="submit" className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
        </form>

        <section className="space-y-4">
          <div className="rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-semibold">Addresses</h2>
            <p className="mt-2 text-sm text-neutral-600">Add, edit, delete, and set default addresses.</p>
            <button type="button" className="mt-3 rounded-lg border px-3 py-1.5 text-sm">Manage Addresses</button>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-semibold">Email Preferences</h2>
            <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Product updates</label>
            <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> Promotions and discounts</label>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
            <h2 className="text-xl font-semibold text-rose-700">Delete Account</h2>
            <p className="mt-2 text-sm text-rose-700">This action is permanent.</p>
            <button type="button" className="mt-3 rounded-lg border border-rose-300 px-3 py-1.5 text-sm text-rose-700">Delete My Account</button>
          </div>
        </section>
      </div>
    </div>
  );
}
