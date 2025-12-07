import sys
from PIL import Image

def make_transparent(input_path, output_path, tolerance=0):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            r, g, b, a = item
            
            # Logic to detect Noisy Magenta vs Grayscale Dog vs Grey Cats
            # Grey: R ~= G ~= B
            # Magenta: R >> G and B >> G
            
            # New Condition:
            # Green must be significantly lower than BOTH Red AND Blue.
            # This ensures neutral colors (where R~G~B) are preserved.
            
            margin = 30
            is_magenta = (r > g + margin) and (b > g + margin)
            
            if is_magenta:
                newData.append((0, 0, 0, 0)) # Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Saved transparent image to {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python make_transparent.py <input_path> <output_path>")
    else:
        make_transparent(sys.argv[1], sys.argv[2])
