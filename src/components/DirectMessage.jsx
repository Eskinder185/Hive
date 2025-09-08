import { useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc
} from "firebase/firestore";

export default function DirectMessage({ targetUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const me = auth.currentUser;

  // generate a consistent thread ID
  const threadId = [me.uid, targetUser.id].sort().join("_");

  useEffect(() => {
    const q = query(
      collection(db, "messages", threadId, "messages"),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [threadId]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await addDoc(collection(db, "messages", threadId, "messages"), {
      from: me.uid,
      to: targetUser.id,
      text,
      createdAt: serverTimestamp()
    });
    setText("");
  }

  return (
    <div className="card" style={{ padding: 16, marginTop: 16 }}>
      <h2>Chat with {targetUser.email || "anon"}</h2>
      <div style={{ maxHeight: 300, overflowY: "auto", marginBottom: 12 }}>
        {messages.map(m => (
          <p key={m.id} style={{ textAlign: m.from === me.uid ? "right" : "left" }}>
            <strong>{m.from === me.uid ? "You" : targetUser.email}:</strong> {m.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, padding: "8px", border: "1px solid #ccc" }}
        />
        <button type="submit" className="btn">Send</button>
      </form>
    </div>
  );
}
