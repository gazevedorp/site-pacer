export function PageSkeleton() {
  return (
    <div
      className="flex min-h-screen flex-col"
      role="status"
      aria-label="Carregando página..."
    >
      {/* Hero skeleton */}
      <div className="h-[60vh] w-full animate-pulse bg-card/50" />

      {/* Content skeletons */}
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="space-y-3">
          <div className="mx-auto h-4 w-24 animate-pulse rounded-full bg-primary/20" />
          <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-card/70" />
          <div className="mx-auto h-4 w-48 animate-pulse rounded bg-card/40" />
        </div>

        {/* Card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-2xl bg-card/60"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>

      <span className="sr-only">Carregando...</span>
    </div>
  );
}
