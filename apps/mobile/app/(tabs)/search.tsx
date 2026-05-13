import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { MOCK_STORIES, STORY_THEMES, THEME_EMOJIS, type StoryTheme } from '@/data/stories';
import { ThemeChip } from '@/components/shared/ListComponents';

const POPULAR_SEARCHES = ['dragon', 'adventure', 'magic', 'space', 'forest', 'mystery'];

export default function SearchScreen() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState<StoryTheme | 'all'>('all');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return MOCK_STORIES.filter((story) => {
      const matchesTheme = activeTheme === 'all' || story.theme === activeTheme;
      if (!q) return matchesTheme;

      const lang = i18n.language;
      const title =
        lang === 'es' ? story.titleEs : lang === 'pt-BR' ? story.titlePtBR : story.title;
      const desc =
        lang === 'es'
          ? story.descriptionEs
          : lang === 'pt-BR'
          ? story.descriptionPtBR
          : story.description;

      const matchesQuery =
        title.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        story.characters.some((c) => c.toLowerCase().includes(q)) ||
        story.theme.includes(q);

      return matchesTheme && matchesQuery;
    });
  }, [query, activeTheme, i18n.language]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header + Search input */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('search.title')}</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('search.placeholder')}
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
            selectionColor={Colors.primary}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Theme filter */}
      <View style={styles.themeFilter}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={(['all', ...STORY_THEMES] as (StoryTheme | 'all')[])}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.themeFilterContent}
          renderItem={({ item }) => (
            <ThemeChip
              label={item === 'all' ? t('home.themes.all') : t(`home.themes.${item}`)}
              emoji={item !== 'all' ? THEME_EMOJIS[item] : undefined}
              selected={activeTheme === item}
              onPress={() => setActiveTheme(item)}
            />
          )}
        />
      </View>

      {/* Popular searches (when no query) */}
      {!query && (
        <View style={styles.popular}>
          <Text style={styles.popularLabel}>{t('search.popular')}</Text>
          <View style={styles.popularChips}>
            {POPULAR_SEARCHES.map((term) => (
              <TouchableOpacity
                key={term}
                style={styles.popularChip}
                onPress={() => setQuery(term)}
              >
                <Text style={styles.popularChipText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      {query || activeTheme !== 'all' ? (
        results.length > 0 ? (
          <>
            <Text style={styles.resultsCount}>
              {results.length} {t('search.results')}
            </Text>
            <FlatList
              data={results}
              keyExtractor={(s) => s.id}
              contentContainerStyle={styles.resultsList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: story }) => {
                const lang = i18n.language;
                const title =
                  lang === 'es'
                    ? story.titleEs
                    : lang === 'pt-BR'
                    ? story.titlePtBR
                    : story.title;
                const desc =
                  lang === 'es'
                    ? story.descriptionEs
                    : lang === 'pt-BR'
                    ? story.descriptionPtBR
                    : story.description;

                return (
                  <TouchableOpacity
                    style={styles.resultRow}
                    activeOpacity={0.85}
                    onPress={() => router.push(`/story/${story.id}`)}
                  >
                    <View style={styles.resultThumb}>
                      <LinearGradient
                        colors={story.gradientColors}
                        style={StyleSheet.absoluteFill}
                      />
                      <Text style={styles.resultThumbEmoji}>{story.emoji}</Text>
                    </View>
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultTitle} numberOfLines={1}>
                        {title}
                      </Text>
                      <Text style={styles.resultDesc} numberOfLines={2}>
                        {desc}
                      </Text>
                      <View style={styles.resultMeta}>
                        <View style={styles.themeTag}>
                          <Text style={styles.themeTagText}>
                            {THEME_EMOJIS[story.theme]} {t(`home.themes.${story.theme}`)}
                          </Text>
                        </View>
                        <Text style={styles.resultMetaText}>
                          {story.ageMin}–{story.ageMax}y
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                  </TouchableOpacity>
                );
              }}
            />
          </>
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsEmoji}>🔍</Text>
            <Text style={styles.noResultsTitle}>{t('search.noResults')}</Text>
            <Text style={styles.noResultsSubtitle}>{t('search.noResultsSubtitle')}</Text>
          </View>
        )
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  headerTitle: { ...Typography.h2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    height: 48,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 16,
    height: '100%',
  },
  themeFilter: { marginBottom: Spacing.md },
  themeFilterContent: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  popular: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  popularLabel: { ...Typography.label, textTransform: 'uppercase', letterSpacing: 1 },
  popularChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  popularChip: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  popularChipText: { ...Typography.bodySmall, fontWeight: '500' },
  resultsCount: {
    ...Typography.caption,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    color: Colors.textMuted,
  },
  resultsList: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: 16 },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultThumb: {
    width: 64,
    height: 86,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultThumbEmoji: { fontSize: 32 },
  resultInfo: { flex: 1, gap: 4 },
  resultTitle: { ...Typography.h4, fontSize: 15 },
  resultDesc: { ...Typography.bodySmall, lineHeight: 18 },
  resultMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  themeTag: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  themeTagText: { ...Typography.caption, fontWeight: '600' },
  resultMetaText: { ...Typography.caption },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  noResultsEmoji: { fontSize: 64 },
  noResultsTitle: { ...Typography.h3, textAlign: 'center' },
  noResultsSubtitle: { ...Typography.bodySmall, textAlign: 'center' },
});
