from django.core.management.base import BaseCommand
from portfolio.models import (
    ProfileConfig,
    SkillCategory,
    Skill,
    Project,
    Achievement,
    Certification,
)


class Command(BaseCommand):
    help = 'Seeds initial verified portfolio data for Mohammed Saalim'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Seeding verified portfolio data for Mohammed Saalim...'))

        # 1. Profile Config
        profile, created = ProfileConfig.objects.get_or_create(id=1)
        profile.full_name = 'Mohammed Saalim'
        profile.headline = 'Aspiring Full-Stack Developer | Computer Science Engineer'
        profile.bio = (
            "Computer Science and Engineering student at Sri Siddhartha Institute of Technology (SSIT), "
            "Tumakuru, Karnataka, India (Batch 2027). Building strong software engineering fundamentals, "
            "developing full-stack applications with Python & Django, and exploring interactive 3D and AI systems."
        )
        profile.location = 'Tumakuru, Karnataka, India — 572101'
        profile.email = 'mohammedsaalimismil@gmail.com'
        profile.phone = '+91 7975685763'
        profile.linkjar_url = 'https://linkjar.to/149abba4/'
        profile.education_degree = 'B.E. in Computer Science and Engineering'
        profile.education_institution = 'Sri Siddhartha Institute of Technology (SSIT)'
        profile.education_location = 'Tumakuru, Karnataka, India'
        profile.graduation_batch = '2027'
        profile.cgpa = '7.44'
        profile.certificate_url = 'https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D'
        profile.save()
        self.stdout.write(self.style.SUCCESS('  [+] ProfileConfig verified and saved.'))

        # 2. Skill Categories (Floors 1-6)
        categories_data = [
            {
                'floor': 1,
                'name': 'Programming Languages',
                'desc': 'Foundational languages for problem-solving, systems logic, and application development.',
                'theme': 'Ancient Stone & Cedar Workshop',
                'color': '#3b82f6',
                'skills': [
                    ('Python', 'Python', 'proficient', 'Core language for Django backends, automation scripts, and data handling.', 1, 'python'),
                    ('C++', 'C++', 'proficient', 'Strong object-oriented fundamentals, algorithmic problem solving, and memory management.', 2, 'cpp'),
                    ('Java', 'Java', 'proficient', 'Object-oriented programming, class hierarchies, and robust enterprise design patterns.', 3, 'java'),
                    ('C#', 'C#', 'proficient', 'Structured programming, modern component modeling, and .NET ecosystem exploration.', 4, 'csharp'),
                    ('JavaScript', 'JS', 'proficient', 'Interactive client-side web development, DOM manipulation, and asynchronous programming.', 5, 'javascript'),
                ]
            },
            {
                'floor': 2,
                'name': 'Frontend Engineering',
                'desc': 'Building responsive, modern, and interactive user interfaces.',
                'theme': 'Luminous Glass Observatory',
                'color': '#06b6d4',
                'skills': [
                    ('HTML5', 'HTML5', 'proficient', 'Semantic document structuring, accessibility standards, and web document layout.', 1, 'html5'),
                    ('CSS3', 'CSS3', 'proficient', 'Responsive Flexbox, Grid layouts, custom variables, smooth transitions, and keyframe animations.', 2, 'css3'),
                    ('JavaScript (ES6+)', 'ES6+', 'proficient', 'Modern ECMAScript, promises, async/await, event loops, and modular code architecture.', 3, 'javascript'),
                    ('Responsive Web Design', 'RWD', 'proficient', 'Mobile-first adaptation, viewport units, fluid typography, and multi-device usability.', 4, 'responsive'),
                    ('Three.js & 3D Web', 'Three.js', 'actively_learning', 'WebGL rendering, 3D math, scene graphs, lighting, cameras, shaders, and interactive 3D spaces.', 5, 'threejs'),
                ]
            },
            {
                'floor': 3,
                'name': 'Backend Engineering',
                'desc': 'Robust server-side architecture, application business logic, and API engineering.',
                'theme': 'Clockwork Engine Sanctum',
                'color': '#10b981',
                'skills': [
                    ('Python Backend', 'Python', 'proficient', 'Server-side application logic, data structures, and algorithmic execution.', 1, 'python'),
                    ('Django Framework', 'Django', 'proficient', 'MVT (Model-View-Template) architecture, ORM queries, forms, session management, and middleware.', 2, 'django'),
                    ('Django Authentication', 'Auth', 'proficient', 'Secure user registration, session cookies, password hashing, login protection, and permissions.', 3, 'auth'),
                    ('REST API Concepts', 'REST', 'actively_learning', 'Stateless HTTP endpoints, JSON serialization, status codes, and client-server decoupling.', 4, 'api'),
                ]
            },
            {
                'floor': 4,
                'name': 'Database Systems',
                'desc': 'Structured data persistence, relational modeling, and query optimization.',
                'theme': 'Crystalline Data Chamber',
                'color': '#f59e0b',
                'skills': [
                    ('MySQL', 'MySQL', 'proficient', 'Relational schema design, normalization, foreign key constraints, joins, and ACID transactions.', 1, 'mysql'),
                    ('SQL', 'SQL', 'proficient', 'Structured query language, complex filtering, indexing, and aggregate calculations.', 2, 'sql'),
                    ('DBMS Principles', 'DBMS', 'proficient', 'Database management systems theory, entity-relationship diagrams, transactions, and integrity.', 3, 'dbms'),
                    ('MongoDB', 'NoSQL', 'actively_learning', 'Document-based collections, BSON storage, and unstructured schema flexibility.', 4, 'mongodb'),
                ]
            },
            {
                'floor': 5,
                'name': 'Core Computer Science Fundamentals',
                'desc': 'The foundational pillars of computer science engineering taught at SSIT Tumakuru.',
                'theme': 'Library of First Principles',
                'color': '#8b5cf6',
                'skills': [
                    ('Object-Oriented Programming', 'OOP', 'proficient', 'Encapsulation, inheritance, polymorphism, abstraction, and modular software architecture.', 1, 'oop'),
                    ('Data Structures & Algorithms', 'DSA', 'proficient', 'Arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and complexity analysis.', 2, 'dsa'),
                    ('Computer Networks', 'CN', 'proficient', 'OSI model, TCP/IP stack, routing, socket protocols, DNS, HTTP/HTTPS, and packet communication.', 3, 'cn'),
                    ('Operating Systems', 'OS', 'proficient', 'Process scheduling, concurrency, multithreading, memory management, virtual memory, and file systems.', 4, 'os'),
                ]
            },
            {
                'floor': 6,
                'name': 'Tools & Emerging Technologies',
                'desc': 'Modern engineering toolchain and forward-looking exploration in AI and cloud systems.',
                'theme': 'Horizon Spire & Skydeck',
                'color': '#ec4899',
                'skills': [
                    ('Git & GitHub', 'Git', 'proficient', 'Version control, branch management, pull requests, commit history, and team collaboration.', 1, 'git'),
                    ('VS Code', 'IDE', 'proficient', 'Integrated development workflow, debugging, extensions, and terminal integration.', 2, 'vscode'),
                    ('NumPy & Pandas', 'Data', 'actively_learning', 'Array mathematics, series, DataFrames, data cleaning, and numerical data processing.', 3, 'numpy'),
                    ('AWS Cloud Fundamentals', 'AWS', 'actively_learning', 'EC2 instances, S3 storage buckets, cloud compute principles, and managed services.', 4, 'aws'),
                    ('Artificial Intelligence & ML', 'AI/ML', 'interest', 'Machine learning algorithms, deep learning neural networks, and AI-powered modern application design.', 5, 'ai'),
                    ('MERN Stack Exploration', 'MERN', 'interest', 'Exploring MongoDB, Express, React, and Node.js for modern full-stack web architectures.', 6, 'react'),
                ]
            }
        ]

        for cat_info in categories_data:
            cat, _ = SkillCategory.objects.get_or_create(
                floor_number=cat_info['floor'],
                defaults={
                    'name': cat_info['name'],
                    'description': cat_info['desc'],
                    'architectural_theme': cat_info['theme'],
                    'accent_color': cat_info['color'],
                }
            )
            cat.name = cat_info['name']
            cat.description = cat_info['desc']
            cat.architectural_theme = cat_info['theme']
            cat.accent_color = cat_info['color']
            cat.save()

            for name, abbr, status, desc, order, icon in cat_info['skills']:
                skill, _ = Skill.objects.get_or_create(
                    category=cat,
                    name=name,
                    defaults={
                        'abbreviation': abbr,
                        'description': desc,
                        'status': status,
                        'order': order,
                        'icon_name': icon,
                    }
                )
                skill.abbreviation = abbr
                skill.description = desc
                skill.status = status
                skill.order = order
                skill.icon_name = icon
                skill.save()

        self.stdout.write(self.style.SUCCESS('  [+] Skills Tower (6 Floors and 27 Skills) seeded.'))

        # 3. Projects
        p1, _ = Project.objects.get_or_create(
            slug='agrosense-smart-crop-advisory',
            defaults={'title': 'AgroSense — Smart Farmer Crop Advisory System'}
        )
        p1.title = 'AgroSense — Smart Farmer Crop Advisory System'
        p1.tagline = 'IoT-powered smart agriculture and automated irrigation advisory system with Django backend.'
        p1.location_tag = 'agrosense'
        p1.status = 'completed'
        p1.is_featured = True
        p1.order = 1
        p1.problem_statement = (
            "Traditional farming relies on manual guesswork for watering and climate observation, "
            "leading to water wastage, crop disease, and suboptimal yields due to unmonitored soil moisture and ambient conditions."
        )
        p1.solution = (
            "An integrated hardware-software ecosystem combining an ESP32 microcontroller with ambient environmental sensors "
            "and a central Django web platform. The system streams telemetry via MQTT, calculates irrigation necessity, and "
            "triggers automated water pump relays or allows manual farmer control through a web dashboard."
        )
        p1.contribution = (
            "Architected the Django web backend, data ingestion endpoints, sensor status visualization dashboard, "
            "pump relay state control logic, and hardware-cloud communication workflow."
        )
        p1.tech_stack = 'Django, Python, ESP32, MQTT, Soil Moisture Sensor, DHT22 (Temp & Humidity), LDR Light Sensor, Water Pump Relay'
        p1.architecture_notes = (
            "ESP32 reads soil moisture, temperature, and light sensors -> Publishes telemetry over MQTT -> "
            "Django backend ingests data and records time-series logs -> Web dashboard displays real-time status -> "
            "Automation rules trigger pump relay or notify farmer."
        )
        p1.live_url = 'https://agrosense-io-1.onrender.com/accounts/login/?next=/'
        p1.requires_login = True
        p1.save()

        p2, _ = Project.objects.get_or_create(
            slug='longlink-private-network',
            defaults={'title': 'LONGLINK — Private Communication & WebRTC Network'}
        )
        p2.title = 'LONGLINK — Private Communication & WebRTC Network'
        p2.tagline = 'Django-based private family communication network and real-time video interaction platform.'
        p2.location_tag = 'longlink'
        p2.status = 'in_development'
        p2.is_featured = True
        p2.order = 2
        p2.problem_statement = (
            "Commercial messaging and video calling platforms often lack privacy, host invasive advertising, "
            "or do not offer a unified private community space tailored for close-knit groups or family networks."
        )
        p2.solution = (
            "A dedicated communication platform built on Django and WebRTC providing peer-to-peer audio/video streaming, "
            "private text channels, authenticated rooms, and real-time state synchronization."
        )
        p2.contribution = (
            "Designing the Django application architecture, room authentication policies, "
            "WebRTC signaling protocol handlers, and responsive video layout."
        )
        p2.tech_stack = 'Python, Django, WebRTC, Django Channels, WebSockets, HTML5, CSS3, JavaScript'
        p2.architecture_notes = (
            "Clients authenticate via Django sessions -> Connect to Django Channels WebSocket for SDP offer/answer signaling -> "
            "Direct peer-to-peer WebRTC media stream established for low-latency video and audio."
        )
        p2.save()

        p3, _ = Project.objects.get_or_create(
            slug='f1-ferrari-telemetry-experience',
            defaults={'title': 'Formula 1 & Ferrari Telemetry Experience'}
        )
        p3.title = 'Formula 1 & Ferrari Telemetry Experience'
        p3.tagline = 'Interactive telemetry visualization and aerodynamic engineering simulation inspired by Scuderia Ferrari.'
        p3.location_tag = 'f1_experience'
        p3.status = 'concept'
        p3.is_featured = True
        p3.order = 3
        p3.problem_statement = (
            "Motorsport telemetry datasets are dense and multi-dimensional; understanding car telemetry "
            "(speed, throttle, brake, tire temperature, gear shifts) requires intuitive real-time visual representation."
        )
        p3.solution = (
            "A creative web application translating racing telemetry concepts into interactive visual gauges, "
            "track sector analysis, and responsive car dynamics simulations. Demonstrates passion for high-performance software and real-time data visualization."
        )
        p3.contribution = "Conceptualization, telemetry mathematical modeling, 3D visualization prototypes, and responsive telemetry dashboard interface."
        p3.tech_stack = 'JavaScript, Three.js, CSS3 Animations, Data Visualization, Performance Engineering'
        p3.architecture_notes = (
            "Telemetry simulation stream -> Interpolation engine -> Synchronized track position, tachometer, "
            "G-force vectors, and tire wear indicators rendered at 60 FPS."
        )
        p3.save()

        p4, _ = Project.objects.get_or_create(
            slug='emerging-tech-ai-lab',
            defaults={'title': 'Emerging Tech & AI Developer Lab'}
        )
        p4.title = 'Emerging Tech & AI Developer Lab'
        p4.tagline = 'Configurable research hub for upcoming full-stack applications, developer tools, and machine learning models.'
        p4.location_tag = 'future_lab'
        p4.status = 'concept'
        p4.is_featured = False
        p4.order = 4
        p4.problem_statement = 'Modern software engineering is rapidly evolving with generative AI, intelligent agents, and microservices.'
        p4.solution = 'An active experimental laboratory within the portfolio designed to house future projects including MERN stack applications, algorithmic visualizers, and intelligent assistant tools.'
        p4.contribution = 'Continuous research, rapid prototyping, and architecture design.'
        p4.tech_stack = 'Python, Django, NumPy, Pandas, React, Cloud Compute, AI/ML APIs'
        p4.architecture_notes = 'Modular container architecture ready to host new microservices, interactive demos, and research papers as they are developed.'
        p4.save()

        self.stdout.write(self.style.SUCCESS('  [+] Projects seeded (AgroSense, LONGLINK, F1 Experience, Future Lab).'))

        # 4. Achievement
        ach, _ = Achievement.objects.get_or_create(
            title='Smart Farmer Crop Advisory System (AgroSense)',
            defaults={'event_name': 'SSIT Tumakuru Hackathon'}
        )
        ach.event_name = 'SSIT Tumakuru Hackathon'
        ach.award = '₹2,000 Cash Prize & Certificate of Merit'
        ach.date_achieved = 'Academic Year 2024–2025'
        ach.project = p1
        ach.description = (
            "Awarded 1st/Top distinction and ₹2,000 cash prize with certificate for developing AgroSense — "
            "an end-to-end IoT and Django-powered smart crop advisory and automated irrigation system at Sri Siddhartha Institute of Technology."
        )
        ach.is_featured = True
        ach.order = 1
        ach.save()
        self.stdout.write(self.style.SUCCESS('  [+] Hackathon Trophy & Achievement seeded.'))

        # 5. Certification
        cert, _ = Certification.objects.get_or_create(id=1)
        cert.label = 'Certification'
        cert.title = 'Verified Technical Credential'
        cert.issuing_organization = 'Sri Siddhartha Institute of Technology / Verified Organization'
        cert.view_url = 'https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D'
        cert.description = (
            "Official certificate credential document viewable via FlipLink. "
            "Verify the complete certificate and credential details at the link below."
        )
        cert.is_featured = True
        cert.save()
        self.stdout.write(self.style.SUCCESS('  [+] Certification record seeded.'))

        self.stdout.write(self.style.SUCCESS('All portfolio seed data successfully applied!'))
