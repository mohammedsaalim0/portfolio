/**
 * SAALIM'S WORLD — PROCEDURAL DEVELOPER AVATAR & ANIMATION SYSTEM
 */

(function() {
    window.WorldCharacter = {
        mesh: null,
        leftLeg: null,
        rightLeg: null,
        leftArm: null,
        rightArm: null,
        head: null,
        isMoving: false,
        moveSpeed: 18.0,
        rotationSpeed: 4.5,
        targetPos: new THREE.Vector3(0, 7.2, 50),

        init: function(scene) {
            this.buildAvatar(scene);
        },

        buildAvatar: function(scene) {
            this.mesh = new THREE.Group();

            // Materials
            const skinMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.7 });
            const clothMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 }); // Dark hoodie
            const accentMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.6 }); // Blue accent
            const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 });
            const shoeMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 }); // Tan boots
            const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });

            // 1. Torso & Hoodie
            const torso = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.8), clothMat);
            torso.position.y = 2.1;
            torso.castShadow = true;
            this.mesh.add(torso);

            // 2. Head & Hair
            this.head = new THREE.Group();
            this.head.position.y = 3.3;

            const face = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.8), skinMat);
            face.castShadow = true;
            this.head.add(face);

            const hair = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 0.9), hairMat);
            hair.position.set(0, 0.35, 0);
            this.head.add(hair);

            // Glasses
            const glassesMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.22, 0.1), glassesMat);
            glasses.position.set(0, 0.05, 0.42);
            this.head.add(glasses);

            this.mesh.add(this.head);

            // 3. Developer Backpack
            const packMat = new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.8 });
            const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.5), packMat);
            backpack.position.set(0, 2.1, -0.6);
            backpack.castShadow = true;
            this.mesh.add(backpack);

            // 4. Arms
            const armGeo = new THREE.BoxGeometry(0.35, 1.3, 0.35);
            this.leftArm = new THREE.Mesh(armGeo, clothMat);
            this.leftArm.position.set(-0.8, 2.1, 0);
            this.leftArm.castShadow = true;
            this.mesh.add(this.leftArm);

            this.rightArm = new THREE.Mesh(armGeo, clothMat);
            this.rightArm.position.set(0.8, 2.1, 0);
            this.rightArm.castShadow = true;
            this.mesh.add(this.rightArm);

            // 5. Legs & Boots
            const legGeo = new THREE.BoxGeometry(0.4, 1.4, 0.45);
            this.leftLeg = new THREE.Mesh(legGeo, pantsMat);
            this.leftLeg.position.set(-0.35, 0.7, 0);
            this.leftLeg.castShadow = true;
            this.mesh.add(this.leftLeg);

            this.rightLeg = new THREE.Mesh(legGeo, pantsMat);
            this.rightLeg.position.set(0.35, 0.7, 0);
            this.rightLeg.castShadow = true;
            this.mesh.add(this.rightLeg);

            // Initial Spawn Position near Entrance Gate
            this.mesh.position.set(0, 6.2, 50);
            this.mesh.scale.set(0.85, 0.85, 0.85);
            scene.add(this.mesh);
        },

        animateLimbCycle: function(time, speed) {
            if (!this.leftLeg || !this.rightLeg) return;

            if (this.isMoving) {
                // Natural walking stride
                const swing = Math.sin(time * 8 * speed) * 0.65;
                this.leftLeg.rotation.x = swing;
                this.rightLeg.rotation.x = -swing;
                this.leftArm.rotation.x = -swing * 0.8;
                this.rightArm.rotation.x = swing * 0.8;

                // Subtle hip bounce
                this.mesh.position.y = 6.2 + Math.abs(Math.sin(time * 8 * speed)) * 0.15;
            } else {
                // Peaceful Idle Breathing
                const breath = Math.sin(time * 2.5) * 0.05;
                this.leftLeg.rotation.x = 0;
                this.rightLeg.rotation.x = 0;
                this.leftArm.rotation.x = breath;
                this.rightArm.rotation.x = -breath;
                if (this.head) this.head.position.y = 3.3 + breath * 0.3;
            }
        },

        updateCinematicPosition: function(t) {
            if (!this.mesh) return;

            // Compute character position along the main island path from 0% to 100%
            const pathPoints = [
                { t: 0.00, pos: new THREE.Vector3(0, 6.2, 55) },
                { t: 0.15, pos: new THREE.Vector3(0, 6.2, 48) },
                { t: 0.32, pos: new THREE.Vector3(-28, 6.4, 18) },
                { t: 0.48, pos: new THREE.Vector3(2, 6.6, 5) },
                { t: 0.65, pos: new THREE.Vector3(28, 6.3, -30) },
                { t: 0.80, pos: new THREE.Vector3(-28, 6.6, -48) },
                { t: 1.00, pos: new THREE.Vector3(0, 7.0, -98) },
            ];

            let p1 = pathPoints[0];
            let p2 = pathPoints[pathPoints.length - 1];
            for (let i = 0; i < pathPoints.length - 1; i++) {
                if (t >= pathPoints[i].t && t <= pathPoints[i + 1].t) {
                    p1 = pathPoints[i];
                    p2 = pathPoints[i + 1];
                    break;
                }
            }

            const range = p2.t - p1.t;
            const factor = range > 0.0001 ? (t - p1.t) / range : 0;
            const ease = factor * factor * (3 - 2 * factor);

            const nextPos = new THREE.Vector3().lerpVectors(p1.pos, p2.pos, ease);
            const dist = nextPos.distanceTo(this.mesh.position);

            this.isMoving = dist > 0.05;

            // Orient character towards movement direction
            if (this.isMoving) {
                const dir = new THREE.Vector3().subVectors(nextPos, this.mesh.position).normalize();
                const targetRot = Math.atan2(dir.x, dir.z);
                this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, targetRot, 0.1);
            }

            this.mesh.position.lerp(nextPos, 0.15);
        },

        update: function(delta, time) {
            if (!this.mesh) return;
            this.animateLimbCycle(time, 1.0);
        }
    };
})();
