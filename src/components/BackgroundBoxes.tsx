export function BackgroundBoxes() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      <div className="absolute inset-0 bg-grid-pattern animate-grid-pulse" />
    </div>
  );
}
