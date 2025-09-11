import FeatureShell from "./FeatureShell.jsx";

export default function Neighbors(){
  return (
    <FeatureShell
      title="Neighbors Directory"
      lead="See who’s nearby, connect with trusted neighbors, and build community."
    >
      <div className="grid">
        <div className="feature-card col-6">
          <h3>What you’ll find</h3>
          <p>Profiles, interests, and ways to get in touch (as they choose to share).</p>
        </div>
        <div className="feature-card col-6">
          <h3>Safety tips</h3>
          <ul>
            <li>Verify profiles before sharing sensitive information.</li>
            <li>Meet in public places when exchanging items.</li>
            <li>Report suspicious accounts to moderators.</li>
          </ul>
        </div>
      </div>
    </FeatureShell>
  );
}

