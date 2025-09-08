import AuthGate from "../components/AuthGate.jsx";
import { useEffect } from "react";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../signin.css";  // 👈 special background only for sign-in

export default function SignInPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        navigate("/landing", { replace: true });
      }
    });
    return () => unsub();
  }, [navigate]);

  return (
    <div>
      {/* Honeycomb security background */}
      <div className="honeycomb-bg"></div>
      <div className="honey-shine"></div>
      <div className="bee">🐝</div>
      <div className="bee">🐝</div>
      <div className="bee">🐝</div>

      <div className="signin-card">
        <h1>Hive Secure Sign-In</h1>
        <p>Welcome to your neighborhood’s private hive. Please sign in to continue.</p>
        <AuthGate />
      </div>
    </div>
  );
}
