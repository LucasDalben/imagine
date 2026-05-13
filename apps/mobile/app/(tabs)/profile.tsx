import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { useAuthStore } from '@/stores/authStore';
import { useLanguageStore, SUPPORTED_LANGUAGES, type LanguageCode } from '@/stores/languageStore';
import { useReadingStore } from '@/stores/readingStore';
import { MOCK_STORIES } from '@/data/stories';

const AVATAR_OPTIONS = ['🦁', '⭐', '🐉', '🦊', '🦉', '🐢', '🚀', '🌙'];

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, logout, updateProfile } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();
  const { progress, downloads, favorites } = useReadingStore();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name ?? '');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const storiesRead = Object.values(progress).length;
  const downloadCount = Object.values(downloads).length;
  const favCount = favorites.length;

  const handleSave = async () => {
    await updateProfile({ name: editName.trim() || (user?.name ?? '') });
    setEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(t('profile.logout'), '', [
      { text: t('common.confirm'), style: 'destructive', onPress: logout },
      { text: t('common.cancel') },
    ]);
  };

  const currentLangLabel =
    SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeLabel ?? 'English';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>{t('profile.title')}</Text>
        </View>

        {/* Avatar + name */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarCircle}
            onPress={() => setShowAvatarPicker((v) => !v)}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.accentDark]}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.avatarEmoji}>{user?.avatarEmoji ?? '⭐'}</Text>
            <View style={styles.avatarEditBadge}>
              <Ionicons name="pencil" size={10} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Avatar picker */}
          {showAvatarPicker && (
            <View style={styles.avatarPickerRow}>
              {AVATAR_OPTIONS.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.avatarOption,
                    user?.avatarEmoji === emoji && styles.avatarOptionSelected,
                  ]}
                  onPress={async () => {
                    await updateProfile({ avatarEmoji: emoji });
                    setShowAvatarPicker(false);
                  }}
                >
                  <Text style={styles.avatarOptionEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {editing ? (
            <View style={styles.nameEditRow}>
              <TextInput
                style={styles.nameInput}
                value={editName}
                onChangeText={setEditName}
                autoFocus
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.textMuted}
              />
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.saveBtnText}>{t('common.save')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.nameRow} onPress={() => setEditing(true)}>
              <Text style={styles.userName}>{user?.name ?? t('home.guest')}</Text>
              <Ionicons name="pencil-outline" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          )}

          <Text style={styles.userEmail}>{user?.email ?? ''}</Text>
          <View style={[styles.subBadge, user?.subscription === 'premium' && styles.subBadgePremium]}>
            <Text style={styles.subBadgeText}>
              {user?.subscription === 'premium' ? `✨ ${t('profile.premium')}` : t('profile.free')}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{storiesRead}</Text>
            <Text style={styles.statLabel}>{t('profile.storiesRead')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{downloadCount}</Text>
            <Text style={styles.statLabel}>{t('downloads.title')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favCount}</Text>
            <Text style={styles.statLabel}>{t('profile.favorites')}</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('profile.settings')}</Text>

          {/* Language */}
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowLanguageModal((v) => !v)}
          >
            <View style={styles.settingIcon}>
              <Ionicons name="language-outline" size={20} color={Colors.accent} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('language.changeLanguage')}</Text>
              <Text style={styles.settingValue}>{currentLangLabel}</Text>
            </View>
            <Ionicons
              name={showLanguageModal ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={Colors.textMuted}
            />
          </TouchableOpacity>

          {showLanguageModal && (
            <View style={styles.languageOptions}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.languageOptionActive,
                  ]}
                  onPress={async () => {
                    await setLanguage(lang.code as LanguageCode);
                    setShowLanguageModal(false);
                  }}
                >
                  <Text style={styles.languageOptionText}>{lang.nativeLabel}</Text>
                  {language === lang.code && (
                    <Ionicons name="checkmark" size={16} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Subscription */}
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons name="star-outline" size={20} color={Colors.warning} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('profile.subscription')}</Text>
              <Text style={styles.settingValue}>
                {user?.subscription === 'premium' ? t('profile.premium') : t('profile.free')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          {/* Children profiles */}
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons name="people-outline" size={20} color={Colors.accent} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('profile.children')}</Text>
              <Text style={styles.settingValue}>{t('profile.addChild')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>{t('profile.logout')}</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 16 },
  pageHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  pageTitle: { ...Typography.h2 },

  avatarSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: 8,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarEmoji: { fontSize: 52 },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  avatarPickerRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceElevated,
  },
  avatarOptionSelected: { backgroundColor: Colors.primary },
  avatarOptionEmoji: { fontSize: 28 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  userName: { ...Typography.h3 },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  nameInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.textPrimary,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  saveBtn: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  saveBtnText: { ...Typography.buttonSmall },
  userEmail: { ...Typography.bodySmall, color: Colors.textMuted },
  subBadge: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  subBadgePremium: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.warning,
  },
  subBadgeText: { ...Typography.bodySmall, fontWeight: '700' },

  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statNumber: { ...Typography.h2 },
  statLabel: { ...Typography.caption, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: 4 },

  section: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  sectionLabel: {
    ...Typography.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: { flex: 1 },
  settingTitle: { ...Typography.body, fontWeight: '500' },
  settingValue: { ...Typography.bodySmall },

  languageOptions: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginTop: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: 2,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  languageOptionActive: { backgroundColor: Colors.surfaceElevated },
  languageOptionText: { ...Typography.body },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: 'rgba(239, 83, 80, 0.1)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 83, 80, 0.3)',
  },
  logoutText: { ...Typography.body, color: Colors.error, fontWeight: '600' },
});
