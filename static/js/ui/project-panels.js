/**
 * SAALIM'S WORLD — INTERACTIVE PROJECT PANELS & DETAIL DRAWERS
 */

(function() {
    window.ProjectPanels = {
        overlay: null,

        init: function() {
            this.overlay = document.getElementById('panel-overlay');
            this.bindCloseButtons();
            this.bindTabSwitches();
        },

        openByTag: function(type, id) {
            if (!this.overlay) return;

            // Hide all panel content sections first
            document.querySelectorAll('.panel-content-section').forEach(sec => {
                sec.style.display = 'none';
            });

            let targetSectionId = null;

            if (type === 'gate') {
                targetSectionId = 'panel-intro-details';
            } else if (type.startsWith('home')) {
                targetSectionId = 'panel-about-details';
            } else if (type === 'tower_floor') {
                targetSectionId = 'panel-skills-details';
                // Switch to specific floor tab if id is e.g. 'floor-3'
                const floorNum = id.replace('floor-', '');
                this.switchSkillFloorTab(floorNum);
            } else if (type === 'project_agrosense') {
                targetSectionId = 'panel-agrosense-details';
            } else if (type === 'project_longlink') {
                targetSectionId = 'panel-longlink-details';
            } else if (type === 'project_f1') {
                targetSectionId = 'panel-f1-details';
            } else if (type === 'achievement_trophy') {
                targetSectionId = 'panel-achievement-details';
            } else if (type === 'certification_display') {
                targetSectionId = 'panel-certification-details';
            } else if (type === 'contact_terminal') {
                targetSectionId = 'panel-contact-details';
            }

            if (targetSectionId) {
                const sec = document.getElementById(targetSectionId);
                if (sec) sec.style.display = 'block';
            }

            this.overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        },

        close: function() {
            if (!this.overlay) return;
            this.overlay.classList.remove('open');
            document.body.style.overflow = '';
        },

        bindCloseButtons: function() {
            const closeBtns = document.querySelectorAll('.panel-close-btn, [data-panel-close]');
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => this.close());
            });

            // Close on clicking backdrop
            if (this.overlay) {
                this.overlay.addEventListener('click', (e) => {
                    if (e.target === this.overlay) {
                        this.close();
                    }
                });
            }

            // Close on Escape key
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.overlay && this.overlay.classList.contains('open')) {
                    this.close();
                }
            });
        },

        bindTabSwitches: function() {
            document.querySelectorAll('.drawer-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const parent = tab.closest('.drawer-tabs');
                    if (parent) {
                        parent.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');

                        const target = tab.getAttribute('data-tab-target');
                        if (target) {
                            const container = tab.closest('.panel-drawer');
                            container.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
                            const pane = container.querySelector(target);
                            if (pane) pane.style.display = 'block';
                        }
                    }
                });
            });
        },

        switchSkillFloorTab: function(floorNumber) {
            const tab = document.querySelector(`.drawer-tab[data-floor="${floorNumber}"]`);
            if (tab) {
                tab.click();
            }
        }
    };
})();
