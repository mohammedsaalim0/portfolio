/**
 * SAALIM'S WORLD — RAYCASTING & 3D OBJECT INTERACTIONS
 */

(function() {
    window.WorldInteractions = {
        raycaster: new THREE.Raycaster(),
        mouse: new THREE.Vector2(-1000, -1000),
        hoveredObject: null,

        init: function() {
            window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
            window.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
        },

        onMouseMove: function(e) {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        },

        onTouchStart: function(e) {
            if (e.touches.length > 0) {
                this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            }
        },

        onClick: function(e) {
            // Avoid triggering when clicking existing UI overlays
            if (e.target.closest('.hud-header, .panel-drawer, .audio-widget, .toast-container, .scroll-compass, #intro-screen, #accessible-content')) {
                return;
            }

            if (!window.WorldCamera || !window.WorldCamera.camera || !window.WorldLocations) return;

            this.raycaster.setFromCamera(this.mouse, window.WorldCamera.camera);
            const intersects = this.raycaster.intersectObjects(window.WorldLocations.interactiveObjects, true);

            if (intersects.length > 0) {
                const hit = intersects[0].object;
                this.triggerInteraction(hit);
            }
        },

        triggerInteraction: function(mesh) {
            const data = mesh.userData;
            if (!data) return;

            // Trigger corresponding UI drawer
            if (window.ProjectPanels) {
                window.ProjectPanels.openByTag(data.type, data.id);
            }

            // Audio feedback chime
            if (window.WorldSound) {
                window.WorldSound.playChime();
            }
        },

        update: function() {
            if (!window.WorldCamera || !window.WorldCamera.camera || !window.WorldLocations) return;

            this.raycaster.setFromCamera(this.mouse, window.WorldCamera.camera);
            const intersects = this.raycaster.intersectObjects(window.WorldLocations.interactiveObjects, true);

            if (intersects.length > 0) {
                const hit = intersects[0].object;
                if (this.hoveredObject !== hit) {
                    this.hoveredObject = hit;
                    document.body.style.cursor = 'pointer';
                }
            } else {
                if (this.hoveredObject !== null) {
                    this.hoveredObject = null;
                    document.body.style.cursor = 'default';
                }
            }

            this.updatePOIScreenPositions();
        },

        updatePOIScreenPositions: function() {
            // Update 2D Screen-space POI Reticles
            const poiContainer = document.getElementById('poi-container');
            if (!poiContainer || !window.WorldCamera || !window.WorldCamera.camera) return;

            // Selected key interactive landmarks for floating badges
            const keyPOIs = [
                { id: 'gate', pos: new THREE.Vector3(0, 10, 50), label: 'Gate: Intro' },
                { id: 'home', pos: new THREE.Vector3(-35, 12, 15), label: 'Home: About Me' },
                { id: 'tower', pos: new THREE.Vector3(0, 35, -5), label: 'Skills Tower' },
                { id: 'agrosense', pos: new THREE.Vector3(30, 10, -35), label: 'AgroSense Farm' },
                { id: 'hall', pos: new THREE.Vector3(-35, 12, -55), label: 'Achievement Hall' },
                { id: 'lighthouse', pos: new THREE.Vector3(0, 24, -115), label: 'Contact Lighthouse' }
            ];

            const cam = window.WorldCamera.camera;

            keyPOIs.forEach(item => {
                let el = document.getElementById(`poi-${item.id}`);
                if (!el) return;

                const screenPos = item.pos.clone().project(cam);
                const isBehind = screenPos.z > 1.0;

                if (isBehind) {
                    el.style.display = 'none';
                } else {
                    el.style.display = 'flex';
                    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
                    const y = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                }
            });
        }
    };
})();
