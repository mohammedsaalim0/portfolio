/**
 * SAALIM'S WORLD — PROCEDURAL OCEAN & WATERFALL DYNAMICS
 */

(function() {
    window.WorldWater = {
        oceanMesh: null,
        waterfallMesh: null,
        foamParticles: null,

        init: function(scene) {
            this.buildOceanSea(scene);
            this.buildWaterfall(scene);
        },

        buildOceanSea: function(scene) {
            // Expansive Cloud-Ocean plane beneath the island
            const oceanGeo = new THREE.PlaneGeometry(600, 600, 48, 48);
            oceanGeo.rotateX(-Math.PI / 2);

            const oceanMat = new THREE.MeshStandardMaterial({
                color: 0x0284c7, // Vibrant azure blue ocean
                roughness: 0.1,
                metalness: 0.8,
                transparent: true,
                opacity: 0.75,
                flatShading: true
            });

            this.oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
            this.oceanMesh.position.set(0, -65, -20);
            scene.add(this.oceanMesh);
        },

        buildWaterfall: function(scene) {
            // Waterfall streaming off the western island cliff
            const fallGeo = new THREE.PlaneGeometry(8, 45, 12, 24);
            const fallMat = new THREE.MeshBasicMaterial({
                color: 0xe0f2fe,
                transparent: true,
                opacity: 0.85,
                side: THREE.DoubleSide
            });
            this.waterfallMesh = new THREE.Mesh(fallGeo, fallMat);
            this.waterfallMesh.position.set(-65, -15, -10);
            this.waterfallMesh.rotation.y = Math.PI / 2;
            scene.add(this.waterfallMesh);

            // Waterfall Foam Spray Particles at bottom
            const foamCount = 60;
            const foamGeo = new THREE.BufferGeometry();
            const positions = new Float32Array(foamCount * 3);
            for (let i = 0; i < foamCount * 3; i += 3) {
                positions[i] = -65 + (Math.random() - 0.5) * 16;
                positions[i + 1] = -40 + Math.random() * 8;
                positions[i + 2] = -10 + (Math.random() - 0.5) * 16;
            }
            foamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const foamMat = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 2.2,
                transparent: true,
                opacity: 0.8
            });
            this.foamParticles = new THREE.Points(foamGeo, foamMat);
            scene.add(this.foamParticles);
        },

        update: function(time) {
            // Animate Ocean Waves
            if (this.oceanMesh) {
                const pos = this.oceanMesh.geometry.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const u = pos.getX(i);
                    const v = pos.getZ(i);
                    const wave = Math.sin(u * 0.04 + time * 1.5) * Math.cos(v * 0.04 + time * 1.2) * 2.5;
                    pos.setY(i, wave);
                }
                pos.needsUpdate = true;
            }

            // Animate Waterfall Foam
            if (this.foamParticles) {
                const p = this.foamParticles.geometry.attributes.position;
                for (let i = 1; i < p.count * 3; i += 3) {
                    p.array[i] += Math.sin(time * 6 + i) * 0.1;
                }
                p.needsUpdate = true;
            }
        }
    };
})();
