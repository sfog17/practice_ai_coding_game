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


    update(dt, dog, entities, canvas) {
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

        // Apply Separation
        this.separate(entities);

        // Apply Velocity
        this.velX = Math.cos(this.moveAngle) * speed;
        this.velY = Math.sin(this.moveAngle) * speed;

        super.update(dt);
    }

    bounce(normalX, normalY) {
        // Reflect moveAngle based on the normal vector
        // Formula: r = d - 2(d . n)n
        // For simple axis-aligned walls:
        // Horizontal wall (normal Y): Negate Y component of vector
        // Vertical wall (normal X): Negate X component of vector

        if (Math.abs(normalX) > Math.abs(normalY)) {
            // Hitting vertical wall -> reflect horizonally
            // To reflect angle across Y axis: PI - angle
            if (normalX !== 0) {
                // Check if we are actually moving into the wall
                const vx = Math.cos(this.moveAngle);
                // if normalX is positive (wall on left, push right), and vx is negative (moving left) -> bounce
                // if normalX is negative (wall on right, push left), and vx is positive (moving right) -> bounce
                if ((normalX > 0 && vx < 0) || (normalX < 0 && vx > 0)) {
                    this.moveAngle = Math.PI - this.moveAngle;
                }
            }
        } else {
            // Hitting horizontal wall -> reflect vertically
            // To reflect angle across X axis: -angle
            if (normalY !== 0) {
                const vy = Math.sin(this.moveAngle);
                if ((normalY > 0 && vy < 0) || (normalY < 0 && vy > 0)) {
                    this.moveAngle = -this.moveAngle;
                }
            }
        }

        // Add some randomness to prevent perfect loops
        this.moveAngle += Utils.randomRange(-0.2, 0.2);
    }

    separate(entities) {
        let desiredSeparation = Config.CAT_SEPARATION_RADIUS;
        let sumX = 0;
        let sumY = 0;
        let count = 0;

        for (let other of entities) {
            // Check if other is a Cat and not self
            if (other instanceof Cat && other !== this) {
                let d = Utils.dist(this, other);
                // If the distance is greater than 0 and less than an arbitrary amount
                if ((d > 0) && (d < desiredSeparation)) {
                    // Calculate vector pointing away from neighbor
                    let diffX = this.x - other.x;
                    let diffY = this.y - other.y;

                    // Normalize
                    let length = Math.sqrt(diffX * diffX + diffY * diffY);
                    if (length > 0) {
                        diffX /= length;
                        diffY /= length;
                    }

                    // Weight by distance (closer = stronger)
                    // We can just use the normalized vector for now, 
                    // or weight it by 1/d for stronger repulsion when very close.

                    sumX += diffX;
                    sumY += diffY;
                    count++;
                }
            }
        }

        if (count > 0) {
            // Average
            sumX /= count;
            sumY /= count;

            // Normalize average
            let length = Math.sqrt(sumX * sumX + sumY * sumY);
            if (length > 0) {
                sumX /= length;
                sumY /= length;
            }

            // Apply to moveAngle
            // A simple way is to blend the current direction with the separation direction
            // But since we are using angles, let's just cheat and add to position directly 
            // for immediate "pushing" effect, or modify angle.
            // Modifying angle is smoother but might not be strong enough for strict non-overlap.
            // Let's modify the angle of movement to include this component.

            // Get current velocity vector
            let currentVx = Math.cos(this.moveAngle);
            let currentVy = Math.sin(this.moveAngle);

            // Add separation force
            // How strong?
            const separationStrength = 2.5;
            currentVx += sumX * separationStrength;
            currentVy += sumY * separationStrength;

            // Update angle
            this.moveAngle = Math.atan2(currentVy, currentVx);
        }
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
