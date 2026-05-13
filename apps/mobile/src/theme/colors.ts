export const Colors = {
  // Primary palette
  red: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    300: '#E57373',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1565C0',
    800: '#0D47A1',
    900: '#0D1B3E',
  },

  // Semantic
  background: '#0D1B3E',
  surface: '#1A2D5A',
  surfaceElevated: '#243B6E',
  surfaceHighlight: '#2E4C85',

  primary: '#E53935',
  primaryDark: '#C62828',
  primaryLight: '#EF5350',

  accent: '#42A5F5',
  accentDark: '#1565C0',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#90CAF9',
  textMuted: '#5C7DB5',
  textDisabled: '#3A5080',

  // Status
  success: '#4CAF50',
  warning: '#FFB300',
  error: '#EF5350',

  // Borders
  border: '#1E3A6E',
  borderLight: '#2A4A80',

  // Gradient stops
  gradientStart: '#E53935',
  gradientEnd: '#1565C0',

  // Transparent
  overlay: 'rgba(13, 27, 62, 0.85)',
  overlayLight: 'rgba(13, 27, 62, 0.5)',
  cardOverlay: 'rgba(13, 27, 62, 0.7)',
} as const;

export type ColorKey = keyof typeof Colors;
