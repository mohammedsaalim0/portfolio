"""
Context processors for portfolio application.
Injects verified personal profile data and configuration into all template contexts.
"""
from django.conf import settings


def portfolio_profile(request):
    """
    Returns verified personal profile information for Mohammed Saalim.
    Can be overridden or enhanced via database ProfileConfig if present.
    """
    profile = {
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
        'cgpa_note': 'Latest reported academic milestone (2027 batch)',
        'certificate_url': 'https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D',
        'linkedin_url': '',  # Configurable placeholder
        'github_url': '',    # Configurable placeholder
        'resume_url': '',    # Configurable placeholder
        'agrosense_live_url': 'https://agrosense-io-1.onrender.com/accounts/login/?next=/',
        'hackathon_achievement': {
            'title': 'Smart Farmer Crop Advisory System (AgroSense)',
            'event': 'SSIT Tumakuru Hackathon',
            'prize': '₹2,000 Cash Prize & Certificate',
            'summary': 'Awarded for an IoT and Django-powered agricultural advisory system with automated sensor-based irrigation and soil monitoring.',
        },
        'f1_interest': {
            'title': 'Formula 1 & Scuderia Ferrari Engineering Interest',
            'summary': 'Personal enthusiasm for aerodynamics, real-time vehicle telemetry, low-latency telemetry pipelines, and computational performance.',
        }
    }

    # Attempt to load from database if models exist and table is ready
    try:
        from portfolio.models import ProfileConfig
        db_profile = ProfileConfig.objects.first()
        if db_profile:
            profile.update({
                'full_name': db_profile.full_name or profile['full_name'],
                'headline': db_profile.headline or profile['headline'],
                'location': db_profile.location or profile['location'],
                'email': db_profile.email or profile['email'],
                'phone': db_profile.phone or profile['phone'],
                'linkjar_url': db_profile.linkjar_url or profile['linkjar_url'],
                'education_degree': db_profile.education_degree or profile['education_degree'],
                'education_institution': db_profile.education_institution or profile['education_institution'],
                'graduation_batch': db_profile.graduation_batch or profile['graduation_batch'],
                'cgpa': db_profile.cgpa or profile['cgpa'],
                'certificate_url': db_profile.certificate_url or profile['certificate_url'],
                'linkedin_url': db_profile.linkedin_url or profile['linkedin_url'],
                'github_url': db_profile.github_url or profile['github_url'],
                'resume_url': db_profile.resume_file.url if db_profile.resume_file else profile['resume_url'],
            })
    except Exception:
        # Before migrations are applied or in test environment, use defaults
        pass

    return {'portfolio_profile': profile}
