import FeatureShell from "./FeatureShell.jsx";

export default function DMs(){
  return (
    <FeatureShell
      title="Direct Messages"
      lead="Start private, one‑on‑one conversations with neighbors you trust."
      cta="Open App"
      ctaTo="/app"
    >
      <div className="card">
        <h3>Why DMs?</h3>
        <p className="lead">Coordinate details, share sensitive info, or just say hello — without broadcasting to the whole block.</p>
      </div>
    </FeatureShell>
  );
}

