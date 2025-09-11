import Navbar from "../components/Navbar.jsx";

export default function Faq() {
  const items = [
    [
      "How do I join?",
      "Ask your neighborhood’s Queen Bee (admin) for an invite code."
    ],
    [
      "Is Hive free?",
      "Yes. Hive can be hosted free with static hosting and Firebase."
    ],
    [
      "Are my messages private?",
      "Yes. Hive supports end‑to‑end encryption. Only people with the channel key can read messages."
    ],
    [
      "What roles are there?",
      "Queens (admins), Soldiers (moderators), and Workers (neighbors)."
    ],
    [
      "What if I lose my invite?",
      "Contact your Queen Bee to request a new code."
    ],
    [
      "How do I report an issue?",
      "Open the Safety Center in the app or contact an admin."
    ]
  ];

  return (
    <>
      <Navbar />
      <main className="container" style={{ marginTop: 12 }}>
        <section className="stack">
          <h1>FAQ</h1>
          <div className="accordion">
            {items.map(([q,a]) => (
              <details key={q} className="ac-item">
                <summary className="ac-summary">{q}</summary>
                <div className="ac-content">{a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

