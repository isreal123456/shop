import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiFacebook, FiGithub } from "react-icons/fi";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { useStore } from "../context/StoreContext";

export default function LoginRegisterPage() {
  const [mode, setMode] = useState("login");
  const { setUser } = useStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    setUser({ name: data.name || "StyleHub Member", email: data.email });
    navigate("/account");
  }

  return (
    <div>
      <Breadcrumbs />
      <div className="mx-auto max-w-xl rounded-2xl border border-black/35 bg-white p-6">
        <h1 className="text-3xl font-bold">{mode === "login" ? "Login" : "Create Account"}</h1>
        <p className="mt-1 text-sm text-neutral-600">Access orders, wishlist, and saved addresses.</p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {mode === "register" && (
            <div>
              <label className="text-sm font-medium">Name</label>
              <input className="mt-1 w-full rounded-lg border border-black/35 px-3 py-2" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input className="mt-1 w-full rounded-lg border border-black/35 px-3 py-2" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" className="mt-1 w-full rounded-lg border border-black/35 px-3 py-2" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })} />
            {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
          </div>
          {mode === "login" && <button type="button" className="text-xs underline">Forgot password?</button>}
          <button type="submit" className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white">
            {mode === "login" ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="mt-5">
          <p className="text-center text-xs text-neutral-500">or continue with</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="flex-1 rounded-lg border border-black/35 px-3 py-2 text-sm"><FiGoogleFallback /> Google</button>
            <button type="button" className="flex-1 rounded-lg border border-black/35 px-3 py-2 text-sm"><FiFacebook className="inline" /> Facebook</button>
            <button type="button" className="flex-1 rounded-lg border border-black/35 px-3 py-2 text-sm"><FiGithub className="inline" /> GitHub</button>
          </div>
        </div>

        <p className="mt-5 text-center text-sm">
          {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
          <button type="button" className="font-semibold underline" onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}>
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

function FiGoogleFallback() {
  return <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500" aria-hidden="true" />;
}
