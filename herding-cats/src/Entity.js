export class Entity {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velX = 0;
        this.velY = 0;
        this.isMarkedForDeletion = false;
    }

    update(dt) {
        this.x += this.velX * dt;
        this.y += this.velY * dt;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}
