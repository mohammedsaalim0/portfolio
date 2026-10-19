/**
 * SAALIM'S WORLD — CINEMATIC CAMERA SYSTEM
 */

(function() {
    window.WorldCamera = {
        camera: null,
        currentPos: new THREE.Vector3(0, 75, 160),
        currentTarget: new THREE.Vector3(0, 15, 0),
        targetPos: new THREE.Vector3(0, 75, 160),
        targetLookAt: new THREE.Vector3(0, 15, 0),

        // Waypoint Spline Nodes
        waypoints: [
            { t: 0.00, pos: new THREE.Vector3(0, 85, 180), target: new THREE.Vector3(0, 15, 0) },
            { t: 0.15, pos: new THREE.Vector3(-4, 12, 75), target: new THREE.Vector3(0, 6, 45) },
            { t: 0.32, pos: new THREE.Vector3(-26, 14, 28), target: new THREE.Vector3(-35, 10, 12) },
            { t: 0.48, pos: new THREE.Vector3(22, 36, 18), target: new THREE.Vector3(0, 28, -5) },
            { t: 0.65, pos: new THREE.Vector3(42, 18, -25), target: new THREE.Vector3(28, 7, -38) },
            { t: 0.80, pos: new THREE.Vector3(-22, 16, -42), target: new THREE.Vector3(-34, 11, -54) },
            { t: 1.00, pos: new THREE.Vector3(8, 24, -88), target: new THREE.Vector3(0, 24, -115) },
        ],

        init: function() {
            const aspect = window.innerWidth / window.innerHeight;
            this.camera = new THREE.PerspectiveCamera(58, aspect, 0.5, 800);
            this.camera.position.copy(this.currentPos);
            this.camera.lookAt(this.currentTarget);
            return this.camera;
        },

        setScrollProgress: function(progress) {
            // Clamp progress between 0 and 1
            const p = Math.max(0, Math.min(1, progress));

            // Find surrounding waypoint segments
            let p1 = this.waypoints[0];
            let p2 = this.waypoints[this.waypoints.length - 1];

            for (let i = 0; i < this.waypoints.length - 1; i++) {
                if (p >= this.waypoints[i].t && p <= this.waypoints[i + 1].t) {
                    p1 = this.waypoints[i];
                    p2 = this.waypoints[i + 1];
                    break;
                }
            }

            const range = p2.t - p1.t;
            const factor = range > 0.0001 ? (p - p1.t) / range : 0;
            // Smooth easing (smoothstep)
            const ease = factor * factor * (3 - 2 * factor);

            this.targetPos.lerpVectors(p1.pos, p2.pos, ease);
            this.targetLookAt.lerpVectors(p1.target, p2.target, ease);
        },

        update: function(delta) {
            if (!this.camera) return;

            if (document.body.getAttribute('data-mode') === 'explore') {
                // In explore mode, camera follows character smoothly
                if (window.WorldCharacter && window.WorldCharacter.mesh) {
                    const charPos = window.WorldCharacter.mesh.position;
                    const offset = new THREE.Vector3(0, 5, 12);
                    this.targetPos.copy(charPos).add(offset);
                    this.targetLookAt.copy(charPos).add(new THREE.Vector3(0, 2, 0));
                }
            }

            // Smooth camera lerp
            this.currentPos.lerp(this.targetPos, 0.06);
            this.currentTarget.lerp(this.targetLookAt, 0.06);

            this.camera.position.copy(this.currentPos);
            this.camera.lookAt(this.currentTarget);
        }
    };
})();
