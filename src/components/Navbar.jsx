import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const here = (p) => pathname === p || `#${pathname}` === p || hash === p;
  const { user, signOutUser } = useAuth();

  return (
    <div className="nav">
      <div className="container">
        <div className="nav-inner spaced">
          <Link to="/landing" className="brand" aria-label="Hive home">
            <span className="logo-dot" aria-hidden>🐝</span>
            <b>Hive</b>
          </Link>

          <div className="row">
            {!user ? (
              <Link className="btn btn-sm btn-ghost" to="/">Sign In</Link>
            ) : (
              <button className="btn btn-sm btn-ghost" onClick={signOutUser}>Sign Out</button>
            )}
            <Link className="btn btn-sm btn-primary" to="/invite">Join with Invite</Link>
            <Link className="btn btn-sm btn-outline" to="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
