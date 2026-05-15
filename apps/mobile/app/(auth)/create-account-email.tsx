import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';

export default function CreateAccountEmailScreen() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef<TextInput>(null);

  const validateAndContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError(t('common.error'));
      return;
    }
    setEmailError('');
    router.push({
      pathname: '/(auth)/create-account-password',
      params: { name: name.trim(), email: email.trim() },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={[Colors.background, Colors.surface]}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <View style={styles.container}>
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progress}>
            <View style={styles.progressDotDone} />
            <View style={[styles.progressLine, styles.progressLineDone]} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressLine} />
            <View style={styles.progressDot} />
          </View>

          <View style={styles.illustrationArea}>
            <Text style={styles.illustrationEmoji}>✉️</Text>
          </View>

          <Text style={styles.title}>{t('auth.createAccount.step2Title')}</Text>
          <Text style={styles.subtitle}>{t('auth.createAccount.step2Subtitle')}</Text>

          <View style={styles.form}>
            <Input
              label={t('profile.name')}
              placeholder={t('auth.createAccount.namePlaceholder')}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <Input
              ref={emailRef}
              label={t('auth.login.email')}
              placeholder={t('auth.createAccount.emailPlaceholder')}
              value={email}
              onChangeText={(v) => { setEmail(v); setEmailError(''); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={emailError}
              returnKeyType="done"
              onSubmitEditing={validateAndContinue}
            />
          </View>

          <View style={styles.actions}>
            <Button
              title={t('auth.createAccount.step2Button')}
              gradient
              onPress={validateAndContinue}
              disabled={!email.trim()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  kav: { flex: 1 },
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
  progressDotDone: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
  },
  progressDotActive: { backgroundColor: Colors.primary, width: 24, borderRadius: 5 },
  progressLine: { width: 30, height: 2, backgroundColor: Colors.border },
  progressLineDone: { backgroundColor: Colors.success },
  illustrationArea: { alignItems: 'center', marginBottom: Spacing.lg },
  illustrationEmoji: { fontSize: 80 },
  title: { ...Typography.h2, marginBottom: 6 },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.lg },
  form: { gap: Spacing.md, marginBottom: Spacing.xl, flex: 1 },
  actions: { gap: Spacing.md },
});
