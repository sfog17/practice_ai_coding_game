# Practice AI Coding Game

A collection of simple games for practicing AI-assisted development.

## Projects

### Herding Cats
A browser-based game where you play as a border collie herding cats into a pen.

**How to play:**
1. Navigate to the `herding-cats` directory
2. Open `index.html` with a local development server
3. Move your mouse/finger to control the dog
4. Herd all 9 cats into the pen

**Features:**
- 9 different cat sprites with unique appearances
- Responsive touch and mouse controls
- Simple AI for cat behavior (wandering and fleeing)

## Development

### Scripts
Utility scripts are located in the `scripts/` directory:
- `make_transparent.py` - Converts solid color backgrounds to transparent PNG

### Running Locally
For the herding-cats game, serve the files using any local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

Then navigate to `http://localhost:8000/herding-cats/`
