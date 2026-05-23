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
  background: '#0A0B10',
  surface: '#0F1018',
  surfaceElevated: '#161820',
  surfaceHighlight: '#1E2130',

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
  textSecondary: '#C8C9D4',
  textMuted: '#8E9099',
  textDisabled: '#55575F',

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
  border: '#252830',
  borderLight: '#343848',

  // =========================
  // GRADIENTS
  // =========================
  gradientStart: '#22C55E',
  gradientMiddle: '#3B82F6',
  gradientEnd: '#FACC15',

  // =========================
  // OVERLAYS
  // =========================
  overlay: 'rgba(10, 11, 16, 0.88)',
  overlayLight: 'rgba(10, 11, 16, 0.55)',
  cardOverlay: 'rgba(15, 16, 24, 0.78)',

  // =========================
  // ENDING SCREENS
  // =========================
  /** Good ending — warm amber/gold gradient top */
  endingGoodFrom: '#D97706',
  /** Good ending — rich amber bottom */
  endingGoodTo: '#78350F',
  /** Bad ending — cold deep indigo top */
  endingBadFrom: '#1E1B4B',
  /** Bad ending — near-black bottom */
  endingBadTo: '#09090F',
} as const;

export type ColorKey = keyof typeof Colors;