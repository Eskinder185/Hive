import { useState } from "react";

export default function Invite() {
  const [code, setCode] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (code === "12345") {
      alert("✅ Welcome! Code accepted.");
      // later you can redirect to /app or unlock features
    } else {
      alert("❌ Invalid invite code.");
    }
  }

  return (
    <main className="container" style={{ marginTop: 140 }}>
      <section className="card" style={{ padding: 24 }}>
        <h1>Join Hive with Invite Code</h1>
        <p>Enter the code given by your Queen Bee 🐝</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter invite code"
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #f6c453", flex: 1 }}
          />
          <button type="submit" className="btn">Join</button>
        </form>
      </section>
    </main>
  );
}
