import { Entity } from './Entity.js';
import { Utils } from './Utils.js';
import { Config } from './Config.js';

export class Dog extends Entity {
    constructor(x, y) {
        super(x, y, 20, Config.COLORS.DOG);
        this.speed = Config.DOG_SPEED;
        this.targetX = x;
        this.targetY = y;
    }

    setInput(input) {
        this.targetX = input.x;
        this.targetY = input.y;
    }

    update(dt) {
        // Move towards target
        const dist = Utils.dist(this, { x: this.targetX, y: this.targetY });

        if (dist > 5) { // Deadzone to prevent jitter
            const angle = Utils.angleBetween(this, { x: this.targetX, y: this.targetY });
            this.velX = Math.cos(angle) * this.speed;
            this.velY = Math.sin(angle) * this.speed;
        } else {
            this.velX = 0;
            this.velY = 0;
        }

        super.update(dt);
    }

    render(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else {
            // Fallback
            super.render(ctx);
            // Draw ring
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
}
