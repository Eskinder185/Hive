// src/hooks/usechannelkey.js
import { useEffect, useState } from "react";
import { deriveKey, generateSaltB64 } from "../e2ee.js";

const PREFIX = "hive:chan:";

export function useChannelKey(channelId) {
  const [key, setKey] = useState(null);
  const [saltB64, setSaltB64] = useState(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    // salt
    const saltKey = `${PREFIX}${channelId}:salt`;
    let s = sessionStorage.getItem(saltKey);
    if (!s) {
      s = generateSaltB64();
      sessionStorage.setItem(saltKey, s);
    }
    setSaltB64(s);

    // reactive hasKey (read once per channel change)
    setHasKey(sessionStorage.getItem(`${PREFIX}${channelId}:hasKey`) === "1");
  }, [channelId]);

  async function setPassphrase(pass) {
    if (!saltB64 || !pass) return;
    const k = await deriveKey(pass, saltB64);
    setKey(k);
    setHasKey(true);
    sessionStorage.setItem(`${PREFIX}${channelId}:hasKey`, "1");
  }

  function lock() {
    setKey(null);
    setHasKey(false);
    sessionStorage.removeItem(`${PREFIX}${channelId}:hasKey`);
  }

  return { key, hasKey, setPassphrase, saltB64, lock };
}
