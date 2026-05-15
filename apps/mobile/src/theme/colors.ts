export const Colors = {
  // =========================
  // GREEN PRIMARY PALETTE
  // =========================
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // =========================
  // BLUE SUPPORT PALETTE
  // =========================
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#172554',
  },

  // =========================
  // YELLOW HIGHLIGHTS
  // =========================
  yellow: {
    100: '#FEF9C3',
    300: '#FDE047',
    500: '#FACC15',
    700: '#CA8A04',
  },

  // =========================
  // BACKGROUNDS
  // =========================
  background: '#081C15',
  surface: '#0F2A20',
  surfaceElevated: '#163828',
  surfaceHighlight: '#1F4A36',

  // =========================
  // PRIMARY BRAND
  // =========================
  primary: '#22C55E',
  primaryDark: '#15803D',
  primaryLight: '#4ADE80',

  // Accent / interactive
  accent: '#3B82F6',
  accentDark: '#1D4ED8',

  // Highlight / CTA secondary
  highlight: '#FACC15',

  // =========================
  // TEXT
  // =========================
  textPrimary: '#FFFFFF',
  textSecondary: '#D1FAE5',
  textMuted: '#A7CDB8',
  textDisabled: '#6B8F7A',

  // Text on bright buttons/cards
  textOnPrimary: '#052E16',
  textOnAccent: '#FFFFFF',
  textOnHighlight: '#3B2F00',

  // =========================
  // STATUS
  // =========================
  success: '#22C55E',
  warning: '#FACC15',
  error: '#EF4444',

  // =========================
  // BORDERS
  // =========================
  border: '#1D4D38',
  borderLight: '#2E6A4F',

  // =========================
  // GRADIENTS
  // =========================
  gradientStart: '#22C55E',
  gradientMiddle: '#3B82F6',
  gradientEnd: '#FACC15',

  // =========================
  // OVERLAYS
  // =========================
  overlay: 'rgba(8, 28, 21, 0.88)',
  overlayLight: 'rgba(8, 28, 21, 0.55)',
  cardOverlay: 'rgba(15, 42, 32, 0.78)',
} as const;

export type ColorKey = keyof typeof Colors;