import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

export default function RedirectOnAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      const atApp = location.pathname === "/app";
      if (u && !atApp) navigate("/app", { replace: true });
      if (!u && atApp) navigate("/", { replace: true });
    });
    return unsub;
  }, [navigate, location.pathname]);

  return null;
}
