export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="animate-pulse rounded-2xl border border-black/10 bg-white p-3">
          <div className="h-56 rounded-xl bg-neutral-200" />
          <div className="mt-3 h-4 w-2/3 rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-1/3 rounded bg-neutral-200" />
          <div className="mt-4 h-9 rounded bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}
