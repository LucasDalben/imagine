import React, { forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { Colors, BorderRadius, Typography } from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    return (
      <View style={styles.container}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <TextInput
          ref={ref}
          style={[styles.input, error ? styles.inputError : null, style]}
          placeholderTextColor={Colors.textMuted}
          selectionColor={Colors.primary}
          {...props}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: {
    ...Typography.label,
    marginLeft: 4,
  },
  input: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: Colors.textPrimary,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    ...Typography.caption,
    color: Colors.error,
    marginLeft: 4,
  },
});
