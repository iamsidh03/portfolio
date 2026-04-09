<div align="center">

# Full-Stack AI Portfolio

### A portfolio that doesn't just show your work — it talks about it.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-10b981?style=for-the-badge\&logo=vercel\&logoColor=white)](https://portfolio-rust-seven-57j41rsy8w.vercel.app/)




</div>

---

## What Is This?

This is not a static portfolio. It's a **production-grade full-stack platform** built with real backend services, live data APIs, and an AI assistant that answers questions about me in real time.

Instead of scrolling through a page, visitors can ask **Jiya** — my personal AI assistant — anything about my skills, projects, or experience and get accurate, context-aware answers instantly.

> Built with React · Node.js · Express · Gemini AI · Resend · Vercel · Render

---

## Features

| Feature                   | Description                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Jiya AI Assistant**     | RAG-style AI bot embedded in the nav. Answers questions about me using live GitHub + LeetCode data as context |
| **Live LeetCode Stats**   | Real-time problem counts, contest rating history chart, and global ranking pulled from LeetCode's GraphQL API |
| **Working Contact Form**  | Form submissions trigger real emails via the Resend API — no SMTP, no timeouts                                |
| **Bento Grid Design**     | Dark, professional UI with emerald accents, scroll-reveal animations, and per-section design consistency      |
| **Fully Responsive**      | Designed mobile-first. Works across all screen sizes                                                          |
| **Performance Optimised** | 10-minute server-side caching on LeetCode data. Parallel API fetching in the AI bot                           |

---

## System Architecture

```
Browser
   │
   ├──▶ Frontend (React + Vite) ── Vercel
   │         │
   │         ├──▶ Contact Backend (Node + Express) ── Render
   │         │              └──▶ Resend Email API
   │         │
   │         ├──▶ LeetCode Backend (Node + Express) ── Render
   │         │              └──▶ LeetCode GraphQL API
   │         │
   │         └──▶ AI Bot Backend (Node + Express) ── Render
   │                        ├──▶ GitHub REST API
   │                        ├──▶ LeetCode GraphQL API
   │                        └──▶ Google Gemini API
```

Three independent backends, each with a **single responsibility**. When one service fails, the others keep working.

---

## How the AI Bot Works

Jiya is not just a wrapper around an AI model. Here's the actual pipeline:

```
User Message
     │
     ▼
AI Bot Backend receives query
     │
     ├── [Parallel] Fetch GitHub repos & activity
     ├── [Parallel] Fetch LeetCode stats
     └── [Parallel] Load static profile data
     │
     ▼
Prompt Builder injects all context
(profile + projects + stats + timeline)
     │
     ▼
Structured prompt sent to Gemini API
     │
     ▼
Response streamed back to frontend
```

This is a **RAG-style (Retrieval Augmented Generation)** approach. The AI doesn't guess — it has accurate, structured data injected before every query. That's why Jiya gives specific, correct answers instead of hallucinating.

---

## Repository Structure

```
portfolio/
│
├── frontend/                        # React + Vite application
│   ├── src/
│   │   ├── assets/                  # Images, profile photo
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── Button.jsx
│   │   │   ├── Nav.jsx              # Floating nav + Jiya trigger
│   │   │   ├── ChatBot.jsx          # Jiya AI chat panel
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Work.jsx
│   │   │   ├── LeetCode.jsx
│   │   │   └── Contact.jsx
│   │   ├── styles/                  # Per-section CSS files
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── contact-backend/                 # Email service
│   ├── src/
│   │   ├── controllers/
│   │   │   └── contact.controller.js
│   │   ├── routes/
│   │   │   └── contact.routes.js
│   │   └── index.js
│   ├── env.js
│   └── package.json
│
├── leetcode-backend/                # LeetCode stats service
│   ├── server.js
│   ├── leetcode.service.js
│   ├── cache.js
│   └── package.json
│
└── README.md
```

---

## Tech Stack

### Frontend

* **React** + **Vite** — UI framework and build tool
* **Tailwind CSS** — Utility-first styling
* **Custom CSS** — Per-section bento grid layouts and animations
* **ReactMarkdown** + **remark-gfm** — AI response rendering
* **Lucide React** — Icon library

### Backend (Contact Service)

* **Node.js** + **Express 5** — Server framework
* **Resend** — Production email delivery API
* **dotenv** + **ES Modules** — Environment and module system

### Backend (LeetCode Service)

* **Node.js** + **Express** — Server framework
* **Axios** — HTTP client for GraphQL requests
* **In-memory cache** — 10-minute TTL to avoid rate limits

### AI Bot Backend

* **Node.js** + **Express** — Server framework
* **Google Gemini API** — Language model
* **GitHub REST API** — Repo and activity data
* **LeetCode GraphQL API** — Real-time coding stats
* **Custom prompt builder** — RAG-style context injection

### Deployment

* **Vercel** — Frontend hosting with auto-deploy on push
* **Render** — Backend hosting (3 independent services)

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* A Resend account and API key
* A Google Gemini API key
* A GitHub personal access token

---

### 1. Clone the Repository

```bash
git clone https://github.com/iamsidh03/portfolio.git
cd portfolio
```

---

### 2. Contact Backend

```bash
cd contact-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
CONTACT_EMAIL=your-email@gmail.com
RESEND_API_KEY=re_your_key_here
```

```bash
npm run dev
# Runs on http://localhost:5000
```

---

### 3. LeetCode Backend

```bash
cd leetcode-backend
npm install
```

Create a `.env` file:

```env
PORT=5001
```

```bash
npm run dev
# Runs on http://localhost:5001
```

---

### 4. Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_CONTACT_API=http://localhost:5000
VITE_LEETCODE_API=http://localhost:5001
VITE_AI_API=http://localhost:5002
```

```bash
npm run dev
# Runs on http://localhost:5173
```

---

## Deployment

### Frontend → Vercel

1. Push the `frontend/` folder to GitHub
2. Import the repo in Vercel
3. Set the root directory to `frontend`
4. Add environment variables in the Vercel dashboard

```
VITE_CONTACT_API=https://your-contact-backend.onrender.com
VITE_LEETCODE_API=https://your-leetcode-backend.onrender.com
VITE_AI_API=https://your-ai-backend.onrender.com
```

### Backends → Render

1. Create a new **Web Service** on Render for each backend
2. Connect your GitHub repo
3. Set the root directory to the specific backend folder
4. Add environment variables in the Render dashboard
5. Set the start command:

   * Contact backend: `node src/index.js`
   * LeetCode backend: `node server.js`

> **Never commit `.env` files.** Always use platform dashboards for production secrets.

---

## API Reference

### Contact Backend

```
POST /api/send-email
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hey Siddharth, let's connect!"
}
```

**Response:**

```json
{ "success": true }
```

---

### LeetCode Backend

```
GET /api/user/:username
```

**Response:**

```json
{
  "user": "siddharthraj3101",
  "avatar": "https://...",
  "ranking": 45231,
  "solved": { "easy": 157, "medium": 89, "hard": 23, "all": 269 },
  "total": { "easy": 800, "medium": 1700, "hard": 750, "all": 3250 },
  "contest": {
    "rating": 1487,
    "globalRank": 82341,
    "attended": 12,
    "history": [...]
  }
}
```

---

## Security

* All sensitive keys are stored in environment variables — never in code
* CORS is strictly configured to only allow trusted origins
* `.env` is in `.gitignore` and should never be committed
* API keys are rotated if accidentally exposed

```javascript
// CORS config example
cors({
  origin: [
    "http://localhost:5173",
    "https://your-portfolio.vercel.app"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
})
```

---

## Performance

| Optimisation           | Detail                                                            |
| ---------------------- | ----------------------------------------------------------------- |
| LeetCode caching       | 10-minute in-memory TTL prevents rate limiting                    |
| Parallel API fetching  | GitHub + LeetCode + profile data fetched simultaneously in AI bot |
| Scroll-based animation | IntersectionObserver used instead of scroll listeners             |
| Vite build             | Tree-shaking and code splitting for minimal bundle size           |

---

## Known Challenges Solved

| Challenge                               | Solution                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------ |
| CORS blocked browser requests           | Explicitly whitelisted Vercel domain in backend CORS config              |
| Gmail SMTP timing out on Render         | Switched entirely to Resend API-based email                              |
| Vercel build failing (case sensitivity) | Matched file names exactly — Linux is case-sensitive, Windows is not     |
| AI giving inaccurate answers            | Built RAG-style prompt builder that injects real data before every query |
| `.env` accidentally committed           | Deleted file, rotated all keys, moved secrets to platform dashboards     |
| Resend API key not loading              | Ensured `dotenv.config()` runs before any imports in ES module context   |
| Express wildcard OPTIONS crash          | Removed wildcard OPTIONS route, let CORS middleware handle preflight     |

---

## Screenshots

| Section  | Preview                                                 |
| -------- | ------------------------------------------------------- |
| Hero     | Mouse-tracking orbs, rotating image ring, stat strip    |
| About    | Bento grid with live tiles, IntersectionObserver reveal |
| Work     | Split-panel cards with per-project accent colors        |
| LeetCode | Live SVG ring chart + contest rating history graph      |
| Contact  | Split layout with working email form                    |
| Jiya AI  | Chat panel in nav with RAG-powered responses            |

---

## Roadmap

* [ ] Streaming AI responses (token by token)
* [ ] GitHub contribution graph integration
* [ ] Blog section with MDX support
* [ ] Dark/light theme toggle
* [ ] Project detail pages with full case studies
* [ ] Jiya voice mode

---

## Author

**Siddharth Raj**

* Twitter/X: [@iamsidh03](https://x.com/iamsidh03)
* LinkedIn: [iamsidh03](https://www.linkedin.com/in/iamsidh03/)
* GitHub: [@iamsidh03](https://github.com/iamsidh03)
* Email: [Siddharthraj4689@gmail.com](mailto:Siddharthraj4689@gmail.com)

---

## License

This project is open source and available under the MIT License.

---

<div align="center">

**If this project helped you or inspired you — drop a star on GitHub. It means a lot.**

Made with and way too many CORS errors by [Siddharth](https://github.com/iamsidh03)

</div>
