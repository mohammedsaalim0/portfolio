from django.db import models
from django.utils.text import slugify


class ProfileConfig(models.Model):
    """
    Central editable profile configuration for Mohammed Saalim.
    Allows easy customization through Django admin without modifying code.
    """
    full_name = models.CharField(max_length=120, default='Mohammed Saalim')
    headline = models.CharField(
        max_length=255, 
        default='Aspiring Full-Stack Developer | Computer Science Engineer'
    )
    bio = models.TextField(
        default="Computer Science and Engineering student at SSIT Tumakuru (Batch 2027). Building strong software engineering fundamentals, developing full-stack web applications with Python & Django, and exploring AI and interactive systems."
    )
    location = models.CharField(max_length=150, default='Tumakuru, Karnataka, India — 572101')
    email = models.EmailField(default='mohammedsaalimismil@gmail.com')
    phone = models.CharField(max_length=30, default='+91 7975685763')
    linkjar_url = models.URLField(default='https://linkjar.to/149abba4/')
    
    # Academic Details
    education_degree = models.CharField(max_length=150, default='B.E. in Computer Science and Engineering')
    education_institution = models.CharField(max_length=200, default='Sri Siddhartha Institute of Technology (SSIT)')
    education_location = models.CharField(max_length=150, default='Tumakuru, Karnataka, India')
    graduation_batch = models.CharField(max_length=20, default='2027')
    cgpa = models.CharField(max_length=20, default='7.44', help_text='Latest reported academic milestone')
    
    # External Links & Placeholders
    certificate_url = models.URLField(
        default='https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D',
        help_text='Official verification link for certificate'
    )
    linkedin_url = models.URLField(blank=True, default='', help_text='Configurable LinkedIn profile URL')
    github_url = models.URLField(blank=True, default='', help_text='Configurable GitHub profile URL')
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True, help_text='Optional resume PDF')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Profile Configuration'
        verbose_name_plural = 'Profile Configuration'

    def __str__(self):
        return f"Profile - {self.full_name}"


class SkillCategory(models.Model):
    """
    Skill category mapped to a specific floor of the 3D Skills Tower.
    """
    FLOOR_CHOICES = [
        (1, 'Floor 1 — Programming Languages'),
        (2, 'Floor 2 — Frontend Engineering'),
        (3, 'Floor 3 — Backend Engineering'),
        (4, 'Floor 4 — Database Systems'),
        (5, 'Floor 5 — Core Computer Science Fundamentals'),
        (6, 'Floor 6 — Tools & Emerging Technologies'),
    ]

    floor_number = models.PositiveSmallIntegerField(unique=True, choices=FLOOR_CHOICES)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(help_text='Description of this technical domain')
    architectural_theme = models.CharField(max_length=100, default='Warm Stone & Wood', help_text='3D room visual style')
    accent_color = models.CharField(max_length=30, default='#10b981', help_text='Hex color for lighting and UI')

    class Meta:
        verbose_name = 'Skills Tower Floor'
        verbose_name_plural = 'Skills Tower Floors'
        ordering = ['floor_number']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Floor {self.floor_number}: {self.name}"


class Skill(models.Model):
    """
    Individual technical skill with truthful classification.
    """
    STATUS_CHOICES = [
        ('proficient', 'Proficient / Hands-on'),
        ('actively_learning', 'Actively Learning'),
        ('interest', 'Future / Emerging Interest'),
    ]

    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=30, blank=True, help_text='e.g., DSA, CN, OOP, DBMS')
    description = models.TextField(help_text='Practical understanding and application')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='proficient')
    order = models.PositiveIntegerField(default=0)
    icon_name = models.CharField(max_length=50, default='code', help_text='CSS/SVG icon identifier')

    class Meta:
        verbose_name = 'Technical Skill'
        verbose_name_plural = 'Technical Skills'
        ordering = ['category__floor_number', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Project(models.Model):
    """
    Portfolio project showcased in the Project Valley.
    """
    STATUS_CHOICES = [
        ('completed', 'Working / Functional Project'),
        ('in_development', 'In Development / Experimental'),
        ('concept', 'Architectural Concept / Exploration'),
    ]

    LOCATION_TAG_CHOICES = [
        ('agrosense', 'AgroSense Smart Agriculture Station'),
        ('longlink', 'LONGLINK Communication Observatory'),
        ('f1_experience', 'Formula 1 & Ferrari Engineering Circuit'),
        ('future_lab', 'Emerging Tech & AI Research Pavilion'),
    ]

    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    tagline = models.CharField(max_length=255)
    location_tag = models.CharField(max_length=50, choices=LOCATION_TAG_CHOICES, default='future_lab')
    
    problem_statement = models.TextField()
    solution = models.TextField()
    contribution = models.TextField(blank=True, help_text="Mohammed Saalim's specific role & contribution")
    tech_stack = models.CharField(max_length=255, help_text='Comma-separated tech tags')
    architecture_notes = models.TextField(blank=True, help_text='Architecture & workflow explanation')

    live_url = models.URLField(blank=True, help_text='Live demo URL')
    requires_login = models.BooleanField(default=False, help_text='State honestly if credentials are required')
    github_url = models.URLField(blank=True, help_text='GitHub repository URL (placeholder if private)')
    
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='completed')
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    
    image = models.ImageField(upload_to='project-images/', blank=True, null=True)

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        ordering = ['order', 'title']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]

    def __str__(self):
        return self.title


class Achievement(models.Model):
    """
    Authentic hackathon and academic milestones in the Achievement Hall.
    """
    title = models.CharField(max_length=200)
    event_name = models.CharField(max_length=200, default='SSIT Tumakuru Hackathon')
    award = models.CharField(max_length=150, default='₹2,000 Cash Prize & Certificate')
    date_achieved = models.CharField(max_length=50, default='Academic Year 2024–2025')
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True, related_name='achievements')
    description = models.TextField()
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Achievement'
        verbose_name_plural = 'Achievements'
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.title} — {self.award}"


class Certification(models.Model):
    """
    Official certification record displayed in the Achievement Hall.
    """
    label = models.CharField(max_length=100, default='Certification')
    title = models.CharField(max_length=200, default='Verified Technical Credential')
    issuing_organization = models.CharField(max_length=200, default='Verified Organization')
    view_url = models.URLField(
        default='https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D',
        help_text='Direct Fliplink viewing link'
    )
    description = models.TextField(
        default='Official credential verified via FlipLink. Click below to view the verified credential document.',
        blank=True
    )
    certificate_image = models.ImageField(upload_to='certificates/', blank=True, null=True)
    is_featured = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Certification'
        verbose_name_plural = 'Certifications'

    def __str__(self):
        return f"{self.label}: {self.title}"


class ContactMessage(models.Model):
    """
    Visitor contact submissions received through the Contact Lighthouse.
    Protected with CSRF, server-side validation, and honeypot anti-spam.
    """
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email}) - {self.subject}"
