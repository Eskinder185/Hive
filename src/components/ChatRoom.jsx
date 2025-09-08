import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase.js";
import {
  addDoc, collection, onSnapshot, orderBy, query, serverTimestamp
} from "firebase/firestore";
import { encryptJSON, decryptJSON } from "../e2ee.js";
import { useChannelKey } from "../hooks/usechannelkey.js";

export default function ChatRoom({ channelId = "general" }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);

  const { key, hasKey, setPassphrase } = useChannelKey(channelId);

  // Subscribe to Firestore
  useEffect(() => {
    const col = collection(db, "channels", channelId, "messages");
    const q = query(col, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, async (snap) => {
      const arr = [];
      for (const doc of snap.docs) {
        const data = doc.data();
        if (key && data.ciphertext && data.iv) {
          try {
            const obj = await decryptJSON(key, data.ciphertext, data.iv);
            arr.push({ id: doc.id, ...obj, uid: data.uid });
          } catch {
            arr.push({ id: doc.id, text: "🔐 Encrypted (wrong key?)", uid: data.uid });
          }
        } else {
          arr.push({ id: doc.id, text: "🔐 Encrypted", uid: data.uid });
        }
      }
      setMessages(arr);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return unsub;
  }, [channelId, key]);

  async function send() {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in first.");
    if (!key) return alert("Set the channel key first.");
    if (!draft.trim()) return;

    const payload = { text: draft.trim(), ts: Date.now() };
    const { ciphertext, iv } = await encryptJSON(key, payload);

    const col = collection(db, "channels", channelId, "messages");
    await addDoc(col, {
      ciphertext,
      iv,
      uid: user.uid,
      createdAt: serverTimestamp()
    });

    setDraft("");
  }

  return (
    <div>
      <h2 style={{marginTop:0}}>#{channelId}</h2>

      {!hasKey || !key ? (
        <KeySetter onSet={setPassphrase} />
      ) : (
        <>
          <div style={msgListStyle}>
            {messages.map(m => (
              <div key={m.id} style={msgStyle(m.uid === auth.currentUser?.uid)}>
                <div style={{opacity:.6, fontSize:12}}>
                  {m.uid === auth.currentUser?.uid ? "You" : m.uid.slice(0,6)+"…"}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div style={{display:"flex", gap:8, marginTop:12}}>
            <input
              style={inputStyle}
              placeholder="Write an encrypted message…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <button onClick={send} style={btnStyle}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

function KeySetter({ onSet }) {
  const [pass, setPass] = useState("");
  return (
    <div className="card" style={{padding:12, marginBottom:12}}>
      <strong>Channel key required</strong>
      <p style={{margin:"6px 0 10px"}}>Only neighbors who know this key can read the messages.</p>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        <input
          type="password"
          placeholder="Enter shared channel passphrase"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={inputStyle}
        />
        <button style={btnStyle} onClick={() => onSet(pass)}>Unlock</button>
      </div>
    </div>
  );
}

const msgListStyle = { display:"flex", flexDirection:"column", gap:8, maxHeight:360, overflowY:"auto" };
const msgStyle = (mine) => ({
  alignSelf: mine ? "flex-end" : "flex-start",
  background: mine ? "#fff7d6" : "#ffffffb3",
  border:"1px solid rgba(246,196,83,.35)",
  padding:"8px 10px", borderRadius:12, maxWidth: "80%"
});
const btnStyle = { padding:"6px 10px", borderRadius:8, border:"1px solid #f6c453", background:"#fff8e1", cursor:"pointer" };
const inputStyle = { padding:"8px 10px", borderRadius:8, border:"1px solid #f6c453", flex:1, minWidth:260 };
