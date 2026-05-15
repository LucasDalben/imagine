import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { THEME_EMOJIS, type Story } from '@/data/stories';
import { fetchStoryById } from '@/services/storiesService';
import { useReadingStore } from '@/stores/readingStore';
import { Button } from '@/components/shared/Button';

const { width, height } = Dimensions.get('window');

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { getProgress, downloadStory, removeDownload, isDownloaded, isFavorite, toggleFavorite } =
    useReadingStore();
  const [downloading, setDownloading] = useState(false);
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoryById(id ?? '').then((s) => {
      setStory(s);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.notFound}>
        <Text style={Typography.h3}>Loading...</Text>
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.notFound}>
        <Text style={Typography.h3}>Story not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.accent }}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lang = i18n.language;
  const title =
    lang === 'es' ? story.titleEs : lang === 'pt-BR' ? story.titlePtBR : story.title;
  const description =
    lang === 'es'
      ? story.descriptionEs
      : lang === 'pt-BR'
      ? story.descriptionPtBR
      : story.description;

  const progress = getProgress(story.id);
  const downloaded = isDownloaded(story.id);
  const favorited = isFavorite(story.id);

  const handleDownload = async () => {
    if (downloaded) {
      Alert.alert('', t('downloads.downloaded'), [
        { text: t('downloads.remove'), style: 'destructive', onPress: () => removeDownload(story.id) },
        { text: t('common.cancel') },
      ]);
      return;
    }
    setDownloading(true);
    // Simulate download
    await new Promise((r) => setTimeout(r, 1500));
    await downloadStory(story.id, story.downloadSizeMB);
    setDownloading(false);
  };

  const handleStart = () => {
    const startPage = progress?.currentPage ?? 1;
    router.push({
      pathname: '/story/read/[id]',
      params: { id: story.id, page: startPage },
    });
  };

  return (
    <View style={styles.container}>
      {/* Hero image area — ~55% of screen */}
      <View style={styles.heroArea}>
        <Image
          source={{ uri: story.coverImage }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <Text style={styles.heroEmoji}>{story.emoji}</Text>

        {/* Top nav */}
        <SafeAreaView style={styles.topNav} edges={['top']}>
          <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => toggleFavorite(story.id)}>
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={22}
              color={favorited ? Colors.primary : Colors.textPrimary}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Content area */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme chip + age */}
        <View style={styles.metaRow}>
          <View style={styles.themePill}>
            <Text style={styles.themePillText}>
              {THEME_EMOJIS[story.theme]} {t(`home.themes.${story.theme}`)}
            </Text>
          </View>
          <Text style={styles.ageMeta}>
            {story.ageMin}–{story.ageMax} {t('story.detail.ageRange')}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Start / Continue button */}
        <Button
          title={
            progress && progress.currentPage > 1
              ? t('story.detail.continue')
              : t('story.detail.start')
          }
          gradient
          size="lg"
          onPress={handleStart}
          style={styles.startBtn}
        />

        {/* Description */}
        <Text style={styles.sectionLabel}>{t('story.detail.about')}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Characters */}
        <Text style={styles.sectionLabel}>{t('story.detail.characters')}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.charactersRow}
        >
          {story.characters.map((char) => (
            <View key={char} style={styles.characterChip}>
              <Text style={styles.characterChipText}>{char}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{story.totalPages}</Text>
            <Text style={styles.statLabel}>{t('story.detail.pages')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{story.readingLevel}</Text>
            <Text style={styles.statLabel}>level</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{story.downloadSizeMB} MB</Text>
            <Text style={styles.statLabel}>{t('downloads.title')}</Text>
          </View>
        </View>

        {/* Download button */}
        <Button
          title={
            downloading
              ? t('story.detail.downloading')
              : downloaded
              ? t('story.detail.downloaded')
              : t('story.detail.download')
          }
          variant={downloaded ? 'secondary' : 'outline'}
          loading={downloading}
          onPress={handleDownload}
          style={styles.downloadBtn}
        />

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },

  heroArea: {
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroEmoji: { fontSize: 120 },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  navBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -24,
  },
  contentInner: { padding: Spacing.lg },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  themePill: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  themePillText: { ...Typography.caption, fontWeight: '600' },
  ageMeta: { ...Typography.caption, color: Colors.textMuted },

  title: { ...Typography.h1, marginBottom: Spacing.md },

  startBtn: { marginBottom: Spacing.lg },

  sectionLabel: {
    ...Typography.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  description: { ...Typography.body, lineHeight: 24, color: Colors.textSecondary },

  charactersRow: { gap: Spacing.sm, paddingVertical: 4 },
  characterChip: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  characterChipText: { ...Typography.bodySmall, fontWeight: '600', color: Colors.accent },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { ...Typography.h4 },
  statLabel: { ...Typography.caption },
  statDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: Spacing.sm },

  downloadBtn: { marginTop: Spacing.sm },
});
