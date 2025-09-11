import FeatureShell from "./FeatureShell.jsx";

export default function InviteInfo(){
  return (
    <FeatureShell
      title="Join with Invite"
      lead="Hive is invite‑only to keep conversations local and trustworthy."
      cta="Have a code? Join now"
      ctaTo="/invite"
    >
      <div className="card stack">
        <h3>How it works</h3>
        <ul>
          <li>Get an invite code from your neighborhood’s Queen (admin).</li>
          <li>Enter the code to join your local hive.</li>
          <li>Set up your profile and start chatting.</li>
        </ul>
      </div>
    </FeatureShell>
  );
}

