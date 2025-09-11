import FeatureShell from "./FeatureShell.jsx";

export default function LostFound(){
  return (
    <FeatureShell
      title="Lost & Found"
      lead="Help items and pets find their way home — safely and quickly."
    >
      <div className="grid">
        <div className="feature-card col-6">
          <h3>How to post</h3>
          <ul>
            <li>Include a photo, location, and time seen.</li>
            <li>Avoid sharing private addresses publicly.</li>
            <li>Mark as resolved once found.</li>
          </ul>
        </div>
        <div className="feature-card col-6">
          <h3>Safety tips</h3>
          <ul>
            <li>Do not enter private property without permission.</li>
            <li>Be careful handling unfamiliar animals.</li>
          </ul>
        </div>
      </div>
    </FeatureShell>
  );
}

