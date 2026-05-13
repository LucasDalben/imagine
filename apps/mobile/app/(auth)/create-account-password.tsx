import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Colors, Typography, Spacing } from '@/theme';
import { useAuthStore } from '@/stores/authStore';

export default function CreateAccountPasswordScreen() {
  const { t } = useTranslation();
  const { name, email } = useLocalSearchParams<{ name: string; email: string }>();
  const { createAccount } = useAuthStore();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await createAccount(name ?? 'Explorer', email ?? '', password);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('', t('common.error'));
    } finally {
      setLoading(false);
    }
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
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progress}>
            <View style={styles.progressDotDone} />
            <View style={[styles.progressLine, styles.progressLineDone]} />
            <View style={styles.progressDotDone} />
            <View style={[styles.progressLine, styles.progressLineDone]} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>

          <View style={styles.illustrationArea}>
            <Text style={styles.illustrationEmoji}>🔐</Text>
          </View>

          <Text style={styles.title}>{t('auth.createAccount.step3Title')}</Text>
          <Text style={styles.subtitle}>{t('auth.createAccount.step3Subtitle')}</Text>

          <View style={styles.form}>
            <View>
              <Input
                label={t('auth.login.password')}
                placeholder={t('auth.createAccount.passwordPlaceholder')}
                value={password}
                onChangeText={(v) => { setPassword(v); setError(''); }}
                secureTextEntry={!showPwd}
                autoComplete="new-password"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPwd((v) => !v)}
              >
                <Ionicons
                  name={showPwd ? 'eye-off' : 'eye'}
                  size={20}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Input
                label={t('auth.createAccount.confirmPasswordPlaceholder')}
                placeholder={t('auth.createAccount.confirmPasswordPlaceholder')}
                value={confirm}
                onChangeText={(v) => { setConfirm(v); setError(''); }}
                secureTextEntry={!showConfirm}
                autoComplete="new-password"
                error={error}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowConfirm((v) => !v)}
              >
                <Ionicons
                  name={showConfirm ? 'eye-off' : 'eye'}
                  size={20}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Password strength */}
            <View style={styles.strengthRow}>
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.strengthBar,
                    password.length > i * 3 && styles.strengthBarFilled,
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title={t('auth.createAccount.step3Button')}
              gradient
              loading={loading}
              onPress={handleCreate}
              disabled={!password || !confirm}
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
  eyeBtn: { position: 'absolute', right: 14, bottom: 14 },
  strengthRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: -4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  strengthBarFilled: { backgroundColor: Colors.success },
  actions: { gap: Spacing.md },
});
