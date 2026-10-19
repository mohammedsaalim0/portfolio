from django.contrib import admin
from .models import (
    ProfileConfig,
    SkillCategory,
    Skill,
    Project,
    Achievement,
    Certification,
    ContactMessage,
)


@admin.register(ProfileConfig)
class ProfileConfigAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'headline', 'email', 'phone', 'graduation_batch', 'updated_at')
    fieldsets = (
        ('Personal Details', {
            'fields': ('full_name', 'headline', 'bio', 'location', 'email', 'phone', 'linkjar_url')
        }),
        ('Academic Background', {
            'fields': ('education_degree', 'education_institution', 'education_location', 'graduation_batch', 'cgpa')
        }),
        ('Links & Documents', {
            'fields': ('certificate_url', 'linkedin_url', 'github_url', 'resume_file')
        }),
    )

    def has_add_permission(self, request):
        # Limit to 1 configuration instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ('name', 'abbreviation', 'status', 'order', 'icon_name', 'description')


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('floor_number', 'name', 'architectural_theme', 'accent_color')
    ordering = ('floor_number',)
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'category', 'status', 'order')
    list_filter = ('category', 'status')
    search_fields = ('name', 'abbreviation', 'description')
    ordering = ('category__floor_number', 'order', 'name')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'location_tag', 'status', 'is_featured', 'order', 'requires_login')
    list_filter = ('status', 'location_tag', 'is_featured')
    search_fields = ('title', 'tagline', 'tech_stack', 'problem_statement')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ('Overview', {
            'fields': ('title', 'slug', 'tagline', 'location_tag', 'status', 'is_featured', 'order', 'image')
        }),
        ('Deep Dive', {
            'fields': ('problem_statement', 'solution', 'contribution', 'tech_stack', 'architecture_notes')
        }),
        ('Links & Access', {
            'fields': ('live_url', 'requires_login', 'github_url')
        }),
    )


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_name', 'award', 'date_achieved', 'is_featured', 'order')
    list_filter = ('is_featured', 'event_name')
    search_fields = ('title', 'award', 'description')


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('label', 'title', 'issuing_organization', 'view_url', 'is_featured')
    search_fields = ('title', 'issuing_organization', 'view_url')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'submitted_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'submitted_at', 'ip_address', 'user_agent')
    ordering = ('-submitted_at',)
