export function AeroOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`aero-orb-row ${className}`.trim()} aria-hidden="true">
      <span className="aero-orb" />
      <span className="aero-orb leaf" />
      <span className="sparkle" />
      <span className="sparkle" style={{ animationDelay: "0.8s" }} />
    </div>
  );
}
