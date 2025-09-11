import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import Navbar from "../components/Navbar.jsx";
import AuthGate from "../components/AuthGate.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import HoneycombBG from "../components/animations/HoneycombBG.jsx";

export default function SignInPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInEmail, signInGoogle } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) navigate("/landing", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  return (
    <>
      <HoneycombBG />
      <Navbar />
      <main className="container" style={{ display: "grid", placeItems: "center", minHeight: "70vh", position: "relative", zIndex: 1 }}>
        <section className="card" style={{ width: "min(560px, 100%)" }}>
          <div className="stack" style={{ alignItems: "center" }}>
            <div className="logo-dot" aria-hidden>🐝</div>
            <h1 style={{ marginTop: 6, marginBottom: 0 }}>Welcome to Hive</h1>
            <p className="lead" style={{ textAlign: "center" }}>
              Private neighborhood chat. Invite-only and end‑to‑end encrypted.
            </p>

            {/* Tabs */}
            <div className="tabbar" role="tablist" aria-label="Sign in or join">
              <button role="tab" aria-selected="true">Sign In</button>
              <Link role="tab" aria-selected="false" className="btn btn-sm btn-quiet" to="/invite">Join with Invite</Link>
            </div>

            {/* Email + password mock UI (non-functional placeholder) */}
            <form
              className="stack"
              style={{ width: "100%", gap: 12 }}
              onSubmit={async (e)=>{
                e.preventDefault();
                try{
                  await signInEmail(email, password);
                  navigate("/app", { replace:true });
                }catch(err){
                  alert("Sign-in failed: " + (err?.message || err));
                }
              }}
            >
              <label>
                <span className="sr-only">Email</span>
                <input className="input" type="email" inputMode="email" autoComplete="username" placeholder="you@example.com" aria-label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </label>
              <div className="input-row">
                <label style={{ flex: 1 }}>
                  <span className="sr-only">Password</span>
                  <input className="input" type={showPass ? "text" : "password"} autoComplete="current-password" placeholder="Password" aria-label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </label>
                <button type="button" className="btn" aria-pressed={showPass} onClick={()=>setShowPass(v=>!v)} title={showPass?"Hide password":"Show password"}>
                  {showPass ? "🙈" : "👁️"}
                  <span className="sr-only">Toggle password visibility</span>
                </button>
              </div>
              <button className="btn btn-primary btn-block" type="submit">Continue</button>
            </form>

            {/* SSO placeholders */}
            <div className="row" aria-label="Single sign-on options">
              <button className="btn" type="button" onClick={async ()=>{
                try{
                  await signInGoogle();
                  navigate("/app", { replace:true });
                }catch(err){
                  alert("Google sign-in failed: " + (err?.message || err));
                }
              }}>Continue with Google</button>
              <button className="btn" type="button" aria-disabled="true">Continue with Apple</button>
            </div>

            {/* Keep existing sign-in logic available */}
            <div className="card" style={{ width: "100%", background: "transparent", boxShadow: "none" }}>
              <h3 style={{ marginBottom: 8 }}>Prefer an email link?</h3>
              <p className="lead" style={{ marginTop: 0 }}>Use a secure sign-in link or continue as guest.</p>
              <AuthGate />
            </div>

            <div className="row" style={{ justifyContent: "space-between", width: "100%" }}>
              <Link className="btn btn-quiet" to="/landing">Back to Home</Link>
              <Link className="btn btn-outline" to="/faq">Need help?</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
