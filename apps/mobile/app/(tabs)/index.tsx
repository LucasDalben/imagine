import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { useAuthStore } from '@/stores/authStore';
import { StoryCard } from '@/components/story/StoryCard';
import {
  SectionHeader,
  HorizontalList,
  ThemeChip,
} from '@/components/shared/ListComponents';
import { MagicRing } from '@/components/shared/MagicRing';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import {
  STORY_THEMES,
  THEME_EMOJIS,
  type StoryTheme,
  type Story,
} from '@/data/stories';
import {
  fetchAllStories,
  fetchFeaturedStory,
  fetchRecommendedStories,
  fetchStoriesByTheme,
} from '@/services/storiesService';

const { width } = Dimensions.get('window');

function FeaturedCard({ story }: { story: Story }) {
  const { t, i18n } = useTranslation();

  const title =
    i18n.language === 'es'
      ? story.titleEs
      : i18n.language === 'pt-BR'
      ? story.titlePtBR
      : story.title;

  const description =
    i18n.language === 'es'
      ? story.descriptionEs
      : i18n.language === 'pt-BR'
      ? story.descriptionPtBR
      : story.description;

  return (
    <TouchableOpacity
      style={styles.featuredCard}
      activeOpacity={0.9}
      onPress={() => router.push(`/story/${story.id}`)}
    >
      <Image
        source={{ uri: story.coverImage }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      {/* Big emoji illustration */}
      <View style={styles.featuredIllustration}>
        <Text style={styles.featuredEmoji}>{story.emoji}</Text>
      </View>

      {/* Info overlay at bottom */}
      <LinearGradient
        colors={['transparent', Colors.overlay]}
        style={styles.featuredOverlay}
      >
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>{t('home.featured').toUpperCase()}</Text>
        </View>
        <Text style={styles.featuredTitle}>{title}</Text>
        <Text style={styles.featuredDescription} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredMetaText}>
            {story.totalPages} {t('story.detail.pages')} · {story.ageMin}–{story.ageMax}{' '}
            {t('story.detail.ageRange')}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedTheme, setSelectedTheme] = useState<StoryTheme | 'all'>('all');
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [featuredStory, setFeaturedStory] = useState<Story | null>(null);
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [storiesByTheme, setStoriesByTheme] = useState<Story[]>([]);

  useEffect(() => {
    fetchFeaturedStory().then(setFeaturedStory);
    fetchRecommendedStories().then(setRecommended);
    fetchAllStories().then(setAllStories);
  }, []);

  useEffect(() => {
    if (selectedTheme !== 'all') {
      fetchStoriesByTheme(selectedTheme).then(setStoriesByTheme);
    }
  }, [selectedTheme]);

  const displayedStories = selectedTheme === 'all' ? allStories : storiesByTheme;

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <MagicRing />
      <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {t('home.greeting')} {user?.name ?? t('home.guest')} 👋
            </Text>
            <Text style={styles.headerSubtitle}>
              {t('home.recommended')}
            </Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <LinearGradient
              colors={[Colors.primary, Colors.accentDark]}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.avatarEmoji}>{user?.avatarEmoji ?? '⭐'}</Text>
          </TouchableOpacity>
        </View>

        {/* Theme tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.themeTabs}
          style={styles.themeTabsScroll}
        >
          <ThemeChip
            label={t('home.themes.all')}
            selected={selectedTheme === 'all'}
            onPress={() => setSelectedTheme('all')}
          />
          {STORY_THEMES.map((theme) => (
            <ThemeChip
              key={theme}
              label={t(`home.themes.${theme}`)}
              emoji={THEME_EMOJIS[theme]}
              selected={selectedTheme === theme}
              onPress={() => setSelectedTheme(theme)}
            />
          ))}
        </ScrollView>

        {/* Featured card */}
        {selectedTheme === 'all' && featuredStory && (
          <View style={styles.featuredSection}>
            <FeaturedCard story={featuredStory} />
          </View>
        )}

        {/* Recommended */}
        {selectedTheme === 'all' && (
          <View style={styles.section}>
            <SectionHeader
              title={t('home.recommended')}
              seeAllLabel={t('home.seeAll')}
              onSeeAll={() => router.push('/story/all')}
            />
            <HorizontalList
              data={recommended}
              keyExtractor={(s) => s.id}
              renderItem={(story) => <StoryCard story={story} size="md" />}
            />
          </View>
        )}

        {/* Stories grid by selected theme, or all theme sections */}
        {selectedTheme !== 'all' ? (
          <View style={styles.section}>
            <SectionHeader
              title={t(`home.themeSection.${selectedTheme}`)}
              seeAllLabel={t('home.seeAll')}
            />
            <HorizontalList
              data={displayedStories}
              keyExtractor={(s) => s.id}
              renderItem={(story) => <StoryCard story={story} size="md" />}
            />
          </View>
        ) : (
          STORY_THEMES.map((theme) => {
            const stories = allStories.filter((s) => s.theme === theme);
            if (!stories.length) return null;
            return (
              <View key={theme} style={styles.section}>
                <SectionHeader
                  title={t(`home.themeSection.${theme}`)}
                  seeAllLabel={t('home.seeAll')}
                  onSeeAll={() => setSelectedTheme(theme)}
                />
                <HorizontalList
                  data={stories}
                  keyExtractor={(s) => s.id}
                  renderItem={(story) => <StoryCard story={story} size="md" />}
                />
              </View>
            );
          })
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, overflow: 'hidden' },
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingBottom: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  greeting: { ...Typography.h3, marginBottom: 2 },
  headerSubtitle: { ...Typography.bodySmall },
  avatarBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 26 },
  themeTabsScroll: { marginBottom: Spacing.md },
  themeTabs: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingVertical: 4,
  },
  featuredSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  featuredCard: {
    height: 300,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredIllustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredEmoji: { fontSize: 100 },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  featuredBadgeText: {
    ...Typography.caption,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  featuredTitle: { ...Typography.h2, marginBottom: 6 },
  featuredDescription: { ...Typography.bodySmall, marginBottom: 6, lineHeight: 20 },
  featuredMeta: { flexDirection: 'row' },
  featuredMetaText: { ...Typography.caption },
  section: { marginBottom: Spacing.lg },
  bottomPad: { height: 20 },
});
