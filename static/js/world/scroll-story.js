/**
 * SAALIM'S WORLD — SCROLL-DRIVEN CINEMATIC STORYTELLER
 */

(function() {
    window.WorldScrollStory = {
        scrollContainer: null,
        currentProgress: 0,
        targetProgress: 0,
        currentLocationId: 'intro',

        sections: [
            { id: 'intro', label: 'Floating Island Reveal', range: [0.00, 0.12] },
            { id: 'gate', label: 'Entrance Gate', range: [0.12, 0.26] },
            { id: 'home', label: 'Developer Home', range: [0.26, 0.42] },
            { id: 'tower', label: 'The Skills Tower', range: [0.42, 0.58] },
            { id: 'valley', label: 'Project Valley (AgroSense)', range: [0.58, 0.74] },
            { id: 'hall', label: 'The Achievement Hall', range: [0.74, 0.88] },
            { id: 'lighthouse', label: 'Contact Lighthouse', range: [0.88, 1.00] }
        ],

        init: function() {
            this.scrollContainer = document.getElementById('story-scroll-container');
            window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
            this.bindNavigationClicks();
            this.onScroll();
        },

        onScroll: function() {
            if (document.body.getAttribute('data-mode') === 'explore') return;

            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.targetProgress = Math.min(1.0, Math.max(0.0, scrollTop / docHeight));

            // Intro Screen auto-fade
            const introScreen = document.getElementById('intro-screen');
            if (introScreen) {
                if (this.targetProgress > 0.05) {
                    introScreen.classList.add('hidden');
                } else {
                    introScreen.classList.remove('hidden');
                }
            }
        },

        update: function(delta) {
            // Smooth lerp for scroll progress to absorb scroll wheel jitter
            this.currentProgress = THREE.MathUtils.lerp(this.currentProgress, this.targetProgress, 0.08);

            // Feed progress to World systems
            if (window.WorldCamera) {
                window.WorldCamera.setScrollProgress(this.currentProgress);
            }
            if (window.WorldCharacter) {
                window.WorldCharacter.updateCinematicPosition(this.currentProgress);
            }
            if (window.WorldScene) {
                window.WorldScene.updateSky(this.currentProgress);
            }
            if (window.WorldLighting) {
                window.WorldLighting.updateTimeOfDay(this.currentLocationId, this.currentProgress);
            }

            this.updateHUDIndicators();
        },

        updateHUDIndicators: function() {
            // Find active location section
            let active = this.sections[0];
            for (let i = 0; i < this.sections.length; i++) {
                if (this.currentProgress >= this.sections[i].range[0] && this.currentProgress <= this.sections[i].range[1]) {
                    active = this.sections[i];
                    break;
                }
            }

            if (active.id !== this.currentLocationId) {
                this.currentLocationId = active.id;
                this.highlightNavPill(active.id);
            }

            // Update Compass Bar and Label
            const compassBar = document.getElementById('compass-bar-fill');
            const compassLabel = document.getElementById('compass-location-text');
            if (compassBar) {
                compassBar.style.width = `${(this.currentProgress * 100).toFixed(1)}%`;
            }
            if (compassLabel) {
                compassLabel.textContent = active.label;
            }
        },

        highlightNavPill: function(id) {
            const pills = document.querySelectorAll('.nav-pill');
            pills.forEach(pill => {
                if (pill.getAttribute('data-target') === id) {
                    pill.classList.add('active');
                } else {
                    pill.classList.remove('active');
                }
            });
        },

        scrollToSection: function(targetId) {
            const sec = this.sections.find(s => s.id === targetId);
            if (!sec) return;

            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const mid = (sec.range[0] + sec.range[1]) / 2;
            const targetY = mid * docHeight;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        },

        bindNavigationClicks: function() {
            document.querySelectorAll('[data-target]').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = el.getAttribute('data-target');
                    if (target) {
                        this.scrollToSection(target);
                    }
                });
            });
        }
    };
})();
