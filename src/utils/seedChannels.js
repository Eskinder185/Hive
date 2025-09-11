import { db } from "../firebase.js";
import { DEFAULT_CHANNELS } from "../data/channels.js";
import { generateJoinKey } from "./channelKeys.js";
import {
  doc, getDoc, setDoc, collection, addDoc, serverTimestamp
} from "firebase/firestore";

/**
 * Ensure default channels exist under /neighborhoods/{nid}/channels
 * Adds two pinned messages for each channel on first creation.
 */
export async function ensureDefaultChannels(nid = "main") {
  const base = (slug) => ({
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  for (const ch of DEFAULT_CHANNELS) {
    const cref = doc(db, "neighborhoods", nid, "channels", ch.slug);
    const snap = await getDoc(cref);
    if (!snap.exists()) {
      await setDoc(cref, { ...base(ch.slug), label: ch.label, desc: ch.desc, requireKey: !!ch.requireKey, joinKey: generateJoinKey(ch.slug) });

      const mcol = collection(cref, "messages");
      await addDoc(mcol, {
        pinned: true,
        system: true,
        text: `Welcome to #${ch.slug}! ${ch.desc}`,
        createdAt: serverTimestamp(),
      });
      await addDoc(mcol, {
        pinned: true,
        system: true,
        text: "Guidelines: Be kind. Stay on topic. No personal info without consent.",
        createdAt: serverTimestamp(),
      });
    } else {
      const data = snap.data() || {};
      if (!data.joinKey) {
        await setDoc(cref, { joinKey: generateJoinKey(ch.slug), updatedAt: serverTimestamp() }, { merge: true });
      }
    }
  }
}
