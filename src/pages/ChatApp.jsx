import AuthGate from "../components/AuthGate.jsx";
import ChatRoom from "../components/ChatRoom.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useChannelAccess } from "../hooks/useChannelAccess.js";

export default function ChatApp() {
  const { channel } = useParams();
  const [sp] = useSearchParams();
  const fallback = sp.get("channel") || "general";
  const current = channel || fallback || "general";
  const { channel: meta, loading, verified, verify } = useChannelAccess(current, "main");
  const needsAccess = !!meta?.requireKey;

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 16px", marginTop: 140 }}>
      <header className="card" style={{ padding: 16, marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Hive — App</h1>
        <p style={{ marginTop: 8 }}>Invite-only. Encrypted.</p>
      </header>

      <section className="card" style={{ padding: 16, marginTop: 16 }}>
        {loading ? (
          <div>Loading channel…</div>
        ) : needsAccess && !verified ? (
          <AccessGate slug={current} onVerify={verify} />
        ) : (
          <ChatRoom channelId={current} />
        )}
      </section>
    </div>
  );
}

function AccessGate({ slug, onVerify }){
  const [v, setV] = React.useState("");
  return (
    <div>
      <h2 style={{marginTop:0}}>#{slug}</h2>
      <div className="card" style={{padding:12}}>
        <strong>Room access required</strong>
        <p className="lead" style={{marginTop:6}}>Enter the room’s access key to continue.</p>
        <div className="row" style={{alignItems:"stretch"}}>
          <input className="input" placeholder="e.g. saf-123456" value={v} onChange={(e)=>setV(e.target.value)} />
          <button className="btn btn-primary" onClick={()=>{
            if(!onVerify(v)) alert("Incorrect key. Check with a moderator.");
          }}>Verify</button>
        </div>
      </div>
    </div>
  );
}
