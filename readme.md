# Project Documentation

**Full-Stack Portfolio Platform**

---

## 1. Introduction

This document provides a **complete technical and functional documentation** of the Portfolio project.
It explains:

* What the project does
* How the system is designed
* How different parts communicate
* How to run, deploy, and maintain the project
* Why certain architectural decisions were made

The project is designed and implemented as a **production-ready full-stack application**, not a demo or static site.

---

## 2. Project Purpose

The goal of this project is to create a **professional developer portfolio platform** that:

1. Showcases personal and technical information
2. Displays live coding statistics from LeetCode
3. Allows visitors to contact the owner via email
4. Uses real backend services and real deployments
5. Follows industry-standard practices

---

## 3. System Overview

The project is composed of **three independent applications**:

1. **Frontend (React)**
2. **Contact Backend (Email Service)**
3. **LeetCode Backend (Stats API)**

These are deployed independently and communicate over HTTP.

---

## 4. High-Level Architecture

```
Browser
   |
   |---> Frontend (Vercel)
            |
            |---> Contact Backend (Render)
            |        |
            |        ---> Resend Email API
            |
            |---> LeetCode Backend (Render)
                     |
                     ---> LeetCode Data Source
```

This design follows a **service-oriented architecture**.

---

## 5. Why Two Backends?

Using two backends is **intentional and professional**.

### Reasons:

* Each backend has a **single responsibility**
* Failures are isolated
* Easier scaling
* Easier debugging
* Mirrors real production systems

| Backend          | Responsibility           |
| ---------------- | ------------------------ |
| Contact Backend  | Email delivery           |
| LeetCode Backend | Coding stats & analytics |

---

## 6. Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS / Utility-first styling
* Hosted on Vercel

### Backend

* Node.js
* Express.js
* ES Modules
* REST APIs
* Hosted on Render

### Email Service

* Resend API

---

## 7. Repository Structure

```
portfolio/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── contact-backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── contact.controller.js
│   │   ├── routes/
│   │   │   └── contact.routes.js
│   │   └── index.js
│   ├── package.json
│
├── leetcode-backend/
│   ├── src/
│   ├── package.json
│
└── README.md
```

Each folder is a **standalone application**.

---

## 8. Frontend Documentation

### Responsibilities

* UI rendering
* Form handling
* API communication
* Error handling
* User experience

### Key Features

* Portfolio sections
* Live LeetCode stats visualization
* Contact form
* Responsive design

### Environment Variables

```
VITE_CONTACT_API=https://portfolio-contact.onrender.com
VITE_LEETCODE_API=https://portfolio-leetcode.onrender.com
```

These are injected at build time by Vercel.

---

## 9. Contact Backend Documentation

### Purpose

Handles all contact form submissions and email delivery.

### Endpoint

```
POST /api/send-email
```

### Request Body

```json
{
  "name": "User Name",
  "email": "user@email.com",
  "message": "Message content"
}
```

### Response

```json
{
  "success": true
}
```

---

## 10. Email System (Resend)

### Why Resend?

* SMTP (Gmail) is unreliable in cloud environments
* Resend is designed for transactional emails
* Better deliverability and logging
* Production-grade service

### Email Flow

1. Frontend sends POST request
2. Backend validates input
3. Backend sends email using Resend API
4. Email appears in Resend dashboard and inbox

### Sender Address

```
Portfolio Contact <onboarding@resend.dev>
```

This is expected unless a custom domain is configured.

---

## 11. LeetCode Backend Documentation

### Purpose

Fetches, processes, and serves LeetCode statistics.

### Responsibilities

* Abstract LeetCode data fetching
* Normalize response
* Protect frontend from changes in data source

### Benefits

* Cleaner frontend
* Centralized data logic
* Easier future expansion

---

## 12. Environment Variables (Security)

Sensitive values are **never committed** to GitHub.

### Contact Backend `.env`

```
PORT=5000
CONTACT_EMAIL=example@gmail.com
RESEND_API_KEY=your_key_here
```

### Hosting Platform

* Variables are configured in Render dashboard
* Frontend variables configured in Vercel dashboard

---

## 13. CORS Configuration

CORS is strictly configured to allow only trusted origins.

Example:

```js
cors({
  origin: [
    "http://localhost:5173",
    "https://portfolio.vercel.app"
  ],
  methods: ["GET", "POST", "OPTIONS"]
});
```

This prevents unauthorized access.

---

## 14. Local Development Guide

### Step 1: Clone Repository

```
git clone https://github.com/iamsidh03/portfolio.git
cd portfolio
```

### Step 2: Contact Backend

```
cd contact-backend
npm install
npm run dev
```

### Step 3: LeetCode Backend

```
cd leetcode-backend
npm install
npm run dev
```

### Step 4: Frontend

```
cd frontend
npm install
npm run dev
```

---

## 15. Deployment Strategy

### Frontend

* Hosted on Vercel
* Auto-deploy on GitHub push

### Backends

* Hosted on Render
* Independent services
* Auto-deploy on GitHub push

---

## 16. Error Handling Strategy

* Input validation on backend
* Proper HTTP status codes
* Frontend user feedback
* Server logs for debugging

---

## 17. Known Production Challenges Solved

* CORS errors
* Environment variable misconfiguration
* SMTP timeouts
* Cloud email restrictions
* Build-time vs runtime variables
* Preflight OPTIONS requests


---

# Challenges Faced While Building This Project

## From Idea → Architecture → Development → Deployment

### And How Each Challenge Was Solved Step by Step

---

## 1. Challenge at the Very Start:

### “What exactly should I build?”

### Problem

At the beginning, the biggest challenge was **not coding**, but **clarity**.

Questions that came up:

* Should this be just a static portfolio?
* Should it include backend features?
* Should it show real data or dummy data?
* Should it be beginner-level or industry-level?

Most beginners stop at a static website.

### Decision Taken

I decided that:

* This should **not** be a static portfolio
* It should behave like a **real product**
* It should have:

  * Real backend services
  * Real APIs
  * Real email sending
  * Real deployment

### Resolution

I clearly defined **project goals**:

* A professional portfolio frontend
* A backend to fetch LeetCode data
* A backend to handle contact form emails
* Everything deployed and working live

This decision shaped everything that followed.

---

## 2. Architecture-Level Challenge:

### “Single backend or multiple backends?”

### Problem

Initially, it was tempting to:

* Put everything into one backend
* Or avoid backend completely

But that approach would:

* Mix unrelated responsibilities
* Become hard to scale
* Not reflect real-world architecture

### Architectural Confusion

Questions:

* Should LeetCode logic and Contact form logic be together?
* What if one service fails?
* How to deploy safely?

### Final Architecture Chosen

I split the system into **three independent parts**:

1. Frontend (React + Vite)
2. LeetCode Backend (data fetching)
3. Contact Backend (email sending)

### Why This Was Challenging

* Multiple servers
* Multiple deployments
* Multiple environment configurations
* CORS between services

### How I Resolved It

I applied **Single Responsibility Principle**:

* One backend = one job
* Each service independently deployable
* Failures isolated

This is how real systems are built.

---

## 3. Backend Development Challenge:

### “It works locally but not in production”

### Problem

While building backend features:

* APIs worked perfectly on localhost
* But failed after deployment

This created confusion:

* Code looked correct
* Logic was correct
* But production behaved differently

### Root Cause Identified

Difference between:

* Local environment
* Cloud environment

Specifically:

* `.env` works locally
* Cloud platforms do not read `.env` automatically

### Resolution Steps

1. Learned that `.env` must **never** be relied on in production
2. Removed `.env` from GitHub
3. Used platform dashboards (Render / Vercel) to set variables
4. Restarted services after each change

This fixed environment-related failures.

---

## 4. Email Sending Challenge (SMTP):

### “Email works locally but fails after deployment”

### Problem

Contact form email sending:

* Worked locally using Gmail SMTP
* Failed on Render with timeout errors

Errors seen:

* Connection timeout
* Authentication issues
* No emails delivered

### Why This Happened

* Gmail SMTP is unreliable on cloud servers
* Cloud IPs are often blocked by Gmail
* SMTP is not ideal for serverless/cloud environments

### Resolution

Instead of fighting SMTP:

* Switched to **Resend**, a production email service
* Used API-based email sending instead of SMTP
* Removed Gmail dependency completely

This immediately stabilized email delivery.

---

## 5. Resend Integration Challenge:

### “Missing API key error”

### Problem

After integrating Resend, the backend crashed with:

```
Missing API key. Pass it to new Resend("re_123")
```

### Root Cause

* Environment variable was not loading
* `dotenv` was not executed before imports
* ES Module loading order matters

### Resolution Steps

1. Ensured environment loading happens **before usage**
2. Verified variables via logs
3. Confirmed API key exists in Render dashboard
4. Redeployed backend

This fixed the crash completely.

---

## 6. CORS Challenge:

### “Backend works in Postman but not in browser”

### Problem

Frontend requests failed with:

```
Blocked by CORS policy
No 'Access-Control-Allow-Origin' header
```

But:

* Postman worked
* Backend logic worked

### Why This Was Confusing

Postman ignores CORS.
Browsers enforce it strictly.

### Resolution

1. Added proper CORS configuration
2. Explicitly allowed:

   * Localhost
   * Vercel frontend domain
3. Allowed required HTTP methods
4. Redeployed backend

After this, browser requests worked.

---

## 7. OPTIONS / Preflight Request Crash

### Problem

Render logs showed:

```
PathError: Missing parameter name at index 1: *
```

### Root Cause

* Unsafe wildcard route handling
* `app.options("*", ...)` caused conflicts in newer Express versions

### Resolution

* Removed wildcard OPTIONS route
* Simplified CORS handling
* Let Express manage preflight internally

Backend stopped crashing.

---

## 8. Frontend Deployment Challenge:

### “Build works locally but fails on Vercel”

### Problem

Vercel build failed with:

```
Could not resolve './sections/Leetcode'
```

### Root Cause

* Windows file system is case-insensitive
* Linux (Vercel) is case-sensitive
* File name and import casing didn’t match

### Resolution

* Renamed imports to match file names exactly
* Rebuilt and redeployed

This is a classic real-world production issue.

---

## 9. Frontend Authentication Issue in Incognito

### Problem

Opening the site in incognito showed authentication prompt.

### Root Cause

* Vercel protection was enabled
* Site was not fully public

### Resolution

* Disabled authentication in Vercel settings
* Redeployed frontend

Site became publicly accessible.

---

## 10. Frontend → Backend Communication Failure (CORS Again)

### Problem

Even after deployment, frontend couldn’t send messages:

```
No 'Access-Control-Allow-Origin' header
```

### Resolution

* Updated backend CORS allowed origins
* Added correct Vercel production URL
* Redeployed backend

After this, contact form worked live.

---

## 11. Accidental `.env` Commit

### Problem

`.env` was accidentally pushed to GitHub.

### Risks

* Security breach
* API key exposure

### Resolution

1. Deleted `.env` from repository
2. Rotated API keys
3. Added `.env` to `.gitignore`
4. Used environment dashboard only

Important security lesson learned.

---

## 12. Final Stability Testing

### Steps Taken

* Tested locally
* Tested Postman
* Tested deployed frontend
* Tested incognito mode
* Verified email delivery via Resend dashboard

Everything worked end-to-end.

---

## Final Outcome

* Clean architecture
* Production-ready backend services
* Secure environment handling
* Reliable email delivery
* Fully deployed frontend

---

## What This Journey Shows

* Real-world problem solving
* Debugging production systems
* Understanding of cloud platforms
* Proper architectural thinking
* Ability to recover from mistakes




