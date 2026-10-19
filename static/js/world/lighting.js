/**
 * SAALIM'S WORLD — CINEMATIC LIGHTING SYSTEM
 */

(function() {
    window.WorldLighting = {
        sunLight: null,
        ambientLight: null,
        hemiLight: null,
        lighthouseBeam: null,
        lanternLights: [],

        init: function(scene) {
            // 1. Ambient Light
            this.ambientLight = new THREE.AmbientLight(0xdbeafe, 0.45);
            scene.add(this.ambientLight);

            // 2. Hemisphere Light (Sky & Ground bounce)
            this.hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x166534, 0.5);
            this.hemiLight.position.set(0, 50, 0);
            scene.add(this.hemiLight);

            // 3. Directional Sun Light
            this.sunLight = new THREE.DirectionalLight(0xffedd5, 1.3);
            this.sunLight.position.set(60, 90, 50);
            this.sunLight.castShadow = true;
            this.sunLight.shadow.mapSize.width = 2048;
            this.sunLight.shadow.mapSize.height = 2048;
            this.sunLight.shadow.camera.near = 10;
            this.sunLight.shadow.camera.far = 300;
            this.sunLight.shadow.camera.left = -90;
            this.sunLight.shadow.camera.right = 90;
            this.sunLight.shadow.camera.top = 90;
            this.sunLight.shadow.camera.bottom = -90;
            this.sunLight.shadow.bias = -0.0005;
            scene.add(this.sunLight);

            // 4. Lighthouse Spotlight
            this.lighthouseBeam = new THREE.SpotLight(0xfef08a, 4.0, 180, Math.PI / 7, 0.35, 1.2);
            this.lighthouseBeam.position.set(0, 32, -115);
            this.lighthouseBeam.target.position.set(0, 10, -180);
            scene.add(this.lighthouseBeam);
            scene.add(this.lighthouseBeam.target);

            // Subtle Volumetric Cone Mesh for Lighthouse Beam
            const coneGeo = new THREE.ConeGeometry(22, 100, 24, 1, true);
            coneGeo.rotateX(-Math.PI / 2);
            coneGeo.translate(0, 0, -50);
            const coneMat = new THREE.MeshBasicMaterial({
                color: 0xfef08a,
                transparent: true,
                opacity: 0.18,
                side: THREE.DoubleSide,
                depthWrite: false
            });
            this.beamCone = new THREE.Mesh(coneGeo, coneMat);
            this.beamCone.position.copy(this.lighthouseBeam.position);
            scene.add(this.beamCone);
        },

        updateTimeOfDay: function(timeStr, t) {
            if (!this.sunLight || !this.ambientLight) return;

            // Smooth lighting color interpolation across island journey
            if (t < 0.25) {
                // Sunrise / Morning
                this.sunLight.color.setHex(0xfde68a);
                this.sunLight.intensity = 1.1 + t * 0.8;
                this.ambientLight.color.setHex(0xfef3c7);
                this.ambientLight.intensity = 0.45;
            } else if (t < 0.65) {
                // High Day / Emerald Island Noon
                this.sunLight.color.setHex(0xffffff);
                this.sunLight.intensity = 1.35;
                this.ambientLight.color.setHex(0xdbeafe);
                this.ambientLight.intensity = 0.5;
            } else if (t < 0.85) {
                // Golden Hour / Sunset
                this.sunLight.color.setHex(0xf97316);
                this.sunLight.intensity = 1.2;
                this.ambientLight.color.setHex(0xfde047);
                this.ambientLight.intensity = 0.4;
            } else {
                // Twilight / Blue Hour over Lighthouse
                this.sunLight.color.setHex(0x6366f1);
                this.sunLight.intensity = 0.6;
                this.ambientLight.color.setHex(0x1e1b4b);
                this.ambientLight.intensity = 0.35;
            }
        },

        update: function(delta) {
            // Rotate Lighthouse beam continuously
            if (this.lighthouseBeam && this.lighthouseBeam.target) {
                const angle = performance.now() * 0.001;
                const radius = 60;
                const tx = Math.sin(angle) * radius;
                const tz = -115 + Math.cos(angle) * radius;
                this.lighthouseBeam.target.position.set(tx, 15, tz);
                this.lighthouseBeam.target.updateMatrixWorld();

                if (this.beamCone) {
                    this.beamCone.lookAt(tx, 15, tz);
                }
            }
        }
    };
})();
