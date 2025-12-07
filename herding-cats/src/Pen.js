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
        // Draw floor
        if (this.image) {
            // Save context for pattern or clipping
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.clip();
            // Draw tiled grass or just stretched? Stretched is easier for now.
            // Or Pattern
            const pattern = ctx.createPattern(this.image, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // Draw border (walls) - Leave bottom open? Or top?
        // Let's just draw a box for now.
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Label
        ctx.fillStyle = '#FFF';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("PEN", this.x + this.width / 2, this.y + 30);
    }
}
