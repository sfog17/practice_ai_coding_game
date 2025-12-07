import { Entity } from './Entity.js';
import { Utils } from './Utils.js';
import { Config } from './Config.js';

export class Cat extends Entity {
    constructor(x, y) {
        super(x, y, 15, Config.COLORS.CAT);
        this.normalSpeed = Config.CAT_SPEED_NORMAL;
        this.runSpeed = Config.CAT_SPEED_RUN;
        this.fleeRadius = Config.CAT_FLEE_RADIUS;
        this.wanderTimer = 5.0; // Start with 5 seconds before wandering
        this.moveAngle = Math.random() * Math.PI * 2;
    }

    update(dt, dog, canvas) {
        // AI Logic
        let speed = this.normalSpeed;

        // Check for Dog
        const distToDog = Utils.dist(this, dog);

        if (distToDog < this.fleeRadius) {
            // FLEE MODE
            speed = this.runSpeed;
            // Angle away from dog
            this.moveAngle = Utils.angleBetween(dog, this);

            // Adjust angle if near edges to prevent getting stuck
            const margin = this.radius * 2;

            // Check if we're near edges and adjust flee angle accordingly
            if (this.x < margin && Math.cos(this.moveAngle) < 0) {
                // Near left edge and trying to go left - redirect
                this.moveAngle = Math.PI - this.moveAngle; // Reflect horizontally
            }
            if (this.x > canvas.width - margin && Math.cos(this.moveAngle) > 0) {
                // Near right edge and trying to go right - redirect
                this.moveAngle = Math.PI - this.moveAngle; // Reflect horizontally
            }
            if (this.y < margin && Math.sin(this.moveAngle) < 0) {
                // Near top edge and trying to go up - redirect
                this.moveAngle = -this.moveAngle; // Reflect vertically
            }
            if (this.y > canvas.height - margin && Math.sin(this.moveAngle) > 0) {
                // Near bottom edge and trying to go down - redirect
                this.moveAngle = -this.moveAngle; // Reflect vertically
            }
        } else {
            // WANDER MODE
            this.wanderTimer -= dt;
            if (this.wanderTimer <= 0) {
                // Change direction slightly
                this.moveAngle += Utils.randomRange(-1, 1);
                this.wanderTimer = Utils.randomRange(1, 3);
            }
        }

        // Apply Velocity
        this.velX = Math.cos(this.moveAngle) * speed;
        this.velY = Math.sin(this.moveAngle) * speed;

        super.update(dt);
    }

    render(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else {
            super.render(ctx);
            // Draw simple cat ears
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Left ear
            ctx.moveTo(this.x - 10, this.y - 5);
            ctx.lineTo(this.x - 15, this.y - 20);
            ctx.lineTo(this.x - 5, this.y - 10);
            // Right ear
            ctx.moveTo(this.x + 10, this.y - 5);
            ctx.lineTo(this.x + 15, this.y - 20);
            ctx.lineTo(this.x + 5, this.y - 10);
            ctx.fill();
        }
    }
}
