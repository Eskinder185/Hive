import Navbar from "../components/Navbar.jsx";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ marginTop: 12 }}>
        {/* Mission */}
        <section className="card stack">
          <h1>Our Mission</h1>
          <p className="lead">Help neighbors connect, organize, and stay safe in a trusted, invite‑only space.</p>
        </section>

        {/* Values */}
        <section className="stack" style={{ marginTop: 18 }}>
          <h2>Values</h2>
          <div className="grid">
            {[
              ["Privacy","End‑to‑end encryption keeps conversations for your eyes only."],
              ["Safety","Verified neighbors, clear rules, and strong moderation tools."],
              ["Kindness","Assume good intent and treat everyone with respect."],
              ["Local First","Neighborhood‑level rooms and events, organized by you."],
              ["Transparency","Clear roles, simple policies, and open communication."],
              ["Reliability","Fast, lightweight, and accessible for all devices."]
            ].map(([t,d]) => (
              <div key={t} className="feature-card col-4">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety commitment */}
        <section className="card stack" style={{ marginTop: 18 }}>
          <h2>Safety Commitment</h2>
          <p className="lead">We take reports seriously and prioritize proactive safety features. Moderators have clear tools to keep the hive healthy.</p>
        </section>

        {/* How it works */}
        <section className="stack" style={{ marginTop: 18 }}>
          <h2>How Hive Works</h2>
          <div className="grid">
            <div className="feature-card col-4"><h3>1 — Join</h3><p>Ask a neighbor for an invite code and verify.</p></div>
            <div className="feature-card col-4"><h3>2 — Connect</h3><p>Join rooms, meet neighbors, share updates and events.</p></div>
            <div className="feature-card col-4"><h3>3 — Contribute</h3><p>Help out, report issues, and keep the hive thriving.</p></div>
          </div>
        </section>

        {/* Hive hierarchy */}
        <section className="stack" style={{ marginTop: 18 }}>
          <h2>Hive Hierarchy</h2>
          <div className="grid">
            <div className="feature-card col-4"><h3>Queens</h3><p>Admins who manage invites, rooms, and global settings.</p></div>
            <div className="feature-card col-4"><h3>Soldiers</h3><p>Moderators who help keep conversations safe and on‑topic.</p></div>
            <div className="feature-card col-4"><h3>Workers</h3><p>Neighbors who participate, organize, and build community.</p></div>
          </div>
        </section>

        {/* Contact */}
        <section className="card stack" style={{ marginTop: 18 }}>
          <h2>Questions or Feedback?</h2>
          <p className="lead">We’d love to hear from you. Share ideas, report issues, or say hello.</p>
          <a className="btn btn-primary" href="mailto:hello@example.com">Contact the Hive Team</a>
        </section>
      </main>
    </>
  );
}

