import { Game } from './Game.js';

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game('gameCanvas');
    window.game = game; // Expose for debugging
    game.start();
});
