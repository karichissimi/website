export default function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Green orb top-right */}
      <div className="glow-orb absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-primary/[0.04] blur-[100px]" />
      {/* Cyan orb bottom-left */}
      <div className="glow-orb-slow absolute -bottom-48 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-accent/[0.05] blur-[100px]" />
      {/* Pink orb center-right */}
      <div className="glow-orb absolute top-1/2 -right-64 w-[300px] h-[300px] rounded-full bg-pink-accent/[0.03] blur-[80px]" />
    </div>
  );
}
