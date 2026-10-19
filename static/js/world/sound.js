/**
 * SAALIM'S WORLD — PROCEDURAL WEB AUDIO API SYNTHESIZER
 * Gentle atmospheric wind, distant ocean swell, and interaction chimes.
 * Zero external audio dependencies required. Muted by default.
 */

(function() {
    window.WorldSound = {
        ctx: null,
        isMuted: true,
        masterGain: null,
        windNode: null,
        chordInterval: null,

        init: function() {
            this.bindUI();
        },

        bindUI: function() {
            const btn = document.getElementById('audio-toggle-btn');
            if (!btn) return;

            btn.addEventListener('click', () => {
                this.toggleMute();
            });
        },

        initAudioContext: function() {
            if (this.ctx) return;

            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;

            this.ctx = new AudioCtx();

            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);

            this.startWindAmbience();
            this.startChords();
        },

        startWindAmbience: function() {
            if (!this.ctx) return;

            // Generate Pink/Brown Noise buffer for wind
            const bufferSize = this.ctx.sampleRate * 2;
            const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
                b6 = white * 0.115926;
            }

            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            whiteNoise.loop = true;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(280, this.ctx.currentTime);

            whiteNoise.connect(filter);
            filter.connect(this.masterGain);
            whiteNoise.start();
        },

        startChords: function() {
            if (!this.ctx) return;

            // Soft atmospheric pentatonic bells periodically
            const notes = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00]; // A minor pentatonic

            this.chordInterval = setInterval(() => {
                if (this.isMuted || !this.ctx) return;
                const freq = notes[Math.floor(Math.random() * notes.length)];
                this.playBell(freq, 2.5);
            }, 6000);
        },

        playBell: function(freq, duration) {
            if (!this.ctx || this.isMuted) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        },

        playChime: function() {
            if (!this.ctx) {
                this.initAudioContext();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            this.playBell(587.33, 1.2); // D5 chime
            setTimeout(() => this.playBell(880.00, 1.5), 120); // A5 chime
        },

        toggleMute: function() {
            this.initAudioContext();

            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }

            this.isMuted = !this.isMuted;

            const icon = document.getElementById('audio-icon-span');
            const label = document.getElementById('audio-label-span');
            const btn = document.getElementById('audio-toggle-btn');

            if (this.isMuted) {
                if (this.masterGain) this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
                if (icon) icon.textContent = '🔇';
                if (label) label.textContent = 'Sound: OFF';
                if (btn) btn.classList.remove('active');
            } else {
                if (this.masterGain) this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
                if (icon) icon.textContent = '🔊';
                if (label) label.textContent = 'Sound: ON';
                if (btn) btn.classList.add('active');
            }
        }
    };
})();
