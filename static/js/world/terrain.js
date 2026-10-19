/**
 * SAALIM'S WORLD — PROCEDURAL FLOATING ISLAND & PATHWAYS
 */

(function() {
    window.WorldTerrain = {
        islandMesh: null,
        islandUnderMesh: null,
        pathMesh: null,

        init: function(scene) {
            this.buildFloatingIsland(scene);
            this.buildCobblestonePath(scene);
            this.buildBridgesAndCliffs(scene);
        },

        buildFloatingIsland: function(scene) {
            // Main Top Plateau (Lush Green Grass)
            const topGeo = new THREE.CylinderGeometry(85, 78, 12, 48, 4);
            const pos = topGeo.attributes.position;
            // Add organic mountain deformation to vertex coordinates
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const z = pos.getZ(i);
                if (y > 4) {
                    // Plateau height modulation
                    const heightNoise = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 3.5;
                    pos.setY(i, y + heightNoise);
                }
            }
            topGeo.computeVertexNormals();

            const topMat = new THREE.MeshStandardMaterial({
                color: 0x15803d, // Lush Emerald Ghibli green
                roughness: 0.85,
                metalness: 0.05,
                flatShading: true
            });
            this.islandMesh = new THREE.Mesh(topGeo, topMat);
            this.islandMesh.position.set(0, 0, -20);
            this.islandMesh.receiveShadow = true;
            scene.add(this.islandMesh);

            // Underside Crags (Rocky inverted mountain peak floating above clouds)
            const underGeo = new THREE.ConeGeometry(80, 70, 36, 6);
            underGeo.rotateX(Math.PI);
            const underPos = underGeo.attributes.position;
            for (let i = 0; i < underPos.count; i++) {
                const x = underPos.getX(i);
                const y = underPos.getY(i);
                const z = underPos.getZ(i);
                const crag = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 6;
                underPos.setX(i, x + crag);
                underPos.setZ(i, z + crag);
            }
            underGeo.computeVertexNormals();

            const underMat = new THREE.MeshStandardMaterial({
                color: 0x3f3f46, // Slate stone
                roughness: 0.95,
                metalness: 0.1,
                flatShading: true
            });
            this.islandUnderMesh = new THREE.Mesh(underGeo, underMat);
            this.islandUnderMesh.position.set(0, -38, -20);
            this.islandUnderMesh.receiveShadow = true;
            scene.add(this.islandUnderMesh);
        },

        buildCobblestonePath: function(scene) {
            // Path Curve linking all 6 locations smoothly
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 6.2, 55),    // Gate
                new THREE.Vector3(-15, 6.2, 35),  // Approach to Home
                new THREE.Vector3(-30, 6.4, 18),  // Developer Home
                new THREE.Vector3(-10, 6.5, 0),   // Crossroads
                new THREE.Vector3(2, 6.6, 5),     // Skills Tower Base
                new THREE.Vector3(15, 6.4, -15),  // Valley Approach
                new THREE.Vector3(28, 6.3, -32),  // AgroSense Farm
                new THREE.Vector3(10, 6.4, -40),  // Valley Bridge
                new THREE.Vector3(-25, 6.6, -48), // Achievement Hall
                new THREE.Vector3(-8, 6.8, -75),  // Lighthouse Causeway
                new THREE.Vector3(0, 7.0, -100)   // Contact Lighthouse
            ]);

            const pathGeo = new THREE.TubeGeometry(curve, 90, 2.2, 8, false);
            const pathMat = new THREE.MeshStandardMaterial({
                color: 0xd6d3d1, // Warm natural cobblestone
                roughness: 0.9,
                metalness: 0.05
            });
            this.pathMesh = new THREE.Mesh(pathGeo, pathMat);
            this.pathMesh.receiveShadow = true;
            scene.add(this.pathMesh);
        },

        buildBridgesAndCliffs: function(scene) {
            // Wood Arch Bridge crossing valley crevice
            const bridgeGeo = new THREE.BoxGeometry(6, 0.8, 16);
            const woodMat = new THREE.MeshStandardMaterial({
                color: 0x78350f, // Warm wood
                roughness: 0.8
            });
            const bridge = new THREE.Mesh(bridgeGeo, woodMat);
            bridge.position.set(10, 7, -38);
            bridge.rotation.y = 0.4;
            bridge.castShadow = true;
            bridge.receiveShadow = true;
            scene.add(bridge);

            // Decorative Boulder Formations
            const rockGeo = new THREE.DodecahedronGeometry(3.5, 1);
            const rockMat = new THREE.MeshStandardMaterial({
                color: 0x52525b,
                roughness: 0.95,
                flatShading: true
            });
            const rockPositions = [
                [-18, 7, 45], [12, 7, 40], [-40, 8, 25],
                [18, 7.5, 12], [38, 7, -18], [-38, 7, -42],
                [-12, 7.5, -90], [12, 7.5, -92]
            ];
            rockPositions.forEach(([rx, ry, rz]) => {
                const rock = new THREE.Mesh(rockGeo, rockMat);
                rock.position.set(rx, ry, rz);
                rock.scale.set(1 + Math.random() * 0.8, 1 + Math.random() * 0.8, 1 + Math.random() * 0.8);
                rock.castShadow = true;
                rock.receiveShadow = true;
                scene.add(rock);
            });
        }
    };
})();
