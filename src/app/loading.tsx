export default function Loading() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center"
      aria-label="Loading..."
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{
            borderColor: "var(--border-default)",
            borderTopColor: "var(--accent)",
          }}
          aria-hidden="true"
        />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading…
        </p>
      </div>
    </div>
  );
}
