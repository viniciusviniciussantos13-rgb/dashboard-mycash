/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop (PROMPT 3: breakpoint mobile/desktop)
        'xl': '1280px',  // Desktop grande
        '2xl': '1920px', // Wide / 4K
      },
      colors: {
        // Primitivas do Figma
        'neutral': {
          '0': '#ffffff',
          '100': '#f9fafb',
          '300': '#e5e7eb',
          '400': '#d1d5db',
          '500': '#9ca3af',
          '900': '#1f2937',
          '1100': '#080b12',
        },
        'blue': {
          '600': '#2a89ef',
        },
        'red': {
          '600': '#e61e32',
        },
        'green': {
          '600': '#15be78',
        },
        // Semânticas do Figma
        'primary': {
          '500': '#D7FF00',
        },
        'surface': {
          '500': '#FFFFFF',
        },
        'secondary': {
          '50': '#E7E8E9',
        },
        'brand': {
          '700': '#c4e703',
        },
      },
      spacing: {
        // Tokens de espaçamento do Figma
        '0': '0px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '56': '56px',
        '72': '72px',
      },
      borderRadius: {
        // Tokens de shape do Figma
        'shape-2': '2px',
        'shape-20': '20px',
        'shape-100': '100px',
      },
      fontSize: {
        // Tipografia do Figma - Labels
        'label-large': ['18px', { lineHeight: '24px', letterSpacing: '0.3px', fontWeight: '600' }],
        'label-medium': ['16px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '600' }],
        'label-small': ['14px', { lineHeight: '16px', letterSpacing: '0.3px', fontWeight: '600' }],
        'label-x-small': ['12px', { lineHeight: '16px', letterSpacing: '0.3px', fontWeight: '600' }],
        // Headings
        'heading-medium': ['28px', { lineHeight: '36px', letterSpacing: '0', fontWeight: '700' }],
        'heading-small': ['24px', { lineHeight: '32px', letterSpacing: '0', fontWeight: '700' }],
        'heading-x-small': ['20px', { lineHeight: '28px', letterSpacing: '0', fontWeight: '700' }],
        // Paragraphs
        'paragraph-large': ['18px', { lineHeight: '28px', letterSpacing: '0.3px', fontWeight: '400' }],
        'paragraph-small': ['14px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '400' }],
        'paragraph-x-small': ['12px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '400' }],
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}