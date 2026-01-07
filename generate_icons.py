#!/usr/bin/env python3
"""
Generate icons for the X Scroll Blocker Chrome extension.
Requires: pip install pillow
"""

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Error: Pillow is not installed.")
    print("Please install it with: pip install pillow")
    exit(1)

def draw_icon(size):
    """Draw the extension icon at the specified size."""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    center = size // 2
    padding = size // 10

    # Draw gradient background circle (simplified - using solid color)
    circle_radius = int(size * 0.47)
    circle_bbox = [
        center - circle_radius,
        center - circle_radius,
        center + circle_radius,
        center + circle_radius
    ]
    draw.ellipse(circle_bbox, fill=(102, 126, 234, 255))  # #667eea

    # Draw white document/scroll rectangle
    doc_width = int(size * 0.31)
    doc_height = int(size * 0.47)
    doc_x = center - doc_width // 2
    doc_y = center - doc_height // 2
    doc_bbox = [doc_x, doc_y, doc_x + doc_width, doc_y + doc_height]
    draw.rounded_rectangle(doc_bbox, radius=max(2, size // 30), fill=(255, 255, 255, 230))

    # Draw text lines on the document
    line_width = int(doc_width * 0.6)
    line_x_start = center - line_width // 2
    line_x_end = center + line_width // 2
    line_spacing = doc_height // 5
    start_y = doc_y + int(line_spacing * 0.8)
    line_thickness = max(1, size // 64)

    for i in range(4):
        y = start_y + int(i * line_spacing * 0.8)
        draw.line(
            [(line_x_start, y), (line_x_end, y)],
            fill=(102, 126, 234, 255),
            width=line_thickness
        )

    # Draw prohibition circle
    prohibition_radius = int(size * 0.22)
    prohibition_thickness = max(2, size // 21)
    prohibition_bbox = [
        center - prohibition_radius,
        center - prohibition_radius,
        center + prohibition_radius,
        center + prohibition_radius
    ]
    draw.arc(
        prohibition_bbox,
        start=0,
        end=360,
        fill=(244, 67, 54, 255),  # #f44336
        width=prohibition_thickness
    )

    # Draw prohibition slash
    slash_radius = int(size * 0.16)
    draw.line(
        [
            (center - slash_radius, center - slash_radius),
            (center + slash_radius, center + slash_radius)
        ],
        fill=(244, 67, 54, 255),
        width=prohibition_thickness
    )

    return img

def main():
    """Generate all icon sizes."""
    sizes = [16, 48, 128]

    for size in sizes:
        print(f"Generating {size}x{size} icon...")
        img = draw_icon(size)
        filename = f'icons/icon{size}.png'
        img.save(filename, 'PNG')
        print(f"  Saved: {filename}")

    print("\nAll icons generated successfully!")
    print("You can now load the extension in Chrome.")

if __name__ == '__main__':
    main()
