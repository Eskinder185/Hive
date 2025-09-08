import { useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged,
  signOut,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInAnonymously,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthGate() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);

        // check Firestore for user doc
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(ref, {
            email: u.email || null,
            role: "worker",           // default role
            createdAt: serverTimestamp(),
            area: ""                  // optional field
          });
        }
      } else {
        setUser(null);
      }
    });

    // handle sign-in via email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const stored = window.localStorage.getItem("hive:emailForSignIn") || "";
      const promptEmail = stored || window.prompt("Confirm your email for Hive sign-in");
      if (promptEmail) {
        signInWithEmailLink(auth, promptEmail, window.location.href)
          .then(() => window.localStorage.removeItem("hive:emailForSignIn"))
          .catch((e) => alert("Email link sign-in failed: " + e.message));
      }
    }

    return unsub;
  }, []);

  async function startEmailLink() {
    if (!email) return alert("Enter your email first.");
    try {
      const actionCodeSettings = { url: window.location.href, handleCodeInApp: true };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("hive:emailForSignIn", email);
      alert("Sign-in link sent! Check your email.");
    } catch (e) {
      alert("Could not send email link: " + e.message);
    }
  }

  async function anon() {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      alert("Anonymous sign-in failed: " + e.message);
    }
  }

  return (
    <div>
      {user ? (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <strong>Signed in:</strong>
          <code>{user.email || `anon:${user.uid.slice(0, 6)}…`}</code>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <button onClick={startEmailLink} style={btnStyle}>Email link sign-in</button>
          <span style={{ opacity: 0.6 }}>or</span>
          <button onClick={anon} style={btnStyle}>Continue as guest</button>
        </div>
      )}
    </div>
  );
}

const btnStyle = { padding: "6px 10px", borderRadius: 8, border: "1px solid #f6c453", background: "#fff8e1", cursor: "pointer" };
const inputStyle = { padding: "6px 10px", borderRadius: 8, border: "1px solid #f6c453", background: "#fff", minWidth: 260 };
