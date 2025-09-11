import FeatureShell from "./FeatureShell.jsx";

export default function SettingsInfo(){
  return (
    <FeatureShell
      title="Settings"
      lead="Control notifications, privacy, and security options to match your comfort."
      cta="Open Settings"
      ctaTo="/settings"
    >
      <div className="grid">
        <div className="feature-card col-6">
          <h3>Notifications</h3>
          <p>Choose which rooms ping you and when. Quiet hours supported.</p>
        </div>
        <div className="feature-card col-6">
          <h3>Privacy</h3>
          <p>Decide what’s visible to neighbors and how others can contact you.</p>
        </div>
      </div>
    </FeatureShell>
  );
}

