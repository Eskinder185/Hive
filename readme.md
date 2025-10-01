# 🐝 Hive — Private Neighborhood Chat

![Built with](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Backend](https://img.shields.io/badge/Backend-Firebase%20(Auth%2FFirestore%2FFunctions)-ffca28)
![AI Safety](https://img.shields.io/badge/AI-Gemini%20Moderation-8a2be2)
![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

**Hive** is a secure, invite-only neighborhood chat. Members join with an invite code, chat in rooms or 1-on-1, and stay safe with **Gemini-assisted** content moderation and strict **RBAC**.

> 🔐 **Privacy first:** Auth via Firebase Email Link Sign-In; routes gated behind Auth.  
> 🧠 **Safety:** Gemini helps flag unsafe content for **Soldiers** (mods) and **Queen Bee** (admin).

[🌐 Live Demo](#) · [🔧 Setup](#-setup) · [🚀 Deploy](#-deploy) · [🛡️ Security](#-security) · [❓FAQ](#-faq)

---

## 🚀 Features

- **Invite-Only Access:** Join requires a valid **invite code** (scoped by neighborhood).
- **RBAC (Bee Roles):**
  - **Queen Bee** → Admin (first user; manages roles & invites)
  - **Soldier Bees** → Moderators / safety officers
  - **Worker Bees** → Regular neighbors
- **Chat Rooms:** neighborhood / safety alerts / events / help channels.
- **Direct Messages:** secure Worker ↔ Soldier/Admin threads.
- **AI Safety (optional):** **Gemini** moderation (toxicity, threats, doxxing signals).
- **Deployed on GitHub Pages:** Vite SPA → gh-pages.
- **Honeycomb UI:** themed CSS for trust + clarity (light/dark ready).

---

## 🧩 Tech Stack

- **Frontend:** React + Vite, React Router, Tailwind (optional)
- **Backend:** Firebase **Auth** (email link), **Firestore**, **Cloud Functions**
- **AI Safety:** Google **Gemini** API (server-side mod endpoint)
- **Deploy:** GitHub Pages (gh-pages branch or Actions)
