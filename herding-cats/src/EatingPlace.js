import { Config } from './Config.js';

export class EatingPlace {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgba(255, 200, 100, 0.3)'; // Light orange/yellow color
        this.borderColor = '#FF8C00'; // Dark orange
        this.borderWidth = 4;
    }

    render(ctx) {
        // Draw the eating area background
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw border to delimit the area
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Optional: Draw a dashed inner border for visual effect
        ctx.strokeStyle = 'rgba(255, 140, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        ctx.setLineDash([]); // Reset to solid line
    }
}
