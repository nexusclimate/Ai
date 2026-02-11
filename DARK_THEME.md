# Dark Theme Implementation

The Climate GPT Hub now uses the original dark color scheme from the index.html landing page.

## Color Palette

- **Dark Background**: `#0A0A0B` (darkbg)
- **Accent Cyan**: `#0EE4FC` (accent)
- **Soft Blue**: `#4FACFE` (softblue)
- **Light Gray**: `#E4E4E4` (lightgray)

## Design Elements

### Glass Morphism
Cards and containers use a glass effect with:
- Background: `rgba(255, 255, 255, 0.02)`
- Backdrop blur: `20px`
- Border: `1px solid rgba(255, 255, 255, 0.05)`

### Gradient Mesh Background
Multi-layered radial gradients create a subtle animated background:
- Blue gradient at 20% 20%
- Cyan gradient at 80% 80%
- Cyan gradient at 40% 90%

### Floating Orbs
Animated orbs with blur effects that drift across the background for visual interest.

### Typography
- **Font**: Work Sans (300, 400, 500, 600, 700)
- **Headings**: Light weight (300) for large titles
- **Body**: Regular (400) with 80% opacity for secondary text

## Components Styled

All components now use the dark theme:

- ✅ Layout with navigation and footer
- ✅ Home page with hero and featured sections
- ✅ Collection cards with glass effect
- ✅ Tool cards with glass effect
- ✅ Search box with dark styling
- ✅ Badges with semi-transparent backgrounds
- ✅ Collection pages
- ✅ Tool detail pages
- ✅ Search results page

## Interactive Elements

- **Buttons**: Cyan background with dark text, hover opacity effect
- **Links**: Cyan color with soft blue hover state
- **Cards**: Glass effect with accent border on hover
- **Tag filters**: Glass effect, becomes cyan on selection

## Build Status

✅ Successfully built with all dark theme styles applied
✅ Static export generated in `out/` directory
✅ All pages render correctly with the new color scheme
