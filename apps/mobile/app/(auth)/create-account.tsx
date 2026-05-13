import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/shared/Button';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';

export default function CreateAccountScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.background, Colors.surface]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Progress indicator */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>

        {/* Illustration */}
        <View style={styles.illustrationArea}>
          <View style={styles.illustrationCircle}>
            <LinearGradient
              colors={[Colors.primary, Colors.accentDark]}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.illustrationEmoji}>🌟</Text>
          </View>
        </View>

        {/* Text */}
        <View style={styles.textArea}>
          <Text style={styles.title}>{t('auth.createAccount.step1Title')}</Text>
          <Text style={styles.subtitle}>{t('auth.createAccount.step1Subtitle')}</Text>
        </View>

        {/* Feature bullets */}
        <View style={styles.features}>
          {[
            { emoji: '📚', text: 'Thousands of interactive stories' },
            { emoji: '🎮', text: 'Choose-your-own-adventure gameplay' },
            { emoji: '🌍', text: 'Available in 3 languages' },
            { emoji: '📥', text: 'Download & read offline' },
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureEmoji}>{f.emoji}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            title={t('auth.createAccount.step1Button')}
            gradient
            onPress={() => router.push('/(auth)/create-account-email')}
          />
          <View style={styles.signInRow}>
            <Text style={styles.signInText}>{t('auth.createAccount.alreadyHaveAccount')} </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)')}>
              <Text style={styles.signInLink}>{t('auth.createAccount.signIn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backText: { fontSize: 22, color: Colors.textPrimary },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    alignSelf: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  progressDotActive: { backgroundColor: Colors.primary, width: 24, borderRadius: 5 },
  progressLine: { width: 30, height: 2, backgroundColor: Colors.border },
  illustrationArea: { alignItems: 'center', marginBottom: Spacing.xl },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: { fontSize: 64 },
  textArea: { marginBottom: Spacing.lg },
  title: { ...Typography.h1, marginBottom: 8 },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  features: { gap: Spacing.sm, marginBottom: Spacing.xl, flex: 1 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureEmoji: { fontSize: 24, width: 36 },
  featureText: { ...Typography.body, flex: 1 },
  actions: { gap: Spacing.md },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: { ...Typography.bodySmall },
  signInLink: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '700' },
});
