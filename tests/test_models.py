from django.test import TestCase
from portfolio.models import (
    ProfileConfig,
    SkillCategory,
    Skill,
    Project,
    Achievement,
    Certification,
)


class PortfolioModelsTestCase(TestCase):
    def test_profile_creation(self):
        profile = ProfileConfig.objects.create(
            full_name='Mohammed Saalim',
            email='mohammedsaalimismil@gmail.com',
            graduation_batch='2027',
            cgpa='7.44'
        )
        self.assertEqual(str(profile), 'Profile - Mohammed Saalim')
        self.assertEqual(profile.cgpa, '7.44')

    def test_skills_and_categories(self):
        cat = SkillCategory.objects.create(
            floor_number=1,
            name='Programming Languages',
            description='Core Languages'
        )
        skill = Skill.objects.create(
            category=cat,
            name='Python',
            abbreviation='Python',
            description='Core language for Django',
            status='proficient'
        )
        self.assertEqual(str(cat), 'Floor 1: Programming Languages')
        self.assertEqual(str(skill), 'Python (Programming Languages)')

    def test_project_tech_list(self):
        proj = Project.objects.create(
            title='AgroSense',
            tagline='Smart Agriculture',
            problem_statement='Water management',
            solution='ESP32 & Django automation',
            tech_stack='Django, Python, ESP32, MQTT'
        )
        techs = proj.tech_list()
        self.assertEqual(len(techs), 4)
        self.assertIn('Django', techs)
        self.assertIn('ESP32', techs)

    def test_certification_view_url(self):
        cert = Certification.objects.create(
            label='Certification',
            title='Verified Technical Credential',
            view_url='https://go.fliplink.me/view/B181FFD7-3226-4F09-AD1F-E0EADCC2946D'
        )
        self.assertTrue(cert.view_url.startswith('https://go.fliplink.me/'))
