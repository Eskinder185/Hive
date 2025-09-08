import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import "../honey.css";

export default function Landing() {
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate("/", { replace: true }); // back to SignInPage
  }

  return (
    <main className="container" style={{ marginTop: 140 }}>
      <section className="card hero">
        <div>
          <h1 className="title honey-shimmer">Hive — Private Neighborhood Chat</h1>
          <p className="sub">Invite-only. Encrypted. Bee-themed 🐝</p>

          <div className="cta">
            <button className="btn" onClick={() => navigate("/invite")}>
              Join with Invite Code
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/app")}>
              Open App
            </button>
            <button className="btn" onClick={() => navigate("/admin")}>
              Admin
            </button>
          </div>

          {/* Sign Out button lives here */}
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-outline" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
