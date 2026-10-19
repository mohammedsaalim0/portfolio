# Saalim's World — The Journey of a Developer
### Cinematic 3D Developer Portfolio & Interactive Universe

[![Python](https://img.shields.io/badge/Python-3.12%20%7C%203.14-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.2-green.svg)](https://www.djangoproject.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black.svg)](https://threejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL%20%2F%20SQLite-orange.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 1. Executive Summary & Creative Concept

**Saalim's World** is an interactive 3D portfolio and living universe created for **Mohammed Saalim**, an aspiring full-stack developer and Computer Science and Engineering student at **Sri Siddhartha Institute of Technology (SSIT), Tumakuru, Karnataka, India** (Graduation Batch 2027).

Rather than presenting a static card gallery, the entire portfolio is realized as an explorable floating island suspended in an atmospheric sky of clouds, distant peaks, cascading waterfalls, and day-to-night lighting transitions.

Every major section of the portfolio is integrated into a spatial landmark:
- **Location A (The Entrance Gate):** Personal introduction and overarching philosophy.
- **Location B (Developer Home):** Study desk, laptop workstation, academic milestone at SSIT Tumakuru (**CGPA: 7.44**), reading bookshelf, and dev journey.
- **Location C (The Skills Tower):** 6-floor architectural spire covering Programming, Frontend, Backend, Databases, Core Computer Science Fundamentals (OOP, DSA, CN, OS, DBMS), and Emerging Tech. Features an interactive **Django & MySQL Full-Stack Architecture Showcase**.
- **Location D (The Project Valley):**
  - **AgroSense — Smart Farmer Crop Advisory System:** Living smart agriculture station with ESP32 sensor poles, soil beds, water pump relay simulation, and direct link to the live hosted Django application.
  - **LONGLINK Observatory:** Private family communication and WebRTC real-time video network.
  - **Formula 1 & Ferrari Telemetry Circuit:** Interactive telemetry visualization and aerodynamic racing installation inspired by motorsport engineering.
  - **Emerging Tech & AI Lab:** Configurable research pavilion.
- **Location E (The Achievement Hall):** Official showcase displaying the **SSIT Tumakuru Hackathon Trophy & ₹2,000 Cash Prize** for AgroSense, alongside a verified **FlipLink Certification** glass case.
- **Location F (The Contact Lighthouse):** Ocean cliff lighthouse with rotating volumetric spotlight beam, verified direct contact links, and a secure server-validated Django contact form.

---

## 2. Verified Personal Profile

All details are grounded in Mohammed Saalim's background:
- **Full Name:** Mohammed Saalim
- **Professional Title:** Aspiring Full-Stack Developer | Computer Science Engineer | Software Developer
- **Institution:** Sri Siddhartha Institute of Technology (SSIT), Tumakuru, Karnataka, India
- **Degree:** B.E. in Computer Science and Engineering
- **Graduation Batch:** 2027
- **Academic Milestone:** Latest reported CGPA: **7.44**
- **Location:** Tumakuru, Karnataka, India — 572101
- **Email:** [mohammedsaalimismil@gmail.com](mailto:mohammedsaalimismil@gmail.com)
- **Phone:** +91 7975685763
- **Linkjar Profile:** [https://linkjar.to/149abba4/](https://linkjar.to/149abba4/)
- **Official Certification Link:** [https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D](https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D)
- **Featured Live Project (AgroSense):** [https://agrosense-io-1.onrender.com/accounts/login/?next=/](https://agrosense-io-1.onrender.com/accounts/login/?next=/) *(Hosted on Render; requires login credentials)*
- **Hackathon Achievement:** Won ₹2,000 cash prize and certificate at SSIT Tumakuru Hackathon with AgroSense.

---

## 3. Key Technical Highlights

1. **Dual Experience Modes:**
   - **Cinematic Scroll Mode:** Scrolling smoothly interpolates camera position, orientation, and third-person avatar progression along a spline path across all 6 island locations.
   - **Free Exploration Mode:** Direct keyboard control (WASD / Arrows) of the developer avatar with procedural walking animations and collision-safe island boundaries.
2. **Recruiter-First Usability & Non-WebGL Fallback:**
   - One-click **Recruiter Mode** instantly surfaces a high-contrast, semantic, content-first version of all information without requiring 3D navigation.
   - Automatic WebGL context detection gracefully falls back to the accessible mode if hardware acceleration is unavailable.
3. **Procedural Web Audio API Synthesizer:**
   - Zero external audio files required. Uses real-time pink noise filtering for ambient ocean wind and sine-wave oscillators for harmonious chimes. Muted by default to respect browser policies.
4. **Django Backend Integration:**
   - Server-side form validation with invisible honeypot anti-spam trapping.
   - Comprehensive Django models and Django Admin portal for updating skills, projects, achievements, and reviewing submitted contact messages.
   - Database portability: SQLite for local dev, instant switch to MySQL or PostgreSQL.

---

## 4. Quick Start Installation

### Prerequisites
- Python 3.10, 3.11, 3.12, 3.13, or 3.14
- Git (optional)

### Option A: Automated Setup on Windows (PowerShell)
```powershell
cd saalim-world
.\scripts\setup.ps1
```

### Option B: Automated Setup on Linux / macOS
```bash
cd saalim-world
chmod +x scripts/setup.sh
./scripts/setup.sh
```

---

## 5. Manual Step-by-Step Installation

### Step 1: Create and Activate Virtual Environment
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 2: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```
*(By default, SQLite is pre-configured for zero-setup execution. If using MySQL, adjust `DB_ENGINE=mysql`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in `.env`)*.

### Step 4: Apply Database Migrations
```bash
python manage.py migrate
```

### Step 5: Seed Verified Portfolio Data
Populates Mohammed Saalim's verified profile, skills tower (6 floors and 27 skills), projects, achievements, and certificate link into the database:
```bash
python manage.py seed_portfolio
```

### Step 6: Create Superuser (For Django Admin)
```bash
python manage.py createsuperuser
```

### Step 7: Run Development Server
```bash
python manage.py runserver
```

Open your browser and navigate to:
- **Interactive Portfolio:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Django Administration:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 6. Managing Content via Django Admin

1. Navigate to `http://127.0.0.1:8000/admin/` and sign in.
2. In the **Saalim Portfolio Management** section, you can:
   - **Profile Configuration:** Update your headline, bio, contact details, LinkedIn/GitHub URLs, and upload an optional resume PDF.
   - **Skills Tower Floors & Skills:** Edit technical categories, change proficiency tags (*Proficient*, *Actively Learning*, *Emerging Interest*), or add new technologies.
   - **Projects:** Update AgroSense, LONGLINK, or add upcoming AI and developer tool projects with live demo links and problem/solution descriptions.
   - **Achievements & Certifications:** Update certificate links or upload image scans.
   - **Contact Submissions:** Review inquiries submitted via the Contact Lighthouse.

---

## 7. Running Automated Tests

Run the comprehensive automated test suite (views, models, honeypot spam protection, API endpoints):
```bash
python manage.py test tests
```

---

## 8. Docker Deployment

Deploy with Docker and Docker Compose:
```bash
docker-compose up --build -d
```
The application will be accessible on `http://localhost:8000`.

---

## 9. Keyboard Shortcuts & Controls

- **Scroll Wheel / Drag:** Advances the cinematic camera across the floating island.
- **W / A / S / D or Arrow Keys:** Moves avatar in Free Explore Mode.
- **Keys 1 to 7:** Jump directly to specific island landmarks:
  - `1`: Floating Island Reveal
  - `2`: Entrance Gate
  - `3`: Developer Home & SSIT Journey
  - `4`: Skills Tower
  - `5`: AgroSense & Project Valley
  - `6`: Achievement Hall
  - `7`: Contact Lighthouse
- **Key M:** Toggle sound synthesizer on / off.
- **Key R:** Toggle accessible Recruiter Mode.
- **Key E:** Toggle Free Exploration Mode.
- **Key Escape:** Close active interactive drawer.

---

## 10. Honest Disclosure of Implementations & Placeholders

- **Verified & Implemented:** Full name, SSIT Tumakuru CSE affiliation, graduation batch 2027, interim CGPA (7.44), email, phone, location, Linkjar profile, AgroSense SSIT Hackathon win (₹2,000 prize), AgroSense live URL on Render (with authentication disclosure), FlipLink certificate link, full-stack Django backend, Three.js 3D world with all 6 locations, Web Audio synthesizer, contact form with honeypot spam protection, and non-WebGL fallback.
- **Configurable Placeholders:** LinkedIn profile URL, GitHub profile URL, and Resume PDF download action are intentionally left as configurable placeholders in `portfolio/models.py` / Django admin to prevent fabricating external social links.
