/**
 * SAALIM'S WORLD — THREE.JS RENDERER MANAGEMENT
 */

(function() {
    window.WorldRenderer = {
        renderer: null,
        canvas: null,

        init: function(canvasElement) {
            this.canvas = canvasElement;
            const settings = window.WorldPerformance.getSettings();

            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance'
            });

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(settings.pixelRatio);

            // Tone mapping & color space for cinematic depth
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.1;
            this.renderer.outputEncoding = THREE.sRGBEncoding || 3001;

            // Shadows
            if (settings.shadows) {
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            } else {
                this.renderer.shadowMap.enabled = false;
            }

            window.addEventListener('resize', this.onResize.bind(this));
        },

        applyPerformancePreset: function(settings) {
            if (!this.renderer) return;
            this.renderer.setPixelRatio(settings.pixelRatio);
            this.renderer.shadowMap.enabled = settings.shadows;
        },

        onResize: function() {
            if (!this.renderer || !window.WorldCamera) return;
            const width = window.innerWidth;
            const height = window.innerHeight;

            window.WorldCamera.camera.aspect = width / height;
            window.WorldCamera.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        },

        render: function(scene, camera) {
            if (this.renderer && scene && camera) {
                this.renderer.render(scene, camera);
                window.WorldPerformance.updateFPS();
            }
        }
    };
})();
