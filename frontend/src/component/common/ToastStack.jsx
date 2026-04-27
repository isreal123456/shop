import { useEffect } from "react";
import { useStore } from "../../context/StoreContext";

export default function ToastStack() {
  const { state, dismissToast } = useStore();

  useEffect(() => {
    if (!state.toasts.length) return;
    const timers = state.toasts.map((toast) =>
      setTimeout(() => dismissToast(toast.id), 2600),
    );
    return () => timers.forEach((id) => clearTimeout(id));
  }, [state.toasts, dismissToast]);

  return (
    <div className="fixed right-4 top-20 z-70 flex w-80 flex-col gap-2">
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-xl border border-black/10 bg-white p-3 text-sm shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
