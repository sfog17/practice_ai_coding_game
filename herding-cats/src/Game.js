import { Config } from './Config.js';
import { ResourceManager } from './ResourceManager.js';
import { AudioSystem } from './AudioSystem.js';
import { Dog } from './Dog.js';
import { Cat } from './Cat.js';
import { Pen } from './Pen.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resources = new ResourceManager();
        this.audio = new AudioSystem();

        this.lastTime = 0;
        this.entities = [];
        this.isRunning = false;
        this.score = 0;
        this.totalCats = Config.CAT_COUNT;
        this.animationFrameId = null;

        // Input state
        this.input = {
            x: 0,
            y: 0,
            isActive: false
        };

        this.dog = null;
        this.pen = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.setupInput();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(`[DEBUG] Resized canvas to ${this.canvas.width}x${this.canvas.height}`);
    }

    setupInput() {
        // Mouse
        const updatePos = (x, y) => {
            this.input.x = x;
            this.input.y = y;
        };

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.score === this.totalCats) {
                this.start(); // Restart
            } else {
                this.audio.playBark();
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            updatePos(e.clientX, e.clientY);
            // If dragging logic needed, check buttons. 
            // For now, Dog follows mouse if inside canvas.
            this.input.isActive = true;
        });

        // Touch
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            updatePos(touch.clientX, touch.clientY);
            this.input.isActive = true;
        }, { passive: false });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.score === this.totalCats) {
                this.start();
                return;
            }
            this.audio.playBark();
            const touch = e.touches[0];
            updatePos(touch.clientX, touch.clientY);
            this.input.isActive = true;
        }, { passive: false });
    }


    async start() {
        console.log("[DEBUG] Game start() called");
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.isRunning = false;

        if (!this.resources.images['DOG']) {
            console.log("[DEBUG] Loading assets...");
            await this.resources.loadImages(Config.ASSETS);
            console.log("[DEBUG] Assets loaded");
        }

        this.isRunning = true;
        this.lastTime = performance.now();
        this.entities = [];
        this.score = 0;

        console.log("[DEBUG] Spawning entities...");
        // Spawn Pen (Top Center)
        const penW = Config.PEN_WIDTH;
        const penH = Config.PEN_HEIGHT;
        // Ensure pen fits on screen
        const safeW = Math.min(penW, this.canvas.width - 40);
        this.pen = new Pen((this.canvas.width - safeW) / 2, 50, safeW, penH);
        this.pen.image = this.resources.getImage('GRASS');

        // Spawn Dog
        this.dog = new Dog(this.canvas.width / 2, this.canvas.height / 2);
        this.dog.image = this.resources.getImage('DOG');
        this.entities.push(this.dog);

        // Spawn Cats
        for (let i = 0; i < this.totalCats; i++) {
            // Spawn away from pen initially
            // Random position but check dist to Pen
            let x, y;
            do {
                x = Math.random() * (this.canvas.width - 40) + 20;
                y = Math.random() * (this.canvas.height - 40) + 20;
            } while (y < 300); // Keep them in lower part initially

            const cat = new Cat(x, y);
            cat.image = this.resources.getImage('CAT');
            this.entities.push(cat);
        }
        console.log(`[DEBUG] Entities spawned: ${this.entities.length}`);

        this.loop(performance.now());
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        this.animationFrameId = requestAnimationFrame((t) => this.loop(t));

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();
    }

    update(dt) {
        // Update Dog input
        if (this.dog) {
            this.dog.setInput(this.input);
            this.dog.update(dt);
            // bounds for dog
            this.dog.x = Math.max(this.dog.radius, Math.min(this.canvas.width - this.dog.radius, this.dog.x));
            this.dog.y = Math.max(this.dog.radius, Math.min(this.canvas.height - this.dog.radius, this.dog.y));
        }

        let currentScore = 0;

        this.entities.forEach(entity => {
            if (entity instanceof Cat) {
                entity.update(dt, this.dog, this.canvas);

                // Keep cats in bounds
                if (entity.x < entity.radius) { entity.x = entity.radius; entity.velX *= -1; }
                if (entity.x > this.canvas.width - entity.radius) { entity.x = this.canvas.width - entity.radius; entity.velX *= -1; }
                if (entity.y < entity.radius) { entity.y = entity.radius; entity.velY *= -1; }
                if (entity.y > this.canvas.height - entity.radius) { entity.y = this.canvas.height - entity.radius; entity.velY *= -1; }

                // Check Pen
                if (this.pen && this.pen.contains(entity)) {
                    currentScore++;
                }
            } else {
                if (entity !== this.dog) entity.update(dt);
            }
        });

        // Ding on new cat
        if (currentScore > this.score) {
            this.audio.playDing();
            if (currentScore === this.totalCats) {
                this.audio.playWin();
            }
        }

        this.score = currentScore;
    }

    render() {
        // Draw grass background
        const grassImg = this.resources.getImage('GRASS');
        if (grassImg) {
            const pattern = this.ctx.createPattern(grassImg, 'repeat');
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Draw Pen first (floor)
        if (this.pen) this.pen.render(this.ctx);

        // Sort by Y for simple depth
        this.entities.sort((a, b) => a.y - b.y);

        this.entities.forEach(entity => entity.render(this.ctx));

        // Draw HUD
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Cats Penned: ${this.score} / ${this.totalCats}`, 20, 40);

        if (this.score === this.totalCats) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#4caf50';
            this.ctx.font = 'bold 48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText("GOOD DOG!", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillText("GOOD DOG!", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = '24px Arial';
            this.ctx.fillText("Tap to Play Again", this.canvas.width / 2, this.canvas.height / 2 + 40);
        }
    }
}
