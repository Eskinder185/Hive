import { HashRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage.jsx";
import Landing from "./pages/Landing.jsx";
import ChatApp from "./pages/ChatApp.jsx";
import Invite from "./pages/Invite.jsx";
import Admin from "./pages/Admin.jsx";
import About from "./pages/About.jsx";
import Faq from "./pages/faq.jsx";
import ChatRooms from "./pages/features/ChatRooms.jsx";
import DMs from "./pages/features/DMs.jsx";
import InviteInfo from "./pages/features/InviteInfo.jsx";
import Neighbors from "./pages/features/Neighbors.jsx";
import Events from "./pages/features/Events.jsx";
import LostFound from "./pages/features/LostFound.jsx";
import Marketplace from "./pages/features/Marketplace.jsx";
import RequestsHelp from "./pages/features/RequestsHelp.jsx";
import SafetyCenter from "./pages/features/SafetyCenter.jsx";
import SettingsInfo from "./pages/features/SettingsInfo.jsx";

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
            <Route path="/app/:channel" element={<ChatApp />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />

            {/* Feature marketing pages */}
            <Route path="/features/chat-rooms" element={<ChatRooms />} />
            <Route path="/features/dms" element={<DMs />} />
            <Route path="/features/join" element={<InviteInfo />} />
            <Route path="/features/neighbors" element={<Neighbors />} />
            <Route path="/features/events" element={<Events />} />
            <Route path="/features/lost-found" element={<LostFound />} />
            <Route path="/features/marketplace" element={<Marketplace />} />
            <Route path="/features/requests" element={<RequestsHelp />} />
            <Route path="/features/safety" element={<SafetyCenter />} />
            <Route path="/features/settings" element={<SettingsInfo />} />
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
