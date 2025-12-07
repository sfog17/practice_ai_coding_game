import { Config } from './Config.js';

export class Pen {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = Config.COLORS.PEN;
        this.borderColor = Config.COLORS.PEN_BORDER;
    }

    contains(entity) {
        return (
            entity.x > this.x &&
            entity.x < this.x + this.width &&
            entity.y > this.y &&
            entity.y < this.y + this.height
        );
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

        // Draw wooden fence border with double line effect
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 8;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Inner lighter border for depth
        ctx.strokeStyle = '#A0826D';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x + 4, this.y + 4, this.width - 8, this.height - 8);
    }
}
