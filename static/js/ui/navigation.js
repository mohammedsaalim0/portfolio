/**
 * SAALIM'S WORLD — NAVIGATION, RECRUITER MODE & SHORTCUTS
 */

(function() {
    window.WorldNavigation = {
        init: function() {
            this.bindRecruiterModeToggle();
            this.bindSkipIntro();
            this.bindKeyboardShortcuts();
        },

        bindRecruiterModeToggle: function() {
            const recruiterBtn = document.getElementById('recruiter-mode-btn');
            if (!recruiterBtn) return;

            recruiterBtn.addEventListener('click', () => {
                const current = document.body.getAttribute('data-mode');
                if (current === 'recruiter') {
                    document.body.setAttribute('data-mode', 'cinematic');
                    recruiterBtn.querySelector('.hud-btn-text').textContent = 'Recruiter Mode';
                } else {
                    document.body.setAttribute('data-mode', 'recruiter');
                    recruiterBtn.querySelector('.hud-btn-text').textContent = 'Exit Recruiter Mode';
                    // Scroll to top of recruiter content
                    const recContent = document.getElementById('accessible-content');
                    if (recContent) {
                        recContent.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        },

        bindSkipIntro: function() {
            const skipBtn = document.getElementById('skip-intro-btn');
            const exploreBtn = document.getElementById('explore-intro-btn');
            const viewProjectsBtn = document.getElementById('view-projects-intro-btn');

            if (skipBtn) {
                skipBtn.addEventListener('click', () => {
                    if (window.WorldScrollStory) {
                        window.WorldScrollStory.scrollToSection('gate');
                    }
                });
            }

            if (exploreBtn) {
                exploreBtn.addEventListener('click', () => {
                    if (window.WorldScrollStory) {
                        window.WorldScrollStory.scrollToSection('gate');
                    }
                });
            }

            if (viewProjectsBtn) {
                viewProjectsBtn.addEventListener('click', () => {
                    if (window.WorldScrollStory) {
                        window.WorldScrollStory.scrollToSection('valley');
                    }
                });
            }
        },

        bindKeyboardShortcuts: function() {
            window.addEventListener('keydown', (e) => {
                // If user is typing in form, don't trigger shortcuts
                if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

                switch (e.key) {
                    case 'm':
                    case 'M':
                        if (window.WorldSound) window.WorldSound.toggleMute();
                        break;
                    case 'r':
                    case 'R':
                        const recBtn = document.getElementById('recruiter-mode-btn');
                        if (recBtn) recBtn.click();
                        break;
                    case 'e':
                    case 'E':
                        const expBtn = document.getElementById('explore-mode-btn');
                        if (expBtn) expBtn.click();
                        break;
                    case '1':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('intro');
                        break;
                    case '2':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('gate');
                        break;
                    case '3':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('home');
                        break;
                    case '4':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('tower');
                        break;
                    case '5':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('valley');
                        break;
                    case '6':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('hall');
                        break;
                    case '7':
                        if (window.WorldScrollStory) window.WorldScrollStory.scrollToSection('lighthouse');
                        break;
                }
            });
        }
    };
})();
