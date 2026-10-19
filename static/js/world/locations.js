/**
 * SAALIM'S WORLD — 3D ARCHITECTURAL LOCATIONS
 * Locations A through F: Gate, Home, Skills Tower, Project Valley, Achievement Hall, Contact Lighthouse
 */

(function() {
    window.WorldLocations = {
        interactiveObjects: [],

        init: function(scene) {
            this.buildEntranceGate(scene);
            this.buildDeveloperHome(scene);
            this.buildSkillsTower(scene);
            this.buildProjectValley(scene);
            this.buildAchievementHall(scene);
            this.buildContactLighthouse(scene);
        },

        registerInteractive: function(mesh, type, id, title, subtitle) {
            mesh.userData = {
                interactive: true,
                type: type,
                id: id,
                title: title,
                subtitle: subtitle
            };
            this.interactiveObjects.push(mesh);
        },

        // =========================================================================
        // LOCATION A: THE ENTRANCE GATE
        // =========================================================================
        buildEntranceGate: function(scene) {
            const gateGroup = new THREE.Group();
            gateGroup.position.set(0, 6, 50);

            // Stone Pedestals
            const stoneMat = new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.9 });
            const p1 = new THREE.Mesh(new THREE.BoxGeometry(2, 6, 2), stoneMat);
            p1.position.set(-6, 3, 0);
            p1.castShadow = true;
            gateGroup.add(p1);

            const p2 = new THREE.Mesh(new THREE.BoxGeometry(2, 6, 2), stoneMat);
            p2.position.set(6, 3, 0);
            p2.castShadow = true;
            gateGroup.add(p2);

            // Wood Arch Beams
            const woodMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.75 });
            const beam = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 2.4), woodMat);
            beam.position.set(0, 6.2, 0);
            beam.castShadow = true;
            gateGroup.add(beam);

            const topBeam = new THREE.Mesh(new THREE.BoxGeometry(18, 0.8, 3.0), woodMat);
            topBeam.position.set(0, 7.2, 0);
            topBeam.castShadow = true;
            gateGroup.add(topBeam);

            // Name Stone Monolith
            const monoMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.7 });
            const monolith = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 1.2), monoMat);
            monolith.position.set(9, 2, 2);
            monolith.castShadow = true;
            gateGroup.add(monolith);

            // Glowing Gate Beacon
            const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), beaconMat);
            beacon.position.set(0, 8.2, 0);
            gateGroup.add(beacon);

            this.registerInteractive(
                monolith,
                'gate',
                'gate-entrance',
                'The Entrance Gate',
                'Welcome to Saalim\'s World — Mohammed Saalim'
            );

            scene.add(gateGroup);
        },

        // =========================================================================
        // LOCATION B: DEVELOPER HOME — ABOUT ME
        // =========================================================================
        buildDeveloperHome: function(scene) {
            const homeGroup = new THREE.Group();
            homeGroup.position.set(-35, 6, 15);

            const wallMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.85 }); // Warm Cedar
            const roofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 }); // Slate roof
            const floorMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.9 });

            // Main House Structure
            const house = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 12), wallMat);
            house.position.set(0, 4, 0);
            house.castShadow = true;
            house.receiveShadow = true;
            homeGroup.add(house);

            // Gable Roof
            const roof = new THREE.Mesh(new THREE.ConeGeometry(11, 4.5, 4), roofMat);
            roof.position.set(0, 10, 0);
            roof.rotation.y = Math.PI / 4;
            roof.castShadow = true;
            homeGroup.add(roof);

            // Glowing Window
            const winMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
            const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), winMat);
            windowMesh.position.set(0, 4.5, 6.05);
            homeGroup.add(windowMesh);

            // Study Desk & Interactive Laptop
            const deskMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
            const desk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.8, 2), deskMat);
            desk.position.set(6, 1, 4);
            desk.castShadow = true;
            homeGroup.add(desk);

            // Laptop on desk
            const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.7), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
            laptopBase.position.set(6, 2.0, 4);
            homeGroup.add(laptopBase);

            const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.7, 0.06), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
            laptopScreen.position.set(6, 2.38, 3.7);
            laptopScreen.rotation.x = -0.25;
            homeGroup.add(laptopScreen);

            // Education Certificate Plaque
            const plaqueMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.3 });
            const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 0.1), plaqueMat);
            plaque.position.set(-7.05, 4.5, 0);
            plaque.rotation.y = -Math.PI / 2;
            homeGroup.add(plaque);

            this.registerInteractive(
                laptopScreen,
                'home_laptop',
                'home-workspace',
                'Developer Study & Laptop',
                'Mohammed Saalim — Full-Stack & Engineering Journey'
            );

            this.registerInteractive(
                plaque,
                'home_education',
                'home-ssit',
                'SSIT Academic Journey',
                'B.E. Computer Science & Engineering (Batch 2027)'
            );

            scene.add(homeGroup);
        },

        // =========================================================================
        // LOCATION C: THE SKILLS TOWER (6 FLOORS)
        // =========================================================================
        buildSkillsTower: function(scene) {
            const towerGroup = new THREE.Group();
            towerGroup.position.set(0, 6, -5);

            const floorColors = [
                0x3b82f6, // Floor 1: Programming (Blue)
                0x06b6d4, // Floor 2: Frontend (Cyan)
                0x10b981, // Floor 3: Backend (Emerald)
                0xf59e0b, // Floor 4: Databases (Amber)
                0x8b5cf6, // Floor 5: Core CS (Violet)
                0xec4899  // Floor 6: Tools & AI (Pink)
            ];

            const stoneMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.85, flatShading: true });

            for (let f = 1; f <= 6; f++) {
                const floorY = (f - 1) * 7.5;
                const radius = 9.5 - f * 0.9;

                // Circular Stone Balcony & Wall
                const floorMesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius + 0.8, 6.5, 16), stoneMat);
                floorMesh.position.set(0, floorY + 3.25, 0);
                floorMesh.castShadow = true;
                floorMesh.receiveShadow = true;
                towerGroup.add(floorMesh);

                // Luminous Energy Crystal Core in center of each floor
                const crystalMat = new THREE.MeshBasicMaterial({ color: floorColors[f - 1] });
                const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.4, 0), crystalMat);
                crystal.position.set(0, floorY + 3.5, 0);
                towerGroup.add(crystal);

                // External Balcony Indicator
                const balcMat = new THREE.MeshStandardMaterial({ color: floorColors[f - 1], roughness: 0.5 });
                const balcMarker = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 1.2), balcMat);
                balcMarker.position.set(radius + 0.6, floorY + 2.5, 0);
                towerGroup.add(balcMarker);

                this.registerInteractive(
                    balcMarker,
                    'tower_floor',
                    `floor-${f}`,
                    `Skills Tower Floor ${f}`,
                    `Inspect technical skills & concepts for Floor ${f}`
                );
            }

            // Tower Spire Roof
            const spireMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 });
            const spire = new THREE.Mesh(new THREE.ConeGeometry(3.5, 12, 16), spireMat);
            spire.position.set(0, 49, 0);
            spire.castShadow = true;
            towerGroup.add(spire);

            scene.add(towerGroup);
        },

        // =========================================================================
        // LOCATION D: THE PROJECT VALLEY
        // =========================================================================
        buildProjectValley: function(scene) {
            const valleyGroup = new THREE.Group();
            valleyGroup.position.set(30, 6, -35);

            // 1. AgroSense Smart Agriculture Station
            const agroGroup = new THREE.Group();
            agroGroup.position.set(0, 0, 0);

            // Soil Bed
            const soilMat = new THREE.MeshStandardMaterial({ color: 0x3f2314, roughness: 0.95 });
            const soilBed = new THREE.Mesh(new THREE.BoxGeometry(16, 0.8, 14), soilMat);
            soilBed.position.set(0, 0.4, 0);
            soilBed.receiveShadow = true;
            agroGroup.add(soilBed);

            // Crop Rows
            const cropMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
            for (let row = -5; row <= 5; row += 2.5) {
                for (let c = -5; c <= 5; c += 2.0) {
                    const plant = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 6), cropMat);
                    plant.position.set(row, 1.2, c);
                    agroGroup.add(plant);
                }
            }

            // ESP32 Sensor Pole with LED
            const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
            const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 4.5, 8), poleMat);
            pole.position.set(0, 2.5, -4);
            agroGroup.add(pole);

            const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const sensorLED = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), ledMat);
            sensorLED.position.set(0, 4.8, -4);
            agroGroup.add(sensorLED);

            // Farmhouse & Control Terminal
            const farmMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8 });
            const farmhouse = new THREE.Mesh(new THREE.BoxGeometry(6, 4.5, 6), farmMat);
            farmhouse.position.set(9, 2.25, 0);
            farmhouse.castShadow = true;
            agroGroup.add(farmhouse);

            this.registerInteractive(
                farmhouse,
                'project_agrosense',
                'project-agrosense',
                'AgroSense — Smart Farmer Crop Advisory',
                'IoT Smart Irrigation & Advisory System (Live Django Demo)'
            );

            valleyGroup.add(agroGroup);

            // 2. LONGLINK Observatory
            const obsGroup = new THREE.Group();
            obsGroup.position.set(-14, 0, 18);

            const domeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
            const dome = new THREE.Mesh(new THREE.SphereGeometry(4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
            dome.position.set(0, 4, 0);
            dome.castShadow = true;
            obsGroup.add(dome);

            const baseWall = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 4, 16), domeMat);
            baseWall.position.set(0, 2, 0);
            baseWall.castShadow = true;
            obsGroup.add(baseWall);

            // WebRTC Satellite Dish
            const dishMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.7 });
            const dish = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 0.2, 0.4, 16), dishMat);
            dish.position.set(0, 8.5, 0);
            dish.rotation.x = 0.5;
            obsGroup.add(dish);

            this.registerInteractive(
                baseWall,
                'project_longlink',
                'project-longlink',
                'LONGLINK Observatory',
                'Private Family Network & Real-Time WebRTC Media'
            );

            valleyGroup.add(obsGroup);

            // 3. Formula 1 & Ferrari Telemetry Circuit
            const f1Group = new THREE.Group();
            f1Group.position.set(12, 0, -22);

            // Asphalt Track Strip with Kerbs
            const trackMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
            const trackStrip = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 8), trackMat);
            trackStrip.position.set(0, 0.15, 0);
            f1Group.add(trackStrip);

            // Ferrari Aerodynamic Racer Body
            const ferrariMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2, metalness: 0.4 });
            const racer = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.9, 2.2), ferrariMat);
            racer.position.set(0, 0.8, 0);
            racer.castShadow = true;
            f1Group.add(racer);

            // Rear Wing
            const wing = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 2.4), ferrariMat);
            wing.position.set(-2.0, 1.4, 0);
            f1Group.add(wing);

            this.registerInteractive(
                racer,
                'project_f1',
                'project-f1',
                'Formula 1 & Ferrari Telemetry',
                'Aerodynamics, High-Speed Telemetry & Race Engineering'
            );

            valleyGroup.add(f1Group);

            scene.add(valleyGroup);
        },

        // =========================================================================
        // LOCATION E: THE ACHIEVEMENT HALL
        // =========================================================================
        buildAchievementHall: function(scene) {
            const hallGroup = new THREE.Group();
            hallGroup.position.set(-35, 6, -55);

            const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
            const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });

            // Classical Colonnade Base
            const base = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 14), marbleMat);
            base.position.set(0, 0.6, 0);
            base.receiveShadow = true;
            hallGroup.add(base);

            // Marble Pillars
            const pillarGeo = new THREE.CylinderGeometry(0.7, 0.8, 8, 12);
            const pillarCoords = [
                [-6, 4.6, -5], [6, 4.6, -5],
                [-6, 4.6, 5], [6, 4.6, 5],
                [-6, 4.6, 0], [6, 4.6, 0]
            ];
            pillarCoords.forEach(([px, py, pz]) => {
                const pillar = new THREE.Mesh(pillarGeo, marbleMat);
                pillar.position.set(px, py, pz);
                pillar.castShadow = true;
                hallGroup.add(pillar);
            });

            // Pedestal with Glowing Hackathon Trophy
            const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 3.2, 16), marbleMat);
            ped.position.set(0, 2.2, 0);
            ped.castShadow = true;
            hallGroup.add(ped);

            // Golden Trophy Chalice
            const trophy = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.3, 1.8, 12), goldMat);
            trophy.position.set(0, 4.4, 0);
            trophy.castShadow = true;
            hallGroup.add(trophy);

            // FlipLink Certification Display Glass Frame
            const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
            const certFrame = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.2, 0.3), glassMat);
            certFrame.position.set(4.5, 4.0, 0);
            certFrame.rotation.y = -Math.PI / 4;
            hallGroup.add(certFrame);

            this.registerInteractive(
                trophy,
                'achievement_trophy',
                'achievement-hackathon',
                'SSIT Hackathon Trophy & ₹2,000 Award',
                'Smart Farmer Crop Advisory System (AgroSense)'
            );

            this.registerInteractive(
                certFrame,
                'certification_display',
                'certification-fliplink',
                'Official Verified Certification',
                'Click to inspect verified FlipLink credential'
            );

            scene.add(hallGroup);
        },

        // =========================================================================
        // LOCATION F: THE CONTACT LIGHTHOUSE
        // =========================================================================
        buildContactLighthouse: function(scene) {
            const lightGroup = new THREE.Group();
            lightGroup.position.set(0, 6, -115);

            const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 });
            const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 });
            const stoneMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.9 });

            // Octagonal Stone Base Foundation
            const base = new THREE.Mesh(new THREE.CylinderGeometry(8, 9, 5, 8), stoneMat);
            base.position.set(0, 2.5, 0);
            base.castShadow = true;
            base.receiveShadow = true;
            lightGroup.add(base);

            // Striped Lighthouse Tower
            for (let s = 0; s < 5; s++) {
                const segMat = s % 2 === 0 ? whiteMat : redMat;
                const rTop = 5.2 - s * 0.5;
                const rBottom = 5.7 - s * 0.5;
                const seg = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, 5, 16), segMat);
                seg.position.set(0, 7.5 + s * 5, 0);
                seg.castShadow = true;
                lightGroup.add(seg);
            }

            // Lantern Room (Glass Balcony)
            const lanternGlassMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
            const lanternRoom = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 4, 16), lanternGlassMat);
            lanternRoom.position.set(0, 33, 0);
            lightGroup.add(lanternRoom);

            // Lighthouse Conical Cap
            const cap = new THREE.Mesh(new THREE.ConeGeometry(4.2, 3.5, 16), redMat);
            cap.position.set(0, 36.5, 0);
            lightGroup.add(cap);

            // Contact Terminal Console at entrance
            const consoleMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
            const consoleBox = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.0, 1.4), consoleMat);
            consoleBox.position.set(0, 6.5, 7.5);
            consoleBox.castShadow = true;
            lightGroup.add(consoleBox);

            const consoleScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
            consoleScreen.position.set(0, 7.0, 8.21);
            lightGroup.add(consoleScreen);

            this.registerInteractive(
                consoleBox,
                'contact_terminal',
                'contact-lighthouse',
                'The Contact Lighthouse Terminal',
                'Connect with Mohammed Saalim: Email, Phone, Linkjar & Message'
            );

            scene.add(lightGroup);
        }
    };
})();
