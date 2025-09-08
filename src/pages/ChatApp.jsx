import AuthGate from "../components/AuthGate.jsx";
import ChatRoom from "../components/ChatRoom.jsx";

export default function ChatApp() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 16px", marginTop: 140 }}>
      <header className="card" style={{ padding: 16, marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Hive — App</h1>
        <p style={{ marginTop: 8 }}>Invite-only. Encrypted. Bee-themed 🐝</p>
      </header>

      <section className="card" style={{ padding: 16, marginTop: 16 }}>
        <ChatRoom channelId="general" />
      </section>
    </div>
  );
}
