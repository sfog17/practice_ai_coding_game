# Walkthrough - Herding Cats (MVP)

The MVP for **Herding Cats** is complete! You can now play the basic loop: chasing cats into the pen.

## How to Play
1.  Open `d:/Code/practice_ai_coding_game/herding-cats/index.html` in your web browser.
    *   *Tip: Use Chrome or Edge and press F12, then toggle "Device Toolbar" to test the mobile view.*
2.  **Controls:**
    *   **Mouse/Touch:** The Border Collie (White Circle) moves towards your cursor/finger.
3.  **Objective:**
    *   Approach the Cats (Orange Circles).
    *   Scare them into the Pen (Brown Zone at the top).
    *   Get all 8 cats in to see the "GOOD DOG!" message.

## Features Implemented (5h Scope)
*   **Physics Engine:** Custom entity system with basic collision and bounds checking.
*   **AI:** Cats have a "Flee" state when the dog is near and a "Wander" state otherwise.
*   **Pen System:** Detection of cats entering the target zone.
*   **Mobile Support:** Touch events are mapped to movement, and the viewport is locked.

