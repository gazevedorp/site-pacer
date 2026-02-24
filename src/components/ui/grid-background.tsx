export function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(233, 181, 29, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(233, 181, 29, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}
