import { HashRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage.jsx";
import Landing from "./pages/Landing.jsx";
import ChatApp from "./pages/ChatApp.jsx";
import Invite from "./pages/Invite.jsx";
import Admin from "./components/Admin.jsx";
import About from "./pages/About.jsx";
import Faq from "./pages/faq.jsx";

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Sign in FIRST */}
            <Route path="/" element={<SignInPage />} />

            {/* After sign-in, user lands here */}
            <Route path="/landing" element={<Landing />} />

            {/* Other pages */}
            <Route path="/app" element={<ChatApp />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </div>

        <footer className="footer" style={{ padding: "16px", textAlign: "center", opacity: 0.8 }}>
          <a href="#/about" style={{ margin: "0 12px" }}>About</a>
          <a href="#/faq" style={{ margin: "0 12px" }}>FAQ</a>
        </footer>
      </div>
    </HashRouter>
  );
}
