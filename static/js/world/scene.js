/**
 * SAALIM'S WORLD — SCENE & ATMOSPHERIC FOG
 */

(function() {
    window.WorldScene = {
        scene: null,
        fog: null,

        init: function() {
            this.scene = new THREE.Scene();

            // Atmospheric Fog with soft blue-grey horizon
            this.scene.background = new THREE.Color(0x93c5fd);
            this.fog = new THREE.FogExp2(0x93c5fd, 0.0055);
            this.scene.fog = this.fog;

            // Initialize Lighting inside Scene
            if (window.WorldLighting) {
                window.WorldLighting.init(this.scene);
            }

            return this.scene;
        },

        updateSky: function(t) {
            if (!this.scene || !this.fog) return;

            // Interpolate sky & fog color based on progress t
            let targetColor = new THREE.Color();
            if (t < 0.25) {
                // Sunrise
                targetColor.setHex(0xfbbf24);
            } else if (t < 0.65) {
                // Daytime blue sky
                targetColor.setHex(0x7dd3fc);
            } else if (t < 0.85) {
                // Sunset
                targetColor.setHex(0xf97316);
            } else {
                // Twilight / Blue hour
                targetColor.setHex(0x0f172a);
            }

            this.scene.background.lerp(targetColor, 0.05);
            this.fog.color.lerp(targetColor, 0.05);
        }
    };
})();
