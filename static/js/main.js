/**
 * SAALIM'S WORLD — MAIN APPLICATION ENTRY POINT & ENGINE LOOP
 * Mohammed Saalim's Cinematic 3D Developer Portfolio
 */

(function() {
    window.SaalimWorldApp = {
        clock: new THREE.Clock(),
        isInitialized: false,

        init: function() {
            // 1. Performance & Hardware Capability Detection
            if (window.WorldPerformance) {
                window.WorldPerformance.init();
            }

            const canvas = document.getElementById('webgl-canvas');
            if (!canvas || !window.WorldPerformance.isWebGLAvailable) {
                this.dismissLoader();
                return;
            }

            try {
                // 2. Initialize Three.js Systems
                const scene = window.WorldScene.init();
                const camera = window.WorldCamera.init();
                window.WorldRenderer.init(canvas);

                // 3. Build Island World & Locations
                window.WorldTerrain.init(scene);
                window.WorldWater.init(scene);
                window.WorldEnvironment.init(scene);
                window.WorldLocations.init(scene);
                window.WorldCharacter.init(scene);

                // 4. Initialize Controls, Scroll Progress & Raycasting
                window.WorldControls.init();
                window.WorldScrollStory.init();
                window.WorldInteractions.init();

                // 5. Sound & UI Controllers
                window.WorldSound.init();
                window.ProjectPanels.init();
                window.WorldContact.init();
                window.WorldNavigation.init();

                this.isInitialized = true;
                this.animateProgressLoader();

                // 6. Start Render Engine Loop
                this.loop();
            } catch (err) {
                console.error("3D World initialization error:", err);
                document.body.classList.add('no-webgl');
                this.dismissLoader();
            }
        },

        animateProgressLoader: function() {
            const bar = document.getElementById('loader-bar-fill');
            const status = document.getElementById('loader-status-text');
            const loader = document.getElementById('loading-screen');

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 25) + 15;
                if (progress > 100) progress = 100;

                if (bar) bar.style.width = `${progress}%`;
                if (status) {
                    if (progress < 40) status.textContent = 'Generating Floating Island & Terrain...';
                    else if (progress < 75) status.textContent = 'Constructing Skills Tower & AgroSense Station...';
                    else if (progress < 100) status.textContent = 'Harmonizing Atmospheric Skies & Lighting...';
                    else status.textContent = 'Welcome to Saalim\'s World!';
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        this.dismissLoader();
                    }, 400);
                }
            }, 80);
        },

        dismissLoader: function() {
            const loader = document.getElementById('loading-screen');
            if (loader) {
                loader.classList.add('loaded');
                setTimeout(() => loader.remove(), 800);
            }
        },

        loop: function() {
            requestAnimationFrame(this.loop.bind(this));

            const delta = this.clock.getDelta();
            const time = this.clock.getElapsedTime();

            if (!this.isInitialized) return;

            // System updates
            if (window.WorldWater) window.WorldWater.update(time);
            if (window.WorldEnvironment) window.WorldEnvironment.update(time);
            if (window.WorldLighting) window.WorldLighting.update(delta);
            if (window.WorldControls) window.WorldControls.update(delta);
            if (window.WorldScrollStory) window.WorldScrollStory.update(delta);
            if (window.WorldCamera) window.WorldCamera.update(delta);
            if (window.WorldCharacter) window.WorldCharacter.update(delta, time);
            if (window.WorldInteractions) window.WorldInteractions.update();

            // Render
            window.WorldRenderer.render(window.WorldScene.scene, window.WorldCamera.camera);
        }
    };

    // Bootstrap when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.SaalimWorldApp.init());
    } else {
        window.SaalimWorldApp.init();
    }
})();
