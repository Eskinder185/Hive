import FeatureShell from "./FeatureShell.jsx";

export default function Events(){
  return (
    <FeatureShell
      title="Neighborhood Events"
      lead="Organize meetups, parties, clean‑ups, and more."
    >
      <div className="card stack">
        <h3>Ideas</h3>
        <ul>
          <li>Monthly block party</li>
          <li>Yard sale weekend</li>
          <li>Neighborhood watch meeting</li>
        </ul>
      </div>
    </FeatureShell>
  );
}

