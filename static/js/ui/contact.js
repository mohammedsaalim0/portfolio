/**
 * SAALIM'S WORLD — CONTACT FORM & AJAX HANDLER
 */

(function() {
    window.WorldContact = {
        init: function() {
            const form = document.getElementById('contact-form');
            if (!form) return;

            form.addEventListener('submit', this.handleSubmit.bind(this));
        },

        getCookie: function(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },

        handleSubmit: async function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('.btn-submit');
            const alertBox = form.querySelector('.form-alert');

            // Reset alert
            if (alertBox) {
                alertBox.className = 'form-alert';
                alertBox.style.display = 'none';
                alertBox.textContent = '';
            }

            // Client check
            const name = form.querySelector('[name="name"]').value.trim();
            const email = form.querySelector('[name="email"]').value.trim();
            const message = form.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) {
                this.showAlert(alertBox, 'error', 'Please fill out all required fields.');
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending Message...</span>';
            }

            const formData = new FormData(form);
            const csrfToken = this.getCookie('csrftoken') || form.querySelector('[name="csrfmiddlewaretoken"]').value;

            try {
                const response = await fetch('/contact/submit/', {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    this.showAlert(alertBox, 'success', data.message);
                    form.reset();
                    this.showToast('Message sent to Mohammed Saalim!');
                } else {
                    let errMsg = data.message || 'Error sending message. Please try again.';
                    if (data.errors) {
                        const errList = Object.values(data.errors).flat().join(' ');
                        if (errList) errMsg = errList;
                    }
                    this.showAlert(alertBox, 'error', errMsg);
                }
            } catch (err) {
                this.showAlert(alertBox, 'error', 'Network error. Please email directly at mohammedsaalimismil@gmail.com.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message to Saalim</span> <span aria-hidden="true">→</span>';
                }
            }
        },

        showAlert: function(box, type, text) {
            if (!box) return;
            box.className = `form-alert ${type}`;
            box.textContent = text;
            box.style.display = 'block';
        },

        showToast: function(text) {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<span style="color:#10b981;font-size:18px;">✓</span> <span>${text}</span>`;
            container.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 4500);
        }
    };
})();
