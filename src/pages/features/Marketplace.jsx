import FeatureShell from "./FeatureShell.jsx";

export default function Marketplace(){
  return (
    <FeatureShell
      title="Marketplace"
      lead="Buy, sell, and give away items within your neighborhood."
    >
      <div className="card stack">
        <h3>Guidelines</h3>
        <ul>
          <li>Be honest about item condition.</li>
          <li>Meet in public places; bring a friend for high‑value trades.</li>
          <li>Cashless payments are recommended for safety.</li>
        </ul>
      </div>
    </FeatureShell>
  );
}

