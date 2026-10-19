/**
 * SAALIM'S WORLD — PERFORMANCE & CAPABILITY DETECTION
 */

(function() {
    window.WorldPerformance = {
        currentPreset: 'high',
        isWebGLAvailable: true,
        fps: 60,
        frameCount: 0,
        lastTime: performance.now(),

        init: function() {
            this.detectWebGL();
            this.detectDeviceTier();
            this.initQualitySelector();
        },

        detectWebGL: function() {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) {
                    this.isWebGLAvailable = false;
                    document.body.classList.add('no-webgl');
                }
            } catch (e) {
                this.isWebGLAvailable = false;
                document.body.classList.add('no-webgl');
            }
        },

        detectDeviceTier: function() {
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const hardwareConcurrency = navigator.hardwareConcurrency || 4;
            const isLowEnd = hardwareConcurrency < 4 || (isMobile && window.innerWidth < 768);

            if (isLowEnd) {
                this.currentPreset = 'medium';
            } else {
                this.currentPreset = 'high';
            }
        },

        getSettings: function() {
            return window.SAALIM_CONFIG.performance[this.currentPreset] || window.SAALIM_CONFIG.performance.high;
        },

        initQualitySelector: function() {
            const btn = document.getElementById('quality-toggle-btn');
            if (!btn) return;

            const tiers = ['high', 'medium', 'low'];
            btn.addEventListener('click', () => {
                let nextIdx = (tiers.indexOf(this.currentPreset) + 1) % tiers.length;
                this.currentPreset = tiers[nextIdx];
                btn.textContent = `Quality: ${this.currentPreset.toUpperCase()}`;
                if (window.WorldRenderer) {
                    window.WorldRenderer.applyPerformancePreset(this.getSettings());
                }
            });
        },

        updateFPS: function() {
            this.frameCount++;
            const now = performance.now();
            if (now - this.lastTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastTime = now;
            }
        }
    };
})();
