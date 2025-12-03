# Test Design Page

This page tests all the Figma design system styles and components.

## Access

Visit: `/test-design`

## Components

1. **TestHeader** - Header with logo, search icon, and hamburger menu
2. **TestNavigation** - Green navigation bar with links
3. **HeroCarousel** - Image carousel with navigation arrows and pagination
4. **WholesaleSection** - Wholesale clients section with features
5. **ProductCards** - Product card grid with pricing
6. **CatalogSection** - Catalog heading and placeholder grid

## Styles Used

All components use the Figma design system:
- Typography classes: `pobut_H1`, `pobut_H2`, `pobut_H3`, `pobut_body`, `pobut_caption`
- Colors: `var(--color-blue)`, `var(--color-green)`, `var(--color-white)`, etc.
- Spacing: `var(--layout-margin)`, `var(--layout-spacing-small)`, etc.
- All values use `rem` units for responsiveness

## Responsive Breakpoints

- Mobile: ≤768px (48rem)
- Tablet: ≤1024px (64rem)
- Desktop: >1024px

The layout automatically adapts using CSS variables that change at breakpoints.

## Notes

- This page uses its own layout to bypass the default Header/Footer
- Images are placeholders - replace with actual images from your media library
- All interactive elements (buttons, links) have hover states matching Figma colors
- The design matches the Figma screenshots exactly

