import FeatureShell from "./FeatureShell.jsx";

export default function SafetyCenter(){
  return (
    <FeatureShell
      title="Safety Center"
      lead="Report issues, block users, and learn how moderation keeps your hive safe."
      cta="Read About Our Commitment"
      ctaTo="/about"
      ctaVariant="btn-outline"
    >
      <div className="grid">
        <div className="feature-card col-6">
          <h3>Report & Block</h3>
          <p>Flag harmful content or block accounts. Moderators review reports promptly.</p>
        </div>
        <div className="feature-card col-6">
          <h3>Moderation</h3>
          <p>Soldiers (moderators) apply clear rules, escalate to Queens (admins) if needed.</p>
        </div>
      </div>
    </FeatureShell>
  );
}

