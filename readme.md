🐝 Hive — Private Neighborhood Chat

Hive is a secure, invite-only chat app designed for neighborhoods.
It combines Firebase for authentication and data storage, Gemini AI for moderation and safety, and built-in security measures to protect private conversations.

🚀 Features

🔐 Private, Invite-Only Access — only neighbors with an invite code can join.

👑 Role System —

Queen Bee → Admin (first user, manages roles & invites)

Soldier Bees → Moderators / security officers

Worker Bees → Regular neighbors

💬 Chat Rooms — neighborhood, safety alerts, events, and help channels.

📩 1-on-1 Messaging — workers can securely message Soldiers or Admin.

🌐 Deployed on GitHub Pages with Vite + React.

🛠 Tech Stack

Frontend: React + Vite (modern SPA framework)

Backend: Firebase (Auth, Firestore, Functions)

Deployment: GitHub Pages (gh-pages branch auto-deploy)

AI Safety: Gemini AI (for message moderation & neighborhood content safety)

🔑 Security Measures

Hive is built with security first:

Authentication — Firebase Email Link Sign-In + optional anonymous guest access.

Role-Based Access Control (RBAC) — Admins (Queen Bees) manage Soldiers/Workers via Firestore.

Data Protection —

Firestore stores only ciphertext (no plain text messages).

No passwords stored (passwordless email links).

AI Moderation — Gemini AI assists in:

Detecting inappropriate/unsafe content.

Flagging suspicious behavior to Soldiers/Admins.

Frontend Protections —

Restricted routes (can’t access /app without signing in).

Honeycomb security-themed UI to reinforce trust.

📂 Project Structure
/src
  /components   → AuthGate, ChatRoom, Admin panel
  /pages        → SignInPage, Landing, Invite, About, FAQ
  firebase.js   → Firebase config
  honey.css     → Hive theme background
  signin.css    → Secure login background

🔧 Development

Clone the repo:

git clone https://github.com/Eskinder185/Hive.git
cd Hive
npm install





Build & deploy to GitHub Pages:

npm run deploy

🌟 Roadmap

✅ Sign-in system (email links & anonymous guests)

✅ Role management (Admin assigns Soldiers & Workers)

🚧 AI moderation integration with Gemini API

🚧 Encrypted DMs between Soldiers/Admins & Workers

🚧 Mobile-friendly PWA support

📜 License

MIT License © 2025 — Built with ❤️ for neighborhoods.
