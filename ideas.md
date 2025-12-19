# Ideas to improve

- [x] Avoid cat overlap
- [ ] Update terrain shape and spawning positions. Change from pen to invernadero.
  - spawning position (eating place) should be invisible
- [ ] Buy custom domain (e.g. cat-chaos.com)
- [ ] Generate QR code
- [ ] Game box art
  - [ ] Find CD box
  - [ ] Generate game cover art + add title + optional (age ratings, platform badge, etc.)
  - [ ] Back cover: Story + QR code + screenshots
- [ ] Fix grass / background
- [ ] Personalized screen title
- [ ] Win screen is too short, require multiple click to restart
- [ ] The cat starts to count as out when they get too close to the exit, even if there are still inside the pen
- [ ] Name cats after real cats + updated sprites
- [ ] Time bar at top, X seconds remaining
- [ ] Different levels and/or config to choose number of cats


## Custom Domain

NO PROMPT NEEDED — STEPS:
1. Create free account at netlify.com
2. Drag your game folder into Netlify dashboard
3. Click "Site settings" → "Change site name"
4. Type: herding-cats-for-[friendname]
5. Your URL: herding-cats-for-sarah.netlify.app

## Screen Title

CODE PROMPT:
"In my JavaScript canvas game, add a title screen that appears before 
the game starts. Display the text '[FRIEND NAME]'s Herding Cats' in 
large centered text, with a subtitle underneath saying 'A game made 
just for you'. Add a 'Tap to Start' button that begins the game. 
Use these colors: [your colors]. Here is my current code: [paste code]"

## Cover 

Video game cover art, border collie dog in dynamic herding pose, surrounded by mischievous chaotic cats of various colors escaping in all directions, pen fence in a garden, vibrant colors, playful cartoon style, dramatic lighting, no text, leaving space at top for title, box art composition. The dog seems overwhelmed by the cat chaos.


┌─────────────────────────┐
│ [PLATFORM BADGE]   [AGE]│  ← Top bar
│                         │
│      CAT CHAOS          │  ← Title (add manually)
│       (subtitle)        │
│                         │
│                         │
│    [MAIN ARTWORK]       │
│                         │
│                         │
│                         │
│ [YOUR LOGO]             │  ← Bottom
└─────────────────────────┘

┌─────────────────────────┐
│ [Screenshot 1] [Screen2]│
│                         │
│ Herd adorable (but      │
│ stubborn) cats as Max   │
│ the border collie!      │
│                         │
│ • 30 chaotic levels     │
│ • Unlock silly hats     │
│ • Boss cat battles      │
│                         │
│ ┌─────────────────────┐ │
│ │ SYSTEM REQUIREMENTS │ │
│ │ Patience: High      │ │
│ │ Cat tolerance: Yes  │ │
│ └─────────────────────┘ │
│                         │
│ [barcode]    [your logo]│
└─────────────────────────┘

For the back, you need a background image that is subtle enough to read text over, and then you need the text itself.

The Background Image Prompt:
Prompt: A wide angle view of a cartoon styled grassy sheep pen, empty, sunny day, soft focus, blurred background, low contrast, light colors, suitable for text overlay --ar 2:3 --no text


Front Cover Elements:

    Top Strip: A "PC DVD-ROM" banner.
    Bottom Left: A PEGI 3 logo (Green background) or ESRB "E" for Everyone.
    Bottom Right: Your "Studio Logo." (e.g., An icon of a paw print with "YourName Games" underneath).

Back Cover Elements (The "Boring" Bottom Strip):

    The Barcode: Grab a generic UPC barcode.
    System Specs Box: Create a small white box with small black text:
        OS: Windows 10/11 | Processor: Intel/AMD | Memory: 4GB RAM | Graphics: Integrated Potato or better | Storage: 200MB available space.
    Legal Text: Paste this in tiny font at the very bottom:
        © 2024 YourName Games. Cat Chaos and the Cat Chaos logo are trademarks of YourName Games. All cats in this game are simulated; no actual animals were annoyed in the making of this product. Made with love.


Element	Size
Front cover	5.12" × 7.2" (130 × 183 mm)
Back cover	5.12" × 7.2"
Spine	0.55" × 7.2" (14 × 183 mm)
Full spread	10.8" × 7.2"

1990s Super Nintendo game box art for a game called 'Herding Cats', chaotic style, pixel art.

## Name cats


CODE PROMPT:
"In my cat herding game, each cat object should have a name property. 
Use these names: ['Whiskers', 'Mr. Fluffington', 'Chaos Gremlin', 
'Chairman Meow']. Display the cat's name in small text above or 
below each cat sprite. When a cat is successfully penned, briefly 
show '[Cat Name] is home!' Here is my code: [paste code]"

## Victory screen

CODE PROMPT:
"Add polished victory and defeat screens to my JavaScript canvas game.

VICTORY SCREEN:
- Shows when all cats are penned
- Display: 'You Win!', time taken, star rating (3 stars if under 30s, 
  2 stars if under 60s, 1 star otherwise)
- 'Play Again' and 'Next Level' buttons

DEFEAT SCREEN (if timer mode):
- Shows when time runs out
- Display: 'Time's Up!', cats remaining
- 'Try Again' button

Use HTML/CSS overlay on top of canvas, not drawn on canvas.
Here is my code: [paste code]"

## Animated sprites

Prompt to generate prompts

Create prompts to have animated sprites for a 2D pixel art game that can be played with a mobile phone or a computer using the browser. Border collie herding cats. There is a constant speed for the dog and cats. The only action is that they run (the dog can bark too). I want to generate animation for the border collie and cats moving. I have 9 different cats, with descriptions I will provide later (leave it blank, but assume 9). Also, don't ask for it to be transparent, I know it doesn't work. Better to ask for magenta background and later make transparent with Python script (I already have it).
I want a single prompt for the border collie.

## Progressive difficulty

CODE PROMPT:
"Add a level system to my JavaScript cat herding game.

Level configuration array:
const levels = [
  { cats: 3, time: 45, catSpeed: 1.0, name: "Warm Up" },
  { cats: 5, time: 40, catSpeed: 1.2, name: "Getting Busy" },
  { cats: 7, time: 35, catSpeed: 1.3, name: "Cat Chaos" },
  { cats: 10, time: 45, catSpeed: 1.5, name: "Herding Expert" },
  { cats: 12, time: 40, catSpeed: 1.8, name: "Cat Whisperer" }
];

- Show level name at start of each level
- Track current level, advance when all cats penned
- Show 'Level Complete!' between levels
- Show 'You Beat All Levels!' after level 5
- Save highest level reached

Here is my code: [paste code]"