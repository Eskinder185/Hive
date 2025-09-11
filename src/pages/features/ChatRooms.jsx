import FeatureShell from "./FeatureShell.jsx";
import { Link } from "react-router-dom";
import { DEFAULT_CHANNELS } from "../../data/channels.js";
import { ensureDefaultChannels } from "../../utils/seedChannels.js";
import { db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default function ChatRooms(){
  return (
    <FeatureShell
      title="Chat Rooms"
      lead="Rooms (channels) organize conversations by topic so your hive stays tidy and easy to follow."
      cta="Open App"
      ctaTo="/app"
    >
      <div className="grid">
        {DEFAULT_CHANNELS.map((c) => (
          <div key={c.slug} className="feature-card col-4">
            <Link to={`/app/${c.slug}`} aria-label={`Open #${c.slug}`}>
              <h3>{c.label}</h3>
              <p>{c.desc}</p>
            </Link>
            {import.meta?.env?.DEV && (
              <div style={{ marginTop: 8 }}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={async () => {
                    try {
                      await ensureDefaultChannels("main");
                      const r = await getDoc(doc(db, "neighborhoods", "main", "channels", c.slug));
                      const k = r.exists() ? (r.data().joinKey || "") : "";
                      if (k) {
                        await navigator.clipboard.writeText(k);
                        alert(`#${c.slug} key copied: ${k}`);
                      } else {
                        alert("No key found; try seeding channels first.");
                      }
                    } catch (e) {
                      alert(`Failed to copy key: ${e?.message || e}`);
                    }
                  }}
                >
                  Copy Key
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {import.meta?.env?.DEV && (
        <div style={{ marginTop: 16 }}>
          <button
            className="btn btn-outline"
            onClick={async () => {
              try {
                await ensureDefaultChannels("main");
                alert("Default channels ensured in Firestore (neighborhood: main).");
              } catch (e) {
                alert(`Failed to seed channels: ${e?.message || e}`);
              }
            }}
          >
            Setup Channels
          </button>
        </div>
      )}

      {/* Channel details */}
      <section className="stack" style={{ marginTop: 18 }}>
        <h2>Channel details</h2>
        <div className="grid">
          {DEFAULT_CHANNELS.map(c => (
            <div key={c.slug} className="feature-card col-6">
              <h3>#{c.slug} — {c.label}</h3>
              <p className="lead">{c.desc}</p>
              {Array.isArray(c.guidelines) && c.guidelines.length > 0 && (
                <ul style={{ marginTop: 8 }}>
                  {c.guidelines.slice(0,4).map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              )}
              <div className="row" style={{ marginTop: 8 }}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={async ()=>{
                    try{
                      const r = await getDoc(doc(db, "neighborhoods", "main", "channels", c.slug));
                      const k = r.exists() ? (r.data().joinKey || "") : "";
                      if (k){ await navigator.clipboard.writeText(k); alert(`#${c.slug} key copied: ${k}`);} else { alert("No key found yet. Try seeding channels."); }
                    }catch(e){ alert(`Copy failed: ${e?.message || e}`); }
                  }}
                >Copy Key</button>
                <Link className="btn btn-sm" to={`/app/${c.slug}`}>Open #{c.slug}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FeatureShell>
  );
}
