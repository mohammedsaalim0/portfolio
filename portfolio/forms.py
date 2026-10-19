from django import forms
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    """
    Contact form for the Contact Lighthouse.
    Includes invisible honeypot to trap automated spam bots.
    """
    # Honeypot field (hidden via CSS; bots will fill it, real humans will not)
    website = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'autocomplete': 'off',
            'tabindex': '-1',
            'class': 'hp-field',
            'aria-hidden': 'true',
        })
    )

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Your Name or Organization',
                'required': True,
                'maxlength': '120',
                'autocomplete': 'name',
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'your.email@example.com',
                'required': True,
                'autocomplete': 'email',
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Subject / Purpose of connection',
                'required': True,
                'maxlength': '200',
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-textarea',
                'placeholder': 'Write your message, collaboration idea, or opportunity here...',
                'rows': 5,
                'required': True,
            }),
        }

    def clean_website(self):
        """Honeypot validation: if filled, reject silently or flag as spam."""
        value = self.cleaned_data.get('website')
        if value:
            raise forms.ValidationError('Automated submission detected.')
        return value

    def clean_message(self):
        message = self.cleaned_data.get('message', '').strip()
        if len(message) < 10:
            raise forms.ValidationError('Please provide a message with at least 10 characters.')
        return message
