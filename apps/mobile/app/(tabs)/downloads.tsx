import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { useReadingStore } from '@/stores/readingStore';
import { getStoryById, MOCK_STORIES } from '@/data/stories';

export default function DownloadsScreen() {
  const { t, i18n } = useTranslation();
  const { downloads, removeDownload, getProgress } = useReadingStore();

  const downloadedStories = MOCK_STORIES.filter((s) => !!downloads[s.id]);

  const handleRemove = (storyId: string) => {
    Alert.alert(t('downloads.remove'), '', [
      {
        text: t('common.confirm'),
        style: 'destructive',
        onPress: () => removeDownload(storyId),
      },
      { text: t('common.cancel') },
    ]);
  };

  if (downloadedStories.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('downloads.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('downloads.subtitle')}</Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📥</Text>
          <Text style={styles.emptyTitle}>{t('downloads.empty')}</Text>
          <Text style={styles.emptySubtitle}>{t('downloads.emptySubtitle')}</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.push('/(tabs)/search')}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.accentDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.browseBtnText}>Browse Stories</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('downloads.title')}</Text>
        <Text style={styles.headerSubtitle}>
          {downloadedStories.length} {t('downloads.downloaded')}
        </Text>
      </View>

      <FlatList
        data={downloadedStories}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: story }) => {
          const lang = i18n.language;
          const title =
            lang === 'es' ? story.titleEs : lang === 'pt-BR' ? story.titlePtBR : story.title;
          const progress = getProgress(story.id);
          const dl = downloads[story.id];

          return (
            <TouchableOpacity
              style={styles.storyRow}
              activeOpacity={0.85}
              onPress={() => router.push(`/story/${story.id}`)}
            >
              {/* Thumbnail */}
              <View style={styles.thumbnail}>
                <LinearGradient
                  colors={story.gradientColors}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.thumbnailEmoji}>{story.emoji}</Text>
              </View>

              {/* Info */}
              <View style={styles.storyInfo}>
                <Text style={styles.storyTitle} numberOfLines={2}>
                  {title}
                </Text>
                <View style={styles.storyMeta}>
                  <View style={styles.offlineBadge}>
                    <Ionicons name="cloud-offline-outline" size={12} color={Colors.success} />
                    <Text style={styles.offlineBadgeText}>{t('downloads.downloaded')}</Text>
                  </View>
                  <Text style={styles.storyMetaText}>
                    {dl?.sizeMB} {t('downloads.size')}
                  </Text>
                </View>
                {progress && progress.currentPage > 1 && (
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(
                            100,
                            (progress.currentPage / story.totalPages) * 100,
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                )}
              </View>

              {/* Remove button */}
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemove(story.id)}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: { ...Typography.h2 },
  headerSubtitle: { ...Typography.bodySmall, marginTop: 4 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
  emptyEmoji: { fontSize: 80 },
  emptyTitle: { ...Typography.h3, textAlign: 'center' },
  emptySubtitle: { ...Typography.bodySmall, textAlign: 'center' },
  browseBtn: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.full,
    paddingVertical: 14,
    paddingHorizontal: 32,
    overflow: 'hidden',
  },
  browseBtnText: { ...Typography.button },

  list: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: 16 },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thumbnail: {
    width: 72,
    height: 96,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailEmoji: { fontSize: 36 },
  storyInfo: { flex: 1, gap: 4 },
  storyTitle: { ...Typography.h4, fontSize: 15 },
  storyMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  offlineBadgeText: { ...Typography.caption, color: Colors.success, fontWeight: '600' },
  storyMetaText: { ...Typography.caption },
  progressBar: {
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
