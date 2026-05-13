import { Colors } from './colors';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: Colors.textPrimary },
  h2: { fontSize: 26, fontWeight: '700' as const, color: Colors.textPrimary },
  h3: { fontSize: 20, fontWeight: '600' as const, color: Colors.textPrimary },
  h4: { fontSize: 17, fontWeight: '600' as const, color: Colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400' as const, color: Colors.textPrimary },
  bodySmall: { fontSize: 13, fontWeight: '400' as const, color: Colors.textSecondary },
  caption: { fontSize: 11, fontWeight: '400' as const, color: Colors.textMuted },
  button: { fontSize: 16, fontWeight: '700' as const, color: Colors.textPrimary },
  buttonSmall: { fontSize: 14, fontWeight: '600' as const, color: Colors.textPrimary },
  label: { fontSize: 13, fontWeight: '500' as const, color: Colors.textSecondary },
} as const;

export { Colors };
export default { Colors, Spacing, BorderRadius, Typography };
