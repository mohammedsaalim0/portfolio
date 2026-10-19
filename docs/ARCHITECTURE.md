# Architecture Documentation — Saalim's World

**Project Name:** Saalim's World — The Journey of a Developer  
**Developer Profile:** Mohammed Saalim  
**Degree & Institution:** B.E. in Computer Science & Engineering, Sri Siddhartha Institute of Technology (SSIT), Tumakuru, Karnataka, India (Batch 2027)

---

## 1. System Overview

Saalim's World is a cinematic, interactive 3D developer portfolio powered by a **Django** backend and a **Three.js (WebGL)** frontend rendering engine.

Rather than presenting isolated floating cards or disconnected 3D objects, the entire portfolio is structured as a contiguous, explorable floating island where every landmark represents a real chapter in Mohammed Saalim's developer journey:
- **Location A (Entrance Gate):** Introduction & philosophy.
- **Location B (Developer Home):** Academic journey at SSIT Tumakuru, CGPA milestone, study room, reading bookshelf, and dev workspace.
- **Location C (Skills Tower):** 6-floor architectural tower containing verified skills across Programming, Frontend, Backend, Databases, Core Computer Science Fundamentals, and Tools/AI. Includes a dedicated Django & MySQL full-stack architecture showcase.
- **Location D (Project Valley):** Interactive installations for featured projects:
  - *AgroSense Station:* IoT-powered Smart Farmer Crop Advisory System (ESP32, MQTT, Sensors, automated irrigation relay, and live Django dashboard).
  - *LONGLINK Observatory:* Private family network and real-time WebRTC media.
  - *Formula 1 Engineering Circuit:* Aerodynamics and real-time telemetry gauges inspired by Scuderia Ferrari.
  - *Future Tech Lab:* Configurable research hub for emerging technologies.
- **Location E (Achievement Hall):** SSIT Tumakuru Hackathon Trophy (₹2,000 cash prize & certificate) and FlipLink verified certification viewer.
- **Location F (Contact Lighthouse):** Perched over the endless ocean with rotating spotlight beam, direct contact options, and a server-validated Django contact form.

---

## 2. Technical Stack Breakdown

### Backend (Python & Django)
- **Django 5.x:** Core MVT architecture.
- **Django ORM:** Manages `ProfileConfig`, `SkillCategory`, `Skill`, `Project`, `Achievement`, `Certification`, and `ContactMessage`.
- **Database:** SQLite for zero-setup local execution; ready for MySQL / PostgreSQL via environment variables (`DB_ENGINE=mysql`).
- **Security:** CSRF tokens required on all state-altering requests, anti-spam honeypot fields, XSS protection, clickjacking protection.
- **WhiteNoise:** Serves optimized static assets and vendor bundles directly in production with compression and cache headers.

### Frontend (Three.js & Modern Web)
- **Three.js (v0.160.0):** Scene management, ACESFilmic tone mapping, perspective camera interpolation, PCF soft shadows, instanced foliage, procedural geometry.
- **Web Audio API:** Zero-dependency synthetic ambient soundscape generating gentle ocean wind, soft water foam rumble, and interactive chimes. Muted by default.
- **Semantic HTML5 & Responsive CSS:** Glassmorphic HUD, full mobile responsiveness, and an accessible Recruiter Mode.

---

## 3. Data Flow Architecture

```
+-------------------------------------------------------------+
|                     Client Browser                          |
|  - Three.js 3D Floating Island / Raycast Event Handlers    |
|  - Scroll Story Progress Controller                         |
|  - Recruiter Mode Semantic Fallback                         |
+------------------------------+------------------------------+
                               |
                        HTTP / AJAX Request
                               |
                               v
+-------------------------------------------------------------+
|                     Django Web Layer                        |
|  - Security & CSRF Middleware                               |
|  - Context Processor (`portfolio_profile`)                  |
|  - Forms & Server-Side Sanitization / Honeypot Filter       |
+------------------------------+------------------------------+
                               |
                        ORM Queries
                               |
                               v
+-------------------------------------------------------------+
|                     Database Layer                          |
|  - SQLite (Local development)                               |
|  - MySQL / PostgreSQL (Production)                          |
+-------------------------------------------------------------+
```

---

## 4. Accessibility & Performance Design

1. **Non-WebGL Fallback:** Detects WebGL capability on load. If unavailable, seamlessly presents the accessible Recruiter Mode without broken scripts.
2. **Reduced Motion (`prefers-reduced-motion`):** Disables continuous animation loops and presents a content-first static layout.
3. **Adaptive Pixel Ratio:** Scales between 1.0x and 2.0x depending on hardware concurrency and device tier.
4. **Keyboard Accessibility:** Direct numerical jumps (Keys 1–7) navigate through landmarks; `M` toggles audio; `R` toggles Recruiter Mode; `E` toggles Exploration Mode.
