import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Typography } from '@/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  gradient?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  gradient = false,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyle = sizes[size];
  const variantStyle = variants[variant];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : Colors.textPrimary} />
      ) : (
        <Text style={[Typography.button, sizeStyle.text, variantStyle.text]}>{title}</Text>
      )}
    </>
  );

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity
        style={[styles.base, sizeStyle.container, { overflow: 'hidden' }, style]}
        disabled={disabled || loading}
        activeOpacity={0.85}
        {...props}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.accentDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, styles.gradientInner]}
        />
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.base,
        sizeStyle.container,
        variantStyle.container,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.85}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.full,
  },
  disabled: { opacity: 0.5 },
  gradientInner: { borderRadius: BorderRadius.full },
});

const sizes = {
  sm: {
    container: { paddingVertical: 8, paddingHorizontal: 20, minHeight: 38 },
    text: { fontSize: 14 },
  },
  md: {
    container: { paddingVertical: 14, paddingHorizontal: 28, minHeight: 50 },
    text: { fontSize: 16 },
  },
  lg: {
    container: { paddingVertical: 18, paddingHorizontal: 32, minHeight: 58 },
    text: { fontSize: 18 },
  },
};

const variants = {
  primary: {
    container: { backgroundColor: Colors.primary },
    text: { color: Colors.textPrimary },
  },
  secondary: {
    container: { backgroundColor: Colors.surfaceElevated },
    text: { color: Colors.textPrimary },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: Colors.primary,
    },
    text: { color: Colors.primary },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: Colors.textSecondary },
  },
};
