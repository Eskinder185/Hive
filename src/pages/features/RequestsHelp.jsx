import FeatureShell from "./FeatureShell.jsx";

export default function RequestsHelp(){
  return (
    <FeatureShell
      title="Requests for Help"
      lead="Coordinate mutual aid: small errands, tool lending, and support when it matters."
    >
      <div className="card stack">
        <h3>Ways to help</h3>
        <ul>
          <li>Share tools or expertise.</li>
          <li>Offer rides or pickup for essential errands.</li>
          <li>Check in on neighbors during storms or outages.</li>
        </ul>
      </div>
    </FeatureShell>
  );
}

