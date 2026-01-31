const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    // Pobut utilities - base classes
    'pobut-H1',
    'pobut-H2',
    'pobut-H3',
    'pobut-body',
    'pobut-caption',
    // Pobut utilities - responsive variants (using patterns)
    {
      pattern: /^(tablet|desktop|wide|large):pobut-(H1|H2|H3|body|caption)$/,
    },
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      screens: {
        'tablet': '48rem',  // 768px - tablet breakpoint
        'desktop': '64rem',  // 1024px - desktop breakpoint
        'wide': '72rem',     // 1152px - wide breakpoint for featured products
        'large': '90rem',    // 1440px - large breakpoint for featured products
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Design token radius values
        'radius-sm': 'var(--sys-radius-sm)',
        'radius-md': 'var(--sys-radius-md)',
        'radius-lg': 'var(--sys-radius-lg)',
        'radius-xl': 'var(--sys-radius-xl)',
        'radius-2xl': 'var(--sys-radius-2xl)',
        'radius-full': 'var(--sys-radius-full)',
      },
      // Spacing tokens (for padding, margin, gap)
      // Note: layout-gap-* tokens are RESPONSIVE - they automatically change at breakpoints!
      // Use gap-layout-gap-1 instead of gap-space-10 md:gap-space-20
      spacing: {
        // Base spacing scale (static values)
        
        'space-10': 'var(--sys-space-10)',
        'space-20': 'var(--sys-space-20)',
        'space-30': 'var(--sys-space-30)',
        'space-50': 'var(--sys-space-50)',
        // Button padding (responsive)
        'btn-px': 'var(--sys-btn-px)',
        'btn-py': 'var(--sys-btn-py)',
        // Semantic spacing scale
        'spacing-3xs': 'var(--spacing-3xs)',
        'spacing-2xs': 'var(--spacing-2xs)',
        'spacing-xs': 'var(--sys-spacing-xs)',
        'spacing-sm': 'var(--sys-spacing-sm)',
        'spacing-md': 'var(--sys-spacing-md)',
        'spacing-lg': 'var(--sys-spacing-lg)',
        'spacing-xl': 'var(--spacing-xl)',
        'spacing-2xl': 'var(--spacing-2xl)',
        'spacing-3xl': 'var(--spacing-3xl)',
        'spacing-4xl': 'var(--spacing-4xl)',
        'spacing-5xl': 'var(--spacing-5xl)',
        'spacing-6xl': 'var(--spacing-6xl)',
        // Layout spacing (RESPONSIVE - automatically adapts at breakpoints!)
        'layout-gap-1': 'var(--sys-layout-gap-1)',
        'layout-gap-2': 'var(--sys-layout-gap-2)',
        'layout-gap-3': 'var(--sys-layout-gap-3)',
        'layout-spacing-small': 'var(--sys-layout-spacing-small)',
        'layout-spacing-medium': 'var(--sys-layout-spacing-medium)',
        'ds-sections-gap': 'var(--sys-ds-sections-gap)',
        'ds-inner-section-pad-sm': 'var(--sys-ds-inner-section-pad-sm)',
        // Container padding (responsive)
        'container-padding': 'var(--layout-container-padding, 20px)',
      },
      // Font weights
      fontWeight: {
        regular: 'var(--sys-font-weight-regular)',
        bold: 'var(--sys-font-weight-bold)',
      },
      // Shadows
      boxShadow: {
        'shadow-sm': 'var(--sys-shadow-sm)',
        'shadow-md': 'var(--sys-shadow-md)',
        'shadow-lg': 'var(--sys-shadow-lg)',
        'shadow-xl': 'var(--sys-shadow-xl)',
        'shadow-none': 'var(--sys-shadow-none)',
      },
      // Transitions
      transitionDuration: {
        'transition-fast': 'var(--sys-transition-fast)',
        'transition-base': 'var(--sys-transition-base)',
        'transition-slow': 'var(--sys-transition-slow)',
      },
      // Z-index
      zIndex: {
        'z-base': 'var(--sys-z-index-base)',
        'z-dropdown': 'var(--sys-z-index-dropdown)',
        'z-sticky': 'var(--sys-z-index-sticky)',
        'z-fixed': 'var(--sys-z-index-fixed)',
        'z-modal-backdrop': 'var(--sys-z-index-modal-backdrop)',
        'z-modal': 'var(--sys-z-index-modal)',
        'z-popover': 'var(--sys-z-index-popover)',
        'z-tooltip': 'var(--sys-z-index-tooltip)',
      },
      colors: {
        // Palette colors (from palette-tokens.css)
        color: {
          blue: "var(--color-blue)",
          "blue-hover": "var(--color-blue-hover)",
          "blue-click": "var(--color-blue-click)",
          green: "var(--color-green)",
          "green-hover": "var(--color-green-hover)",
          "green-click": "var(--color-green-click)",
          white: "var(--color-white)",
          "neutral-border": "var(--color-neutral-border)",
          "default-background": "var(--color-default-background)",
          error: "var(--color-error)",
          black: "var(--color-black)",
        },
        // Button tokens (from button-tokens.css)
        "btn-primary": {
          bg: "var(--btn-primary-bg)",
          "bg-hover": "var(--btn-primary-bg-hover)",
          "bg-active": "var(--btn-primary-bg-active)",
          fg: "var(--btn-primary-fg)",
        },
        "btn-secondary": {
          bg: "var(--btn-secondary-bg)",
          "bg-hover": "var(--btn-secondary-bg-hover)",
          "bg-active": "var(--btn-secondary-bg-active)",
          fg: "var(--btn-secondary-fg)",
        },
        "btn-tertiary": {
          bg: "var(--btn-tertiary-bg)",
          "bg-hover": "var(--btn-tertiary-bg-hover)",
          "bg-active": "var(--btn-tertiary-bg-active)",
          fg: "var(--btn-tertiary-fg)",
        },
        // "btn-outline": {
        //   bg: "var(--btn-outline-bg)",
        //   fg: "var(--btn-outline-fg)",
        //   border: "var(--btn-outline-border)",
        //   "border-hover": "var(--btn-outline-border-hover)",
        //   "border-active": "var(--btn-outline-border-active)",
        //   "fg-hover": "var(--btn-outline-fg-hover)",
        //   "fg-active": "var(--btn-outline-fg-active)",
        // },
        "btn-interactive": {
          bg: "var(--btn-interactive-bg)",
          fg: "var(--btn-interactive-fg)",
          border: "var(--btn-interactive-border)",
          "border-hover": "var(--btn-interactive-border-hover)",
          "border-active": "var(--btn-interactive-border-active)",
          "fg-hover": "var(--btn-interactive-fg-hover)",
          "fg-active": "var(--btn-interactive-fg-active)",
        },
        "btn-danger": {
          bg: "var(--btn-danger-bg)",
          "bg-hover": "var(--btn-danger-bg-hover)",
          "bg-active": "var(--btn-danger-bg-active)",
          fg: "var(--btn-danger-fg)",
        },
        // Semantic system colors (from semantic-tokens.css)
        sys: {
          bg: "var(--sys-bg)",
          surface: "var(--sys-surface)",
          "surface-2": "var(--sys-surface-2)",
          "surface-accent": "var(--sys-surface-accent)",
          "surface-accent-hover": "var(--sys-surface-accent-hover)",
          "surface-accent-active": "var(--sys-surface-accent-active)",
          "surface-interactive": "var(--sys-surface-interactive)",
          "surface-interactive-hover": "var(--sys-surface-interactive-hover)",
          "surface-interactive-active": "var(--sys-surface-interactive-active)",
          overlay: "var(--sys-overlay)",

          text: "var(--sys-text)",
          "text-muted": "var(--sys-text-muted)",
          "text-subtle": "var(--sys-text-subtle)",
          "text-inverse": "var(--sys-text-inverse)",
          "text-on-accent": "var(--sys-text-on-accent)",
          "text-on-interactive": "var(--sys-text-on-interactive)",
          "text-on-surface": "var(--sys-text-on-surface)",
          "text-on-danger": "var(--sys-text-on-danger)",
          "text-on-warning": "var(--sys-text-on-warning)",
          "text-on-success": "var(--sys-text-on-success)",

          link: "var(--sys-link)",
          "link-hover": "var(--sys-link-hover)",
          "link-active": "var(--sys-link-active)",

          interactive: "var(--sys-link)",
          "interactive-hover": "var(--sys-link-hover)",
          "interactive-active": "var(--sys-link-active)",

          accent: "var(--sys-accent)",
          "accent-hover": "var(--sys-accent-hover)",
          "accent-active": "var(--sys-accent-active)",
          "accent-secondary": "var(--sys-accent-secondary)",
          "accent-secondary-hover": "var(--sys-accent-secondary-hover)",
          "accent-secondary-active": "var(--sys-accent-secondary-active)",
          "accent-tertiary": "var(--sys-accent-tertiary)",
          "accent-tertiary-hover": "var(--sys-accent-tertiary-hover)",
          "accent-tertiary-active": "var(--sys-accent-tertiary-active)",

          "sys-border": "var(--sys-border)",
          "sys-border-hover": "var(--sys-border-hover)",
          "sys-border-active": "var(--sys-border-active)",
          "sys-border-strong": "var(--sys-border-strong)",
          "sys-border-strong-hover": "var(--sys-border-strong-hover)",
          "sys-border-strong-active": "var(--sys-border-strong-active)",
          "sys-border-subtle": "var(--sys-border-subtle)",
          "sys-border-interactive": "var(--sys-border-interactive)",
          "sys-border-interactive-hover": "var(--sys-border-interactive-hover)",
          "sys-border-interactive-active": "var(--sys-border-interactive-active)",

          focus: "var(--sys-focus)",
          "focus-ring": "var(--sys-focus-ring)",

          danger: "var(--sys-danger)",
          "danger-hover": "var(--sys-danger-hover)",
          "danger-active": "var(--sys-danger-active)",
          warning: "var(--sys-warning)",
          "warning-hover": "var(--sys-warning-hover)",
          "warning-active": "var(--sys-warning-active)",
          success: "var(--sys-success)",
          "success-hover": "var(--sys-success-hover)",
          "success-active": "var(--sys-success-active)",

          // Button tokens (flattened for Tailwind access)
          "btn-primary-bg": "var(--sys-btn-primary-bg)",
          "btn-primary-bg-hover": "var(--sys-btn-primary-bg-hover)",
          "btn-primary-bg-active": "var(--sys-btn-primary-bg-active)",
          "btn-primary-fg": "var(--sys-btn-primary-fg)",
          
          "btn-secondary-bg": "var(--sys-btn-secondary-bg)",
          "btn-secondary-bg-hover": "var(--sys-btn-secondary-bg-hover)",
          "btn-secondary-bg-active": "var(--sys-btn-secondary-bg-active)",
          "btn-secondary-fg": "var(--sys-btn-secondary-fg)",
          
          "btn-tertiary-bg": "var(--sys-btn-tertiary-bg)",
          "btn-tertiary-bg-hover": "var(--sys-btn-tertiary-bg-hover)",
          "btn-tertiary-bg-active": "var(--sys-btn-tertiary-bg-active)",
          "btn-tertiary-fg": "var(--sys-btn-tertiary-fg)",
          
          "btn-outline-bg": "var(--sys-btn-outline-bg)",
          "btn-outline-bg-hover": "var(--sys-btn-outline-bg-hover)",
          "btn-outline-bg-active": "var(--sys-btn-outline-bg-active)",
          "btn-outline-border": "var(--sys-btn-outline-border)",
          "btn-outline-border-hover": "var(--sys-btn-outline-border-hover)",
          "btn-outline-border-active": "var(--sys-btn-outline-border-active)",
          "btn-outline-fg": "var(--sys-btn-outline-fg)",
          "btn-outline-fg-hover": "var(--sys-btn-outline-fg-hover)",
          "btn-outline-fg-active": "var(--sys-btn-outline-fg-active)",
          
          "btn-interactive-border": "var(--sys-btn-interactive-border)",
          "btn-interactive-border-hover": "var(--sys-btn-interactive-border-hover)",
          "btn-interactive-border-active": "var(--sys-btn-interactive-border-active)",
          "btn-interactive-fg": "var(--sys-btn-interactive-fg)",
          "btn-interactive-fg-hover": "var(--sys-btn-interactive-fg-hover)",
          "btn-interactive-fg-active": "var(--sys-btn-interactive-fg-active)",

          // Component tokens (flattened for Tailwind access)
          "card-bg": "var(--sys-card-bg)",
          "card-bg-hover": "var(--sys-card-bg-hover)",
          "card-border": "var(--sys-card-border)",
          "card-border-hover": "var(--sys-card-border-hover)",
          
          "chip-bg": "var(--sys-chip-bg)",
          "chip-fg": "var(--sys-chip-fg)",
          "chip-border": "var(--sys-chip-border)",
          
          "input-border": "var(--sys-input-border)",
          "input-border-hover": "var(--sys-input-border-hover)",
          "input-border-focus": "var(--sys-input-border-focus)",
          "input-bg": "var(--sys-input-bg)",
          "input-fg": "var(--sys-input-fg)",
          
          "nav-bg": "var(--sys-nav-bg)",
          "nav-fg": "var(--sys-nav-fg)",
          "nav-link": "var(--sys-nav-link)",
          "nav-link-hover": "var(--sys-nav-link-hover)",
          "nav-link-active": "var(--sys-nav-link-active)",
        },
        // Card tokens (legacy - kept for backward compatibility)
        "card": {
          bg: "var(--sys-card-bg)",
          "bg-hover": "var(--sys-card-bg-hover)",
          border: "var(--sys-card-border)",
          "border-hover": "var(--sys-card-border-hover)",
        },
        // Chip/Badge tokens (legacy - kept for backward compatibility)
        "chip": {
          bg: "var(--sys-chip-bg)",
          fg: "var(--sys-chip-fg)",
          border: "var(--sys-chip-border)",
        },
        // Field tokens (for forms)
        field: {
          bg: "var(--field-bg)",
          fg: "var(--field-fg)",
          bd: "var(--field-bd)",
          "bd-focus": "var(--field-bd-focus)",
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '4rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
            a: {
              color: 'inherit',
            },
          },
        },
      }),
      // fontFamily: {
      //   mono: ['var(--font-geist-mono)'],
      //   sans: ['var(--font-geist-sans)'],
      // },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        in: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        out: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 },
        },
      },
      animation: {
        in: 'in 0.2s ease-out',
        out: 'out 0.2s ease-out',
        fadeIn: 'fadeIn .3s ease-in-out',
        fadeOut: 'fadeOut .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        'slide-in-from-left': 'slide-in-from-left 0.2s ease-out',
        'slide-out-to-left': 'slide-out-to-left 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.2s ease-out',
        'slide-out-to-right': 'slide-out-to-right 0.2s ease-out',
        blink: 'blink 1.4s both infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme, addUtilities }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    }),
  ],
}
