# Utility Scripts

This directory contains utility scripts for the project.

## make_transparent.py

Converts images with solid color backgrounds to transparent PNGs.

**Usage:**
```bash
python make_transparent.py <input_image> <output_image> [background_color]
```

**Example:**
```bash
# Convert white background to transparent
python make_transparent.py cover.png cover_transparent.png

# Convert custom color background to transparent (hex format)
python make_transparent.py image.png output.png "#FF00FF"
```

**Parameters:**
- `input_image`: Path to the input image file
- `output_image`: Path where the transparent PNG will be saved
- `background_color` (optional): Hex color code of the background to remove (default: white "#FFFFFF")

**Requirements:**
- Python 3.x
- Pillow (PIL Fork)

Install dependencies:
```bash
pip install Pillow
```
