import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const primary = {
  25: '#F6FEF9',
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
  950: '#022C22',
};

const gray = {
  25: '#FCFCFD',
  50: '#F9FAFB',
  100: '#F2F4F7',
  200: '#EAECF0',
  300: '#D0D5DD',
  400: '#98A2B3',
  500: '#667085',
  600: '#475467',
  700: '#344054',
  800: '#182230',
  900: '#101828',
  950: '#0C111D',
};

const error = {
  25: '#FFFBFA',
  50: '#FEF3F2',
  100: '#FEE4E2',
  200: '#FECDCA',
  300: '#FDA29B',
  400: '#F97066',
  500: '#F04438',
  600: '#D92D20',
  700: '#B42318',
  800: '#912018',
  900: '#7A271A',
  950: '#55160C',
};

const warning = {
  25: '#FFFCF5',
  50: '#FFFAEB',
  100: '#FEF0C7',
  200: '#FEDF89',
  300: '#FEC84B',
  400: '#FDB022',
  500: '#F79009',
  600: '#DC6803',
  700: '#B54708',
  800: '#93370D',
  900: '#7A2E0E',
  950: '#4E1D09',
};

const success = {
  25: '#F6FEF9',
  50: '#ECFDF3',
  100: '#DCFAE6',
  200: '#ABEFC6',
  300: '#75E0A7',
  400: '#47CD89',
  500: '#17B26A',
  600: '#079455',
  700: '#067647',
  800: '#085D3A',
  900: '#074D31',
  950: '#053321',
};

const red = {
  100: '#FFEDEA',
  200: '#FFDBD6',
  300: '#FFB4AB',
  400: '#FF897D',
  500: '#FF5449',
  550: '#DA251C',
  600: '#DE3730',
  700: '#BA1A1A',
  800: '#940009',
  900: '#410002',
  1000: '#2E0001 ',
};

const green = {
  100: '#C4FFCF',
  200: '#75FCA4',
  300: '#55DF8B',
  400: '#34C372',
  500: '#01A75C',
  600: '#03894A',
  700: '#006E39',
  800: '#00522A',
  900: '#00391B',
  1000: '#00210D',
};

const blue = {
  100: '#EBF1FF',
  200: '#D5E3FF',
  300: '#A6C8FF',
  400: '#72AEFF',
  500: '#3192FD',
  600: '#0277DB',
  700: '#0060B1',
  800: '#004786',
  900: '#00315F',
  1000: '#001C3B',
};

const orange = {
  100: '#FFEDE7',
  200: '#FFDCCD',
  300: '#FFB596',
  400: '#FF8C58',
  500: '#EE671F',
  600: '#CD4F00',
  700: '#A33F00',
  800: '#7C2E00',
  900: '#581E00',
  1000: '#370E00',
};

const neutral = {
  0: '#FFFFFF',
  25: '#F9F9FA',
  50: '#F2F2F3',
  100: '#EAEBEC',
  150: '#DCDEE0',
  200: '#CFD1D3',
  250: '#C4C7CA',
  300: '#B9BDC0',
  350: '#AFB3B6',
  400: '#A4A9AD',
  450: '#999FA3',
  500: '#8F9599',
  550: '#878D92',
  600: '#7E858B',
  650: '#72797E',
  700: '#686E73',
  750: '#5E6468',
  800: '#555A5E',
  850: '#494D50',
  900: '#3D4043',
  950: '#303336',
  1000: '#242728',
};

const bgPopup = '#00000066';

const brandAlpha = {
  '1': '#05966903',
  '2': '#05966905',
  '3': '#05966908',
  '4': '#0596690A',
  '5': '#0596690D',
  '6': '#0596690F',
  '7': '#05966912',
  '8': '#05966914',
  '9': '#05966917',
  '10': '#0596691A',
  '15': '#05966926',
  '20': '#05966933',
  '25': '#05966940',
  '30': '#0596694D',
  '35': '#05966959',
  '40': '#05966966',
  '45': '#05966973',
  '50': '#05966980',
  '55': '#0596698C',
  '60': '#05966999',
  '65': '#059669A6',
  '70': '#059669B2',
  '75': '#059669BF',
  '80': '#059669CC',
  '85': '#059669D9',
  '90': '#059669E5',
  '95': '#059669F2',
  '100': '#059669',
};

const chip = {
  sur1: '#FFF3A3',
  sur2: '#FFD6FF',
  sur3: '#E8E6FF',
  sur4: '#D0FBF8',
  sur5: '#FCE9D1',
  text1: '#7A6500',
  text2: '#8E008E',
  text3: '#3B2ABF',
  text4: '#0A6B5B',
  text5: '#8B5E2A',
  text6: '#1A6B42',
};

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: [
    { pattern: /^(bg|text|border|ring|shadow)-(error|warning|success)-(\d+)$/ },
    { pattern: /^(bg|text|border)-(gray)-(\d+)$/ },
  ],
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        sans: ['"Roboto"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        heading: ['"Roboto"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Roboto Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      fontSize: {
        'heading-1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'heading-2': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'heading-3': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'heading-3-1': ['28px', { lineHeight: '36px', fontWeight: '600' }],

        'title-1': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'title-1-sb': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'title-2': ['20px', { lineHeight: '28px', fontWeight: '700' }],
        'title-2-sb': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'title-2-rg': ['20px', { lineHeight: '28px', fontWeight: '400' }],
        'title-3': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        'title-3-sb': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'title-3-rg': ['18px', { lineHeight: '26px', fontWeight: '400' }],

        'body-1': ['16px', { lineHeight: '24px', fontWeight: '700' }],
        'body-1-sb': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'body-1-rg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-2': ['14px', { lineHeight: '20px', fontWeight: '700' }],
        'body-2-sb': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'body-2-rg': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-3': ['12px', { lineHeight: '18px', fontWeight: '700' }],
        'body-3-sb': ['12px', { lineHeight: '18px', fontWeight: '600' }],
        'body-3-rg': ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },

      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ...primary,
          alpha: brandAlpha,
        },
        gray,
        error,
        warning,
        success,
        red,
        green,
        blue,
        orange,
        neutral,
        chip,
        bgPopup,

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
      },

      borderRadius: {
        none: '0',
        sm: '4px',
        md: '6px',
        DEFAULT: '8px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },

      boxShadow: {
        sm: '0 1px 2px 0 rgba(16,24,40,0.05)',
        md: '0 4px 6px -2px rgba(16,24,40,0.03), 0 12px 16px -4px rgba(16,24,40,0.08)',
        lg: '0 12px 16px -4px rgba(16,24,40,0.08), 0 4px 6px -2px rgba(16,24,40,0.03)',
        xl: '0 20px 24px -4px rgba(16,24,40,0.08), 0 8px 8px -4px rgba(16,24,40,0.03)',
        'focus-ring': '0 0 0 4px rgba(238,0,51,0.12)',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
