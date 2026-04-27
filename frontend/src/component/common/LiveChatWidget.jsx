import { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-40 sm:left-auto sm:right-4 sm:bottom-20">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
          <p className="text-sm font-semibold">Live Chat (UI Demo)</p>
          <p className="mt-2 text-sm text-neutral-600">Hi there. Our support team replies in 2-5 minutes.</p>
          <input
            className="mt-3 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            placeholder="Type your message"
            aria-label="Type your message"
          />
        </div>
      )}
      <button
        type="button"
        aria-label="Toggle live chat"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full bg-black p-3 text-white shadow-lg"
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
}
