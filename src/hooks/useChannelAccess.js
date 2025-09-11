import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export function useChannelAccess(slug, nid = "main"){
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storageKey = `hive:access:${slug}`;
  const initial = typeof window !== "undefined" ? window.sessionStorage.getItem(storageKey) === "ok" : false;
  const [verified, setVerified] = useState(initial);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    (async () => {
      try{
        const ref = doc(db, "neighborhoods", nid, "channels", slug);
        const snap = await getDoc(ref);
        if (alive) setChannel(snap.exists() ? { id: slug, ...snap.data() } : null);
      }catch(e){
        if (alive) setError(e);
      }finally{
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug, nid]);

  function verify(input){
    if (!channel?.joinKey) return false;
    const ok = (input || "").trim() === channel.joinKey;
    if (ok) {
      try{ window.sessionStorage.setItem(storageKey, "ok"); }catch{}
      setVerified(true);
    }
    return ok;
  }

  return { channel, loading, verified, verify, error };
}

