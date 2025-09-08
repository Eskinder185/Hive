import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default function Admin() {
  const [users, setUsers] = useState([]);

  // Load all users
  useEffect(() => {
    async function loadUsers() {
      try {
        const snap = await getDocs(collection(db, "users"));
        setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error loading users:", err);
      }
    }
    loadUsers();
  }, []);

  // Change role
  async function setRole(userId, role) {
    const ref = doc(db, "users", userId);
    await updateDoc(ref, { role });
    setUsers(users.map(u => (u.id === userId ? { ...u, role } : u)));
  }

  // Remove user (ban/kick)
  async function removeUser(userId) {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter(u => u.id !== userId));
  }

  return (
    <main className="container" style={{ marginTop: 140 }}>
      <section className="card" style={{ padding: 24 }}>
        <h1>Admin Panel 👑</h1>
        <p>Manage your neighborhood hive — assign roles, promote Soldiers, and keep things safe.</p>

        {users.length === 0 ? (
          <p>No users found. Try signing in first.</p>
        ) : (
          <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Role</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ padding: "8px" }}>{user.email || "(anon)"}</td>
                  <td style={{ padding: "8px" }}>{user.role}</td>
                  <td style={{ padding: "8px", display: "flex", gap: "8px" }}>
                    <button className="btn" onClick={() => setRole(user.id, "soldier")}>Make Soldier 🛡</button>
                    <button className="btn" onClick={() => setRole(user.id, "worker")}>Make Worker 🐝</button>
                    <button className="btn btn-outline" onClick={() => removeUser(user.id)}>Remove ❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
