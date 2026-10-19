/**
 * SAALIM'S WORLD — DUAL MODE CONTROLS (CINEMATIC SCROLL & FREE EXPLORATION)
 */

(function() {
    window.WorldControls = {
        mode: 'cinematic', // 'cinematic' | 'explore' | 'recruiter'
        keys: { forward: false, backward: false, left: false, right: false },
        islandCenter: new THREE.Vector3(0, 6.2, -20),
        islandRadius: 72,

        init: function() {
            this.bindKeyboard();
            this.bindModeSwitches();
        },

        bindKeyboard: function() {
            window.addEventListener('keydown', (e) => {
                if (this.mode !== 'explore') return;

                switch (e.code) {
                    case 'KeyW':
                    case 'ArrowUp':
                        this.keys.forward = true;
                        break;
                    case 'KeyS':
                    case 'ArrowDown':
                        this.keys.backward = true;
                        break;
                    case 'KeyA':
                    case 'ArrowLeft':
                        this.keys.left = true;
                        break;
                    case 'KeyD':
                    case 'ArrowRight':
                        this.keys.right = true;
                        break;
                }
            });

            window.addEventListener('keyup', (e) => {
                switch (e.code) {
                    case 'KeyW':
                    case 'ArrowUp':
                        this.keys.forward = false;
                        break;
                    case 'KeyS':
                    case 'ArrowDown':
                        this.keys.backward = false;
                        break;
                    case 'KeyA':
                    case 'ArrowLeft':
                        this.keys.left = false;
                        break;
                    case 'KeyD':
                    case 'ArrowRight':
                        this.keys.right = false;
                        break;
                }
            });
        },

        bindModeSwitches: function() {
            const exploreBtn = document.getElementById('explore-mode-btn');
            const exitExploreBtn = document.getElementById('exit-explore-btn');

            if (exploreBtn) {
                exploreBtn.addEventListener('click', () => {
                    this.setMode(this.mode === 'explore' ? 'cinematic' : 'explore');
                });
            }

            if (exitExploreBtn) {
                exitExploreBtn.addEventListener('click', () => {
                    this.setMode('cinematic');
                });
            }
        },

        setMode: function(newMode) {
            this.mode = newMode;
            document.body.setAttribute('data-mode', newMode);

            const exploreBtn = document.getElementById('explore-mode-btn');
            if (exploreBtn) {
                exploreBtn.textContent = newMode === 'explore' ? 'Exit Explore' : 'Free Explore';
            }

            if (newMode === 'cinematic') {
                // Resynchronize camera and character with current scroll position
                if (window.WorldScrollStory) {
                    window.WorldScrollStory.onScroll();
                }
            }
        },

        update: function(delta) {
            if (this.mode !== 'explore' || !window.WorldCharacter || !window.WorldCharacter.mesh) return;

            const char = window.WorldCharacter;
            const moveVec = new THREE.Vector3();

            if (this.keys.forward) moveVec.z -= 1;
            if (this.keys.backward) moveVec.z += 1;
            if (this.keys.left) moveVec.x -= 1;
            if (this.keys.right) moveVec.x += 1;

            if (moveVec.lengthSq() > 0.001) {
                moveVec.normalize();
                char.isMoving = true;

                // Move speed
                const speed = char.moveSpeed * delta;
                const nextPos = char.mesh.position.clone().add(moveVec.multiplyScalar(speed));

                // Safe Island Boundary enforcement
                const distFromCenter = new THREE.Vector2(nextPos.x - this.islandCenter.x, nextPos.z - this.islandCenter.z).length();
                if (distFromCenter < this.islandRadius) {
                    char.mesh.position.copy(nextPos);
                }

                // Face movement heading
                const targetRot = Math.atan2(moveVec.x, moveVec.z);
                char.mesh.rotation.y = THREE.MathUtils.lerp(char.mesh.rotation.y, targetRot, 0.15);
            } else {
                char.isMoving = false;
            }
        }
    };
})();
