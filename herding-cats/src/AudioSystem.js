export class AudioSystem {
    constructor() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = true;

            // Store the decoded audio data here
            this.buffers = {
                bark: null,
                meow: null
            };

            // Start loading sounds immediately
            this.loadSounds();

        } catch (e) {
            console.warn('Audio not supported in this browser:', e);
            this.enabled = false;
        }
    }

    // New helper to fetch and decode audio files
    async loadSounds() {
        if (!this.enabled) return;

        const loadFile = async (url) => {
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                return await this.ctx.decodeAudioData(arrayBuffer);
            } catch (error) {
                console.error(`Failed to load sound from ${url}:`, error);
                return null;
            }
        };

        // Assuming files are in the same directory. 
        // If in a subfolder, change to './sounds/bark.mp3'
        this.buffers.bark = await loadFile('./assets/bark.mp3');
        this.buffers.meow = await loadFile('./assets/meow.mp3');
    }

    // Generic helper to play a sound from a buffer
    playBuffer(buffer, volume = 0.5) {
        if (!this.enabled || !buffer) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();

        source.buffer = buffer;

        // Connect Source -> Gain -> Speakers
        source.connect(gain);
        gain.connect(this.ctx.destination);

        gain.gain.value = volume;

        source.start(0);
    }

    playBark() {
        // Play the pre-loaded buffer
        this.playBuffer(this.buffers.bark, 0.4); // 0.4 is volume
    }

    playMeow() {
        // Play the pre-loaded buffer
        this.playBuffer(this.buffers.meow, 0.4);
    }

    // Kept original synthesized sound for Ding
    playDing() {
        if (!this.enabled) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.0);
    }

    // Kept original synthesized sound for Win
    playWin() {
        if (!this.enabled) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'triangle';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.1, now + i * 0.1);
            gain.gain.linearRampToValueAtTime(0, now + i * 0.1 + 0.5);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.5);
        });
    }
}