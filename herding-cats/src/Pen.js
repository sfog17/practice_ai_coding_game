import { Config } from './Config.js';

export class Pen {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = Config.COLORS.PEN;
        this.borderColor = Config.COLORS.PEN_BORDER;
        this.wallThickness = 8;

        // Opening configuration (40% of width, centered at bottom)
        this.openingPercent = 0.4;
        this.openingWidth = this.width * this.openingPercent;
        this.openingLeft = this.x + (this.width - this.openingWidth) / 2;
        this.openingRight = this.openingLeft + this.openingWidth;
    }

    contains(entity) {
        const isInBounds = (
            entity.x > this.x &&
            entity.x < this.x + this.width &&
            entity.y > this.y &&
            entity.y < this.y + this.height
        );

        // If not in bounds at all, definitely not contained
        if (!isInBounds) return false;

        // Check if entity is in the opening area (both horizontally AND at bottom)
        // Only exclude from containment if actually in the opening passage
        const radius = entity.radius || 0;
        const inOpeningArea = this.isInOpening(entity.x, entity.y, radius);

        // Contained only if in bounds BUT NOT actively in the opening
        return !inOpeningArea;
    }

    /**
     * Check if entity position is within the opening area
     */
    isInOpening(x, y, radius) {
        const bottomY = this.y + this.height;
        const openingVerticalRange = 50; // Range above bottom for entering
        const openingExitRange = 100; // Range below bottom for exiting
        // Check if entity is in the opening passage (both entering and exiting)
        return (
            x + radius > this.openingLeft &&
            x - radius < this.openingRight &&
            y > bottomY - openingVerticalRange &&
            y < bottomY + openingExitRange
        );
    }

    /**
     * Check collision with pen walls and return push-back vector if collision occurs
     * Returns null if no collision, or { pushX, pushY } to resolve collision
     */
    checkCollision(entity, newX, newY) {
        const radius = entity.radius;
        let pushX = 0;
        let pushY = 0;
        let hasCollision = false;

        // Check if entity is in the opening area - if so, allow free passage
        const inOpening = this.isInOpening(newX, newY, radius);

        if (inOpening) {
            // No collisions when in the opening - allow free movement
            return null;
        }

        // Top wall
        const topWall = this.y;
        if (newY - radius < topWall) {
            pushY = (topWall - (newY - radius));
            hasCollision = true;
        }

        // Left wall
        const leftWall = this.x;
        if (newX - radius < leftWall) {
            pushX = (leftWall - (newX - radius));
            hasCollision = true;
        }

        // Right wall
        const rightWall = this.x + this.width;
        if (newX + radius > rightWall) {
            pushX = (rightWall - (newX + radius));
            hasCollision = true;
        }

        // Bottom wall (with opening)
        const bottomWall = this.y + this.height;
        if (newY + radius > bottomWall) {
            // Colliding with bottom wall segments (left or right of opening)
            pushY = (bottomWall - (newY + radius));
            hasCollision = true;
        }

        return hasCollision ? { pushX, pushY } : null;
    }

    render(ctx) {
        // Draw darker grass floor for the pen
        if (this.image) {
            // Save context for pattern or clipping
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.clip();

            // Draw tiled grass pattern
            const pattern = ctx.createPattern(this.image, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Add darker overlay to distinguish pen area
            ctx.fillStyle = 'rgba(101, 67, 33, 0.25)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Draw wooden fence borders with opening at bottom
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.wallThickness;

        // Top wall
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();

        // Left wall
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.stroke();

        // Right wall
        ctx.beginPath();
        ctx.moveTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.stroke();

        // Bottom wall (left segment)
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);
        ctx.lineTo(this.openingLeft, this.y + this.height);
        ctx.stroke();

        // Bottom wall (right segment)
        ctx.beginPath();
        ctx.moveTo(this.openingRight, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.stroke();

        // Inner lighter border for depth (skip opening area)
        ctx.strokeStyle = '#A0826D';
        ctx.lineWidth = 3;

        // Top
        ctx.beginPath();
        ctx.moveTo(this.x + 4, this.y + 4);
        ctx.lineTo(this.x + this.width - 4, this.y + 4);
        ctx.stroke();

        // Left
        ctx.beginPath();
        ctx.moveTo(this.x + 4, this.y + 4);
        ctx.lineTo(this.x + 4, this.y + this.height - 4);
        ctx.stroke();

        // Right
        ctx.beginPath();
        ctx.moveTo(this.x + this.width - 4, this.y + 4);
        ctx.lineTo(this.x + this.width - 4, this.y + this.height - 4);
        ctx.stroke();

        // Bottom (left segment)
        ctx.beginPath();
        ctx.moveTo(this.x + 4, this.y + this.height - 4);
        ctx.lineTo(this.openingLeft + 4, this.y + this.height - 4);
        ctx.stroke();

        // Bottom (right segment)
        ctx.beginPath();
        ctx.moveTo(this.openingRight - 4, this.y + this.height - 4);
        ctx.lineTo(this.x + this.width - 4, this.y + this.height - 4);
        ctx.stroke();
    }
}
