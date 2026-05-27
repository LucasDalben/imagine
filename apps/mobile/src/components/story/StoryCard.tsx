import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Colors, BorderRadius, Typography, Spacing } from '@/theme';
import type { Story } from '@/data/stories';
import { getStoryCoverSource, hasLocalCoverImage } from '@/data/storyLocalImages';
import { useTranslation } from 'react-i18next';

interface StoryCardProps {
  story: Story;
  size?: 'sm' | 'md' | 'lg';
}

function getLocalizedTitle(story: Story, language: string): string {
  if (language === 'es') return story.titleEs;
  if (language === 'pt-BR') return story.titlePtBR;
  return story.title;
}

export function StoryCard({ story, size = 'md' }: StoryCardProps) {
  const { i18n } = useTranslation();
  const title = getLocalizedTitle(story, i18n.language);

  const cardStyle = cardSizes[size];

  return (
    <TouchableOpacity
      style={[styles.card, cardStyle.card]}
      activeOpacity={0.88}
      onPress={() => router.push(`/story/${story.id}`)}
    >
      <Image
        source={getStoryCoverSource(story.id, story.coverImage) ?? { uri: '' }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      {/* Emoji illustration */}
      {!hasLocalCoverImage(story.id) && (
        <View style={styles.emojiContainer}>
          <Text style={[styles.emoji, cardStyle.emoji]}>{story.emoji}</Text>
        </View>
      )}

      {/* Bottom info */}
      <View style={styles.info}>
        <Text style={[styles.title, cardStyle.title]} numberOfLines={2}>
          {title}
        </Text>
        {size !== 'sm' && (
          <View style={styles.meta}>
            <Text style={styles.metaText}>
              {story.totalPages} {story.totalPages === 1 ? 'p' : 'p'}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.metaText}>
              {story.ageMin}–{story.ageMax}y
            </Text>
          </View>
        )}
      </View>

      {story.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  emojiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { textAlign: 'center' },
  info: {
    padding: Spacing.sm,
    backgroundColor: Colors.cardOverlay,
  },
  title: {
    ...Typography.h4,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  metaText: { ...Typography.caption, color: Colors.textSecondary },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  newBadgeText: { ...Typography.caption, fontWeight: '700', color: '#fff' },
});

const cardSizes = {
  sm: {
    card: { width: 110, height: 150 },
    emoji: { fontSize: 40 },
    title: { fontSize: 12 },
  },
  md: {
    card: { width: 140, height: 190 },
    emoji: { fontSize: 52 },
    title: { fontSize: 14 },
  },
  lg: {
    card: { width: 200, height: 280 },
    emoji: { fontSize: 72 },
    title: { fontSize: 16 },
  },
};
