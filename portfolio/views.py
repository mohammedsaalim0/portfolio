import json
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie
from django.core.mail import send_mail
from django.conf import settings
from .models import (
    ProfileConfig,
    SkillCategory,
    Skill,
    Project,
    Achievement,
    Certification,
    ContactMessage,
)
from .forms import ContactForm


def get_default_portfolio_data():
    """
    Fallback structured data ensuring the 3D world and templates always render
    with complete, authentic content even before migrations or seed scripts run.
    """
    return {
        'profile': {
            'full_name': 'Mohammed Saalim',
            'headline': 'Aspiring Full-Stack Developer | Computer Science Engineer',
            'sub_headline': 'Computer Science and Engineering Student, SSIT Tumakuru',
            'location': 'Tumakuru, Karnataka, India — 572101',
            'email': 'mohammedsaalimismil@gmail.com',
            'phone': '+91 7975685763',
            'linkjar_url': 'https://linkjar.to/149abba4/',
            'education_degree': 'B.E. in Computer Science and Engineering',
            'education_institution': 'Sri Siddhartha Institute of Technology (SSIT)',
            'education_location': 'Tumakuru, Karnataka, India',
            'graduation_batch': '2027',
            'cgpa': '7.44',
            'cgpa_note': 'Latest reported academic milestone (Batch 2027)',
            'certificate_url': 'https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D',
        },
        'categories': [
            {
                'floor': 1,
                'name': 'Programming Languages',
                'description': 'Foundational languages for problem-solving, systems logic, and application development.',
                'theme': 'Ancient Stone & Cedar Workshop',
                'color': '#3b82f6',
                'skills': [
                    {'name': 'Python', 'abbr': 'Python', 'status': 'proficient', 'desc': 'Core language for Django backends, automation scripts, and data handling.'},
                    {'name': 'C++', 'abbr': 'C++', 'status': 'proficient', 'desc': 'Strong object-oriented fundamentals, algorithmic problem solving, and memory management.'},
                    {'name': 'Java', 'abbr': 'Java', 'status': 'proficient', 'desc': 'Object-oriented programming, class hierarchies, and robust enterprise design patterns.'},
                    {'name': 'C#', 'abbr': 'C#', 'status': 'proficient', 'desc': 'Structured programming, modern component modeling, and .NET ecosystem exploration.'},
                    {'name': 'JavaScript', 'abbr': 'JS', 'status': 'proficient', 'desc': 'Interactive client-side web development, DOM manipulation, and asynchronous programming.'},
                ]
            },
            {
                'floor': 2,
                'name': 'Frontend Engineering',
                'description': 'Building responsive, modern, and interactive user interfaces.',
                'theme': 'Luminous Glass Observatory',
                'color': '#06b6d4',
                'skills': [
                    {'name': 'HTML5', 'abbr': 'HTML5', 'status': 'proficient', 'desc': 'Semantic document structuring, accessibility standards, and web document layout.'},
                    {'name': 'CSS3', 'abbr': 'CSS3', 'status': 'proficient', 'desc': 'Responsive Flexbox, Grid layouts, custom variables, smooth transitions, and keyframe animations.'},
                    {'name': 'JavaScript (ES6+)', 'abbr': 'ES6+', 'status': 'proficient', 'desc': 'Modern ECMAScript, promises, async/await, event loops, and modular code architecture.'},
                    {'name': 'Responsive Web Design', 'abbr': 'RWD', 'status': 'proficient', 'desc': 'Mobile-first adaptation, viewport units, fluid typography, and multi-device usability.'},
                    {'name': 'Three.js & 3D Web', 'abbr': 'Three.js', 'status': 'actively_learning', 'desc': 'WebGL rendering, 3D math, scene graphs, lighting, cameras, shaders, and interactive 3D spaces.'},
                ]
            },
            {
                'floor': 3,
                'name': 'Backend Engineering',
                'description': 'Robust server-side architecture, application business logic, and API engineering.',
                'theme': 'Clockwork Engine Sanctum',
                'color': '#10b981',
                'skills': [
                    {'name': 'Python Backend', 'abbr': 'Python', 'status': 'proficient', 'desc': 'Server-side application logic, data structures, and algorithmic execution.'},
                    {'name': 'Django Framework', 'abbr': 'Django', 'status': 'proficient', 'desc': 'MVT (Model-View-Template) architecture, ORM queries, forms, session management, and middleware.'},
                    {'name': 'Django Authentication', 'abbr': 'Auth', 'status': 'proficient', 'desc': 'Secure user registration, session cookies, password hashing, login protection, and permissions.'},
                    {'name': 'REST API Concepts', 'abbr': 'REST', 'status': 'actively_learning', 'desc': 'Stateless HTTP endpoints, JSON serialization, status codes, and client-server decoupling.'},
                ]
            },
            {
                'floor': 4,
                'name': 'Database Systems',
                'description': 'Structured data persistence, relational modeling, and query optimization.',
                'theme': 'Crystalline Data Chamber',
                'color': '#f59e0b',
                'skills': [
                    {'name': 'MySQL', 'abbr': 'MySQL', 'status': 'proficient', 'desc': 'Relational schema design, normalization, foreign key constraints, joins, and ACID transactions.'},
                    {'name': 'SQL', 'abbr': 'SQL', 'status': 'proficient', 'desc': 'Structured query language, complex filtering, indexing, and aggregate calculations.'},
                    {'name': 'DBMS Principles', 'abbr': 'DBMS', 'status': 'proficient', 'desc': 'Database management systems theory, entity-relationship diagrams, transactions, and integrity.'},
                    {'name': 'MongoDB', 'abbr': 'NoSQL', 'status': 'actively_learning', 'desc': 'Document-based collections, BSON storage, and unstructured schema flexibility.'},
                ]
            },
            {
                'floor': 5,
                'name': 'Core Computer Science Fundamentals',
                'description': 'The foundational pillars of computer science engineering taught at SSIT Tumakuru.',
                'theme': 'Library of First Principles',
                'color': '#8b5cf6',
                'skills': [
                    {'name': 'Object-Oriented Programming', 'abbr': 'OOP', 'status': 'proficient', 'desc': 'Encapsulation, inheritance, polymorphism, abstraction, and modular software architecture.'},
                    {'name': 'Data Structures & Algorithms', 'abbr': 'DSA', 'status': 'proficient', 'desc': 'Arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, and complexity analysis.'},
                    {'name': 'Computer Networks', 'abbr': 'CN', 'status': 'proficient', 'desc': 'OSI model, TCP/IP stack, routing, socket protocols, DNS, HTTP/HTTPS, and packet communication.'},
                    {'name': 'Operating Systems', 'abbr': 'OS', 'status': 'proficient', 'desc': 'Process scheduling, concurrency, multithreading, memory management, virtual memory, and file systems.'},
                ]
            },
            {
                'floor': 6,
                'name': 'Tools & Emerging Technologies',
                'description': 'Modern engineering toolchain and forward-looking exploration in AI and cloud systems.',
                'theme': 'Horizon Spire & Skydeck',
                'color': '#ec4899',
                'skills': [
                    {'name': 'Git & GitHub', 'abbr': 'Git', 'status': 'proficient', 'desc': 'Version control, branch management, pull requests, commit history, and team collaboration.'},
                    {'name': 'VS Code', 'abbr': 'IDE', 'status': 'proficient', 'desc': 'Integrated development workflow, debugging, extensions, and terminal integration.'},
                    {'name': 'NumPy & Pandas', 'abbr': 'Data', 'status': 'actively_learning', 'desc': 'Array mathematics, series, DataFrames, data cleaning, and numerical data processing.'},
                    {'name': 'AWS Cloud Fundamentals', 'abbr': 'AWS', 'status': 'actively_learning', 'desc': 'EC2 instances, S3 storage buckets, cloud compute principles, and managed services.'},
                    {'name': 'Artificial Intelligence & ML', 'abbr': 'AI/ML', 'status': 'interest', 'desc': 'Machine learning algorithms, deep learning neural networks, and AI-powered modern application design.'},
                    {'name': 'MERN Stack Exploration', 'abbr': 'MERN', 'status': 'interest', 'desc': 'Exploring MongoDB, Express, React, and Node.js for modern full-stack web architectures.'},
                ]
            }
        ],
        'projects': [
            {
                'id': 1,
                'title': 'AgroSense — Smart Farmer Crop Advisory System',
                'tagline': 'IoT-powered smart agriculture and automated irrigation advisory system with Django backend.',
                'location_tag': 'agrosense',
                'status': 'completed',
                'is_featured': True,
                'problem_statement': 'Traditional farming relies on manual guesswork for watering and climate observation, leading to water wastage, crop disease, and suboptimal yields due to unmonitored soil moisture and ambient conditions.',
                'solution': 'An integrated hardware-software ecosystem combining an ESP32 microcontroller with ambient environmental sensors and a central Django web platform. The system streams telemetry via MQTT, calculates irrigation necessity, and triggers automated water pump relays or allows manual farmer control through a web dashboard.',
                'contribution': 'Architected the Django web backend, data ingestion endpoints, sensor status visualization dashboard, pump relay state control logic, and hardware-cloud communication workflow.',
                'tech_stack': 'Django, Python, ESP32, MQTT, Soil Moisture Sensor, DHT22 (Temp & Humidity), LDR Light Sensor, Water Pump Relay',
                'architecture_notes': 'ESP32 reads soil moisture, temperature, and light sensors -> Publishes telemetry over MQTT -> Django backend ingests data and records time-series logs -> Web dashboard displays real-time status -> Automation rules trigger pump relay or notify farmer.',
                'live_url': 'https://agrosense-io-1.onrender.com/accounts/login/?next=/',
                'requires_login': True,
                'github_url': '',
            },
            {
                'id': 2,
                'title': 'LONGLINK — Private Communication & WebRTC Network',
                'tagline': 'Django-based private family communication network and real-time video interaction platform.',
                'location_tag': 'longlink',
                'status': 'in_development',
                'is_featured': True,
                'problem_statement': 'Commercial messaging and video calling platforms often lack privacy, host invasive advertising, or do not offer a unified private community space tailored for close-knit groups or family networks.',
                'solution': 'A dedicated communication platform built on Django and WebRTC providing peer-to-peer audio/video streaming, private text channels, authenticated rooms, and real-time state synchronization.',
                'contribution': 'Designing the Django application architecture, room authentication policies, WebRTC signaling protocol handlers, and responsive video layout.',
                'tech_stack': 'Python, Django, WebRTC, Django Channels, WebSockets, HTML5, CSS3, JavaScript',
                'architecture_notes': 'Clients authenticate via Django sessions -> Connect to Django Channels WebSocket for SDP offer/answer signaling -> Direct peer-to-peer WebRTC media stream established for low-latency video and audio.',
                'live_url': '',
                'requires_login': False,
                'github_url': '',
            },
            {
                'id': 3,
                'title': 'Formula 1 & Ferrari Telemetry Experience',
                'tagline': 'Interactive telemetry visualization and aerodynamic engineering simulation inspired by Scuderia Ferrari.',
                'location_tag': 'f1_experience',
                'status': 'concept',
                'is_featured': True,
                'problem_statement': 'Motorsport telemetry datasets are dense and multi-dimensional; understanding car telemetry (speed, throttle, brake, tire temperature, gear shifts) requires intuitive real-time visual representation.',
                'solution': 'A creative web application translating racing telemetry concepts into interactive visual gauges, track sector analysis, and responsive car dynamics simulations. Demonstrates passion for high-performance software and real-time data visualization.',
                'contribution': 'Conceptualization, telemetry mathematical model modeling, 3D visualization prototypes, and responsive telemetry dashboard interface.',
                'tech_stack': 'JavaScript, Three.js, CSS3 Animations, Data Visualization, Performance Engineering',
                'architecture_notes': 'Telemetry simulation stream -> Interpolation engine -> Synchronized track position, tachometer, G-force vectors, and tire wear indicators rendered at 60 FPS.',
                'live_url': '',
                'requires_login': False,
                'github_url': '',
            },
            {
                'id': 4,
                'title': 'Emerging Tech & AI Developer Lab',
                'tagline': 'Configurable research hub for upcoming full-stack applications, developer tools, and machine learning models.',
                'location_tag': 'future_lab',
                'status': 'concept',
                'is_featured': False,
                'problem_statement': 'Modern software engineering is rapidly evolving with generative AI, intelligent agents, and microservices.',
                'solution': 'An active experimental laboratory within the portfolio designed to house future projects including MERN stack applications, algorithmic visualizers, and intelligent assistant tools.',
                'contribution': 'Continuous research, rapid prototyping, and architecture design.',
                'tech_stack': 'Python, Django, NumPy, Pandas, React, Cloud Compute, AI/ML APIs',
                'architecture_notes': 'Modular container architecture ready to host new microservices, interactive demos, and research papers as they are developed.',
                'live_url': '',
                'requires_login': False,
                'github_url': '',
            }
        ],
        'achievements': [
            {
                'id': 1,
                'title': 'Smart Farmer Crop Advisory System (AgroSense)',
                'event_name': 'SSIT Tumakuru Hackathon',
                'award': '₹2,000 Cash Prize & Certificate of Merit',
                'date_achieved': 'Academic Year 2024–2025',
                'description': 'Awarded 1st/Top distinction and ₹2,000 cash prize with certificate for developing AgroSense — an end-to-end IoT and Django-powered smart crop advisory and automated irrigation system at Sri Siddhartha Institute of Technology.',
                'is_featured': True,
            }
        ],
        'certification': {
            'label': 'Certification',
            'title': 'Verified Technical Credential',
            'issuing_organization': 'Sri Siddhartha Institute of Technology / Verified Organization',
            'view_url': 'https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D',
            'description': 'Official certificate credential document viewable via FlipLink. Verify the complete certificate and credential details at the link below.',
        }
    }


@ensure_csrf_cookie
def index(request):
    """
    Main entry point rendering the full cinematic 3D portfolio of Mohammed Saalim.
    """
    default_data = get_default_portfolio_data()

    # Query database objects if they exist
    try:
        categories_qs = SkillCategory.objects.prefetch_related('skills').all()
        if categories_qs.exists():
            categories = []
            for cat in categories_qs:
                categories.append({
                    'floor': cat.floor_number,
                    'name': cat.name,
                    'description': cat.description,
                    'theme': cat.architectural_theme,
                    'color': cat.accent_color,
                    'skills': [
                        {
                            'name': s.name,
                            'abbr': s.abbreviation or s.name,
                            'status': s.status,
                            'desc': s.description,
                        } for s in cat.skills.all()
                    ]
                })
        else:
            categories = default_data['categories']
    except Exception:
        categories = default_data['categories']

    try:
        projects_qs = Project.objects.all()
        if projects_qs.exists():
            projects = []
            for p in projects_qs:
                projects.append({
                    'id': p.id,
                    'title': p.title,
                    'tagline': p.tagline,
                    'location_tag': p.location_tag,
                    'status': p.status,
                    'is_featured': p.is_featured,
                    'problem_statement': p.problem_statement,
                    'solution': p.solution,
                    'contribution': p.contribution,
                    'tech_stack': p.tech_stack,
                    'architecture_notes': p.architecture_notes,
                    'live_url': p.live_url,
                    'requires_login': p.requires_login,
                    'github_url': p.github_url,
                })
        else:
            projects = default_data['projects']
    except Exception:
        projects = default_data['projects']

    try:
        achievements_qs = Achievement.objects.filter(is_featured=True)
        if achievements_qs.exists():
            achievements = list(achievements_qs.values())
        else:
            achievements = default_data['achievements']
    except Exception:
        achievements = default_data['achievements']

    try:
        cert_obj = Certification.objects.filter(is_featured=True).first()
        if cert_obj:
            certification = {
                'label': cert_obj.label,
                'title': cert_obj.title,
                'issuing_organization': cert_obj.issuing_organization,
                'view_url': cert_obj.view_url,
                'description': cert_obj.description,
            }
        else:
            certification = default_data['certification']
    except Exception:
        certification = default_data['certification']

    contact_form = ContactForm()

    context = {
        'categories': categories,
        'projects': projects,
        'achievements': achievements,
        'certification': certification,
        'contact_form': contact_form,
        'world_data_json': json.dumps({
            'profile': default_data['profile'],
            'categories': categories,
            'projects': projects,
            'achievements': achievements,
            'certification': certification,
        }),
    }

    return render(request, 'portfolio/index.html', context)


@require_http_methods(["POST"])
def contact_submit(request):
    """
    Handles visitor contact message submission from the Contact Lighthouse.
    Validates server-side, checks honeypot, persists to DB, and returns JSON or redirect.
    """
    form = ContactForm(request.POST)
    is_ajax = request.headers.get('x-requested-with') == 'XMLHttpRequest' or 'application/json' in request.headers.get('Accept', '')

    if form.is_valid():
        contact_msg = form.save(commit=False)
        # Capture client IP and User-Agent safely
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            contact_msg.ip_address = x_forwarded_for.split(',')[0].strip()
        else:
            contact_msg.ip_address = request.META.get('REMOTE_ADDR')
        contact_msg.user_agent = request.META.get('HTTP_USER_AGENT', '')[:255]
        contact_msg.save()

        # Attempt to send email notification if configured
        try:
            if settings.EMAIL_HOST_USER and settings.CONTACT_RECIPIENT_EMAIL:
                send_mail(
                    subject=f"[Saalim's World Portfolio] {contact_msg.subject}",
                    message=f"Name: {contact_msg.name}\nEmail: {contact_msg.email}\n\nMessage:\n{contact_msg.message}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_RECIPIENT_EMAIL],
                    fail_silently=True,
                )
        except Exception:
            pass

        if is_ajax:
            return JsonResponse({
                'status': 'success',
                'message': f"Thank you, {contact_msg.name}! Your message has been received by Mohammed Saalim. I will get back to you shortly."
            })
        return render(request, 'portfolio/contact_success.html', {'message': contact_msg})
    else:
        errors = {field: [str(err) for err in errs] for field, errs in form.errors.items()}
        if is_ajax:
            return JsonResponse({
                'status': 'error',
                'errors': errors,
                'message': 'Please correct the highlighted form errors and try again.'
            }, status=400)
        return render(request, 'portfolio/contact_error.html', {'form': form, 'errors': errors}, status=400)


def api_world_data(request):
    """
    JSON API endpoint returning all world nodes, coordinates, skills, and projects.
    """
    data = get_default_portfolio_data()
    return JsonResponse(data)


def custom_404(request, exception=None):
    return render(request, 'portfolio/404.html', status=404)


def custom_500(request):
    return render(request, 'portfolio/500.html', status=500)
