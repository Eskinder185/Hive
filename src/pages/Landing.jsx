import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import BeesField from "../components/animations/BeesField.jsx";

export default function Landing() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  const features = [
    { title: "Chat Rooms", path: "/features/chat-rooms", desc: "Organize conversations by topic." },
    { title: "DMs", path: "/features/dms", desc: "Private one‑on‑one messages." },
    { title: "Join with Invite", path: "/features/join", desc: "How invites work." },
    { title: "Neighbors", path: "/features/neighbors", desc: "Directory and safety tips." },
    { title: "Events", path: "/features/events", desc: "Local happenings and meetups." },
    { title: "Lost & Found", path: "/features/lost-found", desc: "Help items and pets get home." },
    { title: "Marketplace", path: "/features/marketplace", desc: "Local buy/sell rules." },
    { title: "Requests for Help", path: "/features/requests", desc: "Mutual aid and support." },
    { title: "Safety Center", path: "/features/safety", desc: "Report, block, and moderation." },
    { title: "Settings", path: "/features/settings", desc: "Notifications and privacy." },
    { title: "About", path: "/about", desc: "Mission and values." },
    { title: "FAQ", path: "/faq", desc: "Common questions." }
  ];

  return (
    <>
      <Navbar />
      <div style={{ position: "relative" }}>
        <BeesField />
      </div>
      <main className="container" style={{ marginTop: 12, position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <section className="card hero stack">
          <div className="kicker">
            <span className="pill">Invite-only</span>
            <span className="pill">Encrypted</span>
            <span className="pill">Neighborhood</span>
          </div>
          <h1>Hive — Private Neighborhood Chat</h1>
          <p className="lead">Stay connected with verified neighbors in a private, invite‑only space.</p>
          <div className="row">
            <Link className="btn btn-primary" to="/invite">Join with Invite</Link>
            <Link className="btn btn-outline" to="/app">Open App</Link>
            <Link className="btn" to="/admin">Admin</Link>
          </div>

          <div className="image-banner">
            <img src="images/bees-hero.jpg" alt="Bees flying over honeycomb" />
          </div>
        </section>

        {/* Explore grid */}
        <section className="stack" style={{ marginTop: 18 }}>
          <h2>Explore Hive</h2>
          <div className="grid">
            {features.map((f) => (
              <Link key={f.title} to={f.path} className="feature-card col-4" aria-label={`Open ${f.title}`}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer banner */}
        <section className="stack" style={{ marginTop: 18 }}>
          <div className="image-banner">
            <img src="images/neighborhood.jpg" alt="Neighborhood street with houses and trees" />
          </div>
          <div className="footer-note">v0.2 · Built: {today}</div>
        </section>
      </main>
    </>
  );
}
