from django.test import TestCase, Client
from django.urls import reverse
from portfolio.models import ContactMessage, ProfileConfig, Project


class PortfolioViewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.index_url = reverse('portfolio:index')
        self.contact_url = reverse('portfolio:contact_submit')
        self.api_url = reverse('portfolio:api_world_data')

    def test_homepage_loads(self):
        """Test homepage renders successfully with HTTP 200"""
        response = self.client.get(self.index_url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Mohammed Saalim')
        self.assertContains(response, "Saalim's World")
        self.assertContains(response, "AgroSense")
        self.assertContains(response, "webgl-canvas")

    def test_api_world_data_endpoint(self):
        """Test API endpoint returns JSON data"""
        response = self.client.get(self.api_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/json')
        data = response.json()
        self.assertIn('profile', data)
        self.assertIn('categories', data)
        self.assertIn('projects', data)
        self.assertEqual(data['profile']['fullName'] if 'fullName' in data['profile'] else data['profile']['full_name'], 'Mohammed Saalim')

    def test_contact_submission_valid_ajax(self):
        """Test contact form handles valid AJAX submission"""
        payload = {
            'name': 'Ada Lovelace',
            'email': 'ada@example.com',
            'subject': 'Software Engineering Opportunity',
            'message': 'Hello Mohammed Saalim, impressed by your AgroSense project and 3D world!',
            'website': '',  # Honeypot empty
        }
        response = self.client.post(
            self.contact_url,
            data=payload,
            HTTP_X_REQUESTED_WITH='XMLHttpRequest'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('status'), 'success')
        self.assertTrue(ContactMessage.objects.filter(email='ada@example.com').exists())

    def test_contact_submission_honeypot_trap(self):
        """Test honeypot rejects automated bot submissions"""
        payload = {
            'name': 'Spam Bot 3000',
            'email': 'bot@spammer.org',
            'subject': 'Spam subject',
            'message': 'Automated advertising payload that should be rejected.',
            'website': 'http://spamsite.org',  # Honeypot filled by bot
        }
        response = self.client.post(
            self.contact_url,
            data=payload,
            HTTP_X_REQUESTED_WITH='XMLHttpRequest'
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(ContactMessage.objects.filter(email='bot@spammer.org').exists())
