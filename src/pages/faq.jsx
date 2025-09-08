export default function Faq() {
  return (
    <main className="container" style={{ marginTop: 140 }}>
      <section className="card" style={{ padding: 24 }}>
        <h1>FAQ ❓</h1>

        <h3>How do I join?</h3>
        <p>Ask your neighborhood’s Queen Bee for an invite code.</p>

        <h3>Is Hive free?</h3>
        <p>Yes! Hive is hosted free with GitHub Pages + Firebase.</p>

        <h3>Are my messages private?</h3>
        <p>
          Yes. Hive uses end-to-end encryption. Only people with the channel key can read the messages.
        </p>

        <h3>What roles are there?</h3>
        <p>
          👑 Queen Bee (admin), 🛡 Soldier Bee (moderator), 🐝 Worker Bee (neighbor).
        </p>
      </section>
    </main>
  );
}
