/**
 * SAALIM'S WORLD — PROCEDURAL VEGETATION, CLOUDS, LANTERNS & PARTICLES
 */

(function() {
    window.WorldEnvironment = {
        clouds: [],
        lanterns: [],
        fireflies: null,

        init: function(scene) {
            this.buildClouds(scene);
            this.buildTreesAndFoliage(scene);
            this.buildStoneLanterns(scene);
            this.buildFireflies(scene);
        },

        buildClouds: function(scene) {
            // Procedural low-poly cumulus clouds drifting around island
            const cloudGeo = new THREE.DodecahedronGeometry(12, 1);
            const cloudMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.9,
                transparent: true,
                opacity: 0.82,
                flatShading: true
            });

            const cloudData = [
                { x: -140, y: -10, z: 80, s: 1.8 },
                { x: 120, y: 15, z: 90, s: 1.5 },
                { x: -130, y: 25, z: -80, s: 2.2 },
                { x: 140, y: -5, z: -70, s: 2.0 },
                { x: 0, y: -25, z: 140, s: 2.5 },
                { x: -90, y: 35, z: 20, s: 1.4 },
                { x: 110, y: 40, z: -20, s: 1.6 },
            ];

            cloudData.forEach(d => {
                const group = new THREE.Group();
                for (let j = 0; j < 5; j++) {
                    const blob = new THREE.Mesh(cloudGeo, cloudMat);
                    blob.position.set(
                        (Math.random() - 0.5) * 16,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 16
                    );
                    blob.scale.setScalar(0.7 + Math.random() * 0.6);
                    group.add(blob);
                }
                group.position.set(d.x, d.y, d.z);
                group.scale.setScalar(d.s);
                scene.add(group);
                this.clouds.push(group);
            });
        },

        buildTreesAndFoliage: function(scene) {
            // Stylized Trees: Cedar Trunk + Layered Cone Foliage
            const trunkGeo = new THREE.CylinderGeometry(0.5, 0.8, 4, 8);
            const trunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });

            const foliageGeo = new THREE.ConeGeometry(3.5, 6, 8);
            const foliageMat = new THREE.MeshStandardMaterial({
                color: 0x166534, // Deep forest evergreen
                roughness: 0.8,
                flatShading: true
            });

            const treePositions = [
                [-12, 6, 52], [14, 6, 48], [-8, 6, 38], [16, 6, 34],
                [-42, 6, 12], [-22, 6, 14], [-38, 6, 32],
                [-18, 6, -10], [22, 6, 8], [34, 6, 14],
                [45, 6, -12], [42, 6, -45], [18, 6, -48],
                [-45, 6, -35], [-42, 6, -65], [-16, 6, -72], [16, 6, -75]
            ];

            treePositions.forEach(([tx, ty, tz]) => {
                const tree = new THREE.Group();
                const trunk = new THREE.Mesh(trunkGeo, trunkMat);
                trunk.position.y = 2;
                trunk.castShadow = true;
                trunk.receiveShadow = true;
                tree.add(trunk);

                const foliage1 = new THREE.Mesh(foliageGeo, foliageMat);
                foliage1.position.y = 5.5;
                foliage1.castShadow = true;
                tree.add(foliage1);

                const foliage2 = new THREE.Mesh(foliageGeo, foliageMat);
                foliage2.position.y = 7.5;
                foliage2.scale.set(0.75, 0.75, 0.75);
                foliage2.castShadow = true;
                tree.add(foliage2);

                tree.position.set(tx, ty, tz);
                const scale = 0.85 + Math.random() * 0.4;
                tree.scale.set(scale, scale, scale);
                scene.add(tree);
            });
        },

        buildStoneLanterns: function(scene) {
            // Japanese Garden Stone Lanterns with warm light along the path
            const baseGeo = new THREE.CylinderGeometry(0.8, 1.0, 1.4, 6);
            const stoneMat = new THREE.MeshStandardMaterial({ color: 0x71717a, roughness: 0.9 });
            const chamberGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
            const lanternGlowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
            const roofGeo = new THREE.ConeGeometry(1.6, 0.8, 6);

            const lanternCoords = [
                [-3, 6, 50], [3, 6, 50],
                [-20, 6, 26], [8, 6, 2],
                [18, 6, -24], [-20, 6, -46],
                [-4, 7, -92], [4, 7, -92]
            ];

            lanternCoords.forEach(([lx, ly, lz]) => {
                const lantern = new THREE.Group();
                const base = new THREE.Mesh(baseGeo, stoneMat);
                base.position.y = 0.7;
                lantern.add(base);

                const chamber = new THREE.Mesh(chamberGeo, lanternGlowMat);
                chamber.position.y = 1.8;
                lantern.add(chamber);

                const roof = new THREE.Mesh(roofGeo, stoneMat);
                roof.position.y = 2.7;
                lantern.add(roof);

                // Subtle warm point light
                const light = new THREE.PointLight(0xf59e0b, 1.2, 12, 1.5);
                light.position.y = 1.8;
                lantern.add(light);

                lantern.position.set(lx, ly, lz);
                scene.add(lantern);
                this.lanterns.push(lantern);
            });
        },

        buildFireflies: function(scene) {
            const count = 120;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);

            for (let i = 0; i < count * 3; i += 3) {
                pos[i] = (Math.random() - 0.5) * 120;
                pos[i + 1] = 6 + Math.random() * 18;
                pos[i + 2] = (Math.random() - 0.5) * 150 - 20;
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

            const mat = new THREE.PointsMaterial({
                color: 0x34d399,
                size: 1.8,
                transparent: true,
                opacity: 0.85
            });

            this.fireflies = new THREE.Points(geo, mat);
            scene.add(this.fireflies);
        },

        update: function(time) {
            // Slowly rotate and drift clouds
            this.clouds.forEach((cloud, idx) => {
                cloud.position.x += Math.sin(time * 0.1 + idx) * 0.04;
                cloud.rotation.y = time * 0.02 * (idx % 2 === 0 ? 1 : -1);
            });

            // Animate Firefly positions
            if (this.fireflies) {
                const p = this.fireflies.geometry.attributes.position;
                for (let i = 0; i < p.count * 3; i += 3) {
                    p.array[i + 1] += Math.sin(time * 2 + i) * 0.02;
                    p.array[i] += Math.cos(time * 1.5 + i) * 0.02;
                }
                p.needsUpdate = true;
            }
        }
    };
})();
