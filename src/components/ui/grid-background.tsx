export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(17, 17, 17, 0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(17, 17, 17, 0.6) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}
