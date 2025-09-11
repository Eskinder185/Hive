import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { db, auth } from "../firebase.js";
import { ensureDefaultChannels } from "../utils/seedChannels.js";
import { generateJoinKey } from "../utils/channelKeys.js";
import { collection, getDocs, updateDoc, doc, setDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";

export default function Admin(){
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState({ seed:false, regen:false, invite:false });
  const [notice, setNotice] = useState("");
  const nid = "main";

  useEffect(() => {
    const col = collection(db, "neighborhoods", nid, "channels");
    const qy = query(col, orderBy("label", "asc"));
    const unsub = onSnapshot(qy, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setChannels(rows);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function seed(){
    try{
      setBusy(b => ({...b, seed:true})); setNotice("Seeding default channels…");
      await ensureDefaultChannels(nid);
      setNotice("Default channels ensured.");
    }catch(e){
      setNotice("Seed failed: " + (e?.message || e));
    }finally{
      setBusy(b => ({...b, seed:false}));
    }
  }

  async function regenKeys(){
    try{
      setBusy(b => ({...b, regen:true})); setNotice("Regenerating keys…");
      const snap = await getDocs(collection(db, "neighborhoods", nid, "channels"));
      for (const d of snap.docs){
        const slug = d.id;
        await updateDoc(doc(db, "neighborhoods", nid, "channels", slug), {
          joinKey: generateJoinKey(slug),
          updatedAt: serverTimestamp(),
        });
      }
      setNotice("All join keys regenerated.");
    }catch(e){
      setNotice("Regenerate failed: " + (e?.message || e));
    }finally{
      setBusy(b => ({...b, regen:false}));
    }
  }

  async function createInvite(){
    try{
      setBusy(b => ({...b, invite:true})); setNotice("Creating invite…");
      const code = Math.random().toString(36).slice(2, 8).toUpperCase();
      const expiresAt = new Date(Date.now() + 7*24*3600*1000);
      const uid = auth.currentUser?.uid || "system";
      await setDoc(doc(db, "neighborhoods", nid, "invites", code), {
        code,
        createdAt: serverTimestamp(),
        createdBy: uid,
        uses: 0,
        maxUses: 1,
        expiresAt,
      });
      const url = `#/?invite=${code}`;
      try{ await navigator.clipboard.writeText(url); }catch{}
      setNotice(`Invite created and copied: ${url}`);
    }catch(e){
      setNotice("Invite failed: " + (e?.message || e));
    }finally{
      setBusy(b => ({...b, invite:false}));
    }
  }

  async function copyKey(k){
    try{ await navigator.clipboard.writeText(k); setNotice(`Copied ${k}`); }catch{}
  }

  async function regenOne(slug){
    try{
      setNotice(`Regenerating key for #${slug}…`);
      await updateDoc(doc(db, "neighborhoods", nid, "channels", slug), {
        joinKey: generateJoinKey(slug), updatedAt: serverTimestamp()
      });
      setNotice(`Key regenerated for #${slug}.`);
    }catch(e){ setNotice(`Failed to regenerate ${slug}: ` + (e?.message || e)); }
  }

  async function toggleRequire(slug, current){
    try{
      setNotice(`Updating requireKey for #${slug}…`);
      await updateDoc(doc(db, "neighborhoods", nid, "channels", slug), { requireKey: !current, updatedAt: serverTimestamp() });
      setNotice(`requireKey is now ${!current} for #${slug}.`);
    }catch(e){ setNotice(`Failed to update ${slug}: ` + (e?.message || e)); }
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{ marginTop: 12, position: "relative" }}>
        <section className="card stack">
          <h1>Admin Tools</h1>
          {notice && <div className="card" style={{ background: "#fff", padding: 12 }}>{notice}</div>}
          <div className="row">
            <button className="btn btn-primary" disabled={busy.seed} onClick={seed}>Seed Default Channels</button>
            <button className="btn btn-outline" disabled={busy.regen} onClick={regenKeys}>Regenerate All Join Keys</button>
            <button className="btn" disabled={busy.invite} onClick={createInvite}>Create Invite Code</button>
          </div>
        </section>

        <section className="stack" style={{ marginTop: 18 }}>
          <h2>Current Channels</h2>
          {loading ? (
            <div className="card">Loading…</div>
          ) : (
            <div className="grid">
              {channels.map(ch => (
                <div key={ch.id} className="feature-card col-4">
                  <h3>#{ch.id}</h3>
                  <p>{ch.label || ch.id}</p>
                  <div className="row" style={{ alignItems:"center" }}>
                    <code style={{ opacity: .8 }}>{ch.joinKey || '—'}</code>
                    {ch.joinKey && (
                      <button className="btn btn-sm btn-outline" onClick={()=>copyKey(ch.joinKey)}>Copy Key</button>
                    )}
                  </div>
                  <div className="row" style={{ marginTop: 8 }}>
                    <button className="btn btn-sm" onClick={()=>regenOne(ch.id)}>Regenerate Key</button>
                    <button className="btn btn-sm btn-outline" onClick={()=>toggleRequire(ch.id, !!ch.requireKey)}>
                      {ch.requireKey ? 'Disable Require Key' : 'Enable Require Key'}
                    </button>
                    <Link className="btn btn-sm btn-ghost" to={`/app/${ch.id}`}>Open Room</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
