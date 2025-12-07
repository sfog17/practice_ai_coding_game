export const Utils = {
    // Distance between two points (objects with x, y)
    dist: (a, b) => Math.hypot(a.x - b.x, a.y - b.y),

    // Angle from a to b in radians
    angleBetween: (a, b) => Math.atan2(b.y - a.y, b.x - a.x),

    // Linear interpolation
    lerp: (start, end, t) => start + (end - start) * t,

    // Clamp value
    clamp: (val, min, max) => Math.min(Math.max(val, min), max),

    // Circle collision
    circleCollide: (c1, c2) => Utils.dist(c1, c2) < (c1.radius + c2.radius),

    // Random range
    randomRange: (min, max) => Math.random() * (max - min) + min,
};
