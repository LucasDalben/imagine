import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { getStoryById, type StoryPage } from '@/data/stories';
import { useReadingStore } from '@/stores/readingStore';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.6;

export default function StoryReadScreen() {
  const { id, page: pageParam } = useLocalSearchParams<{ id: string; page: string }>();
  const { t, i18n } = useTranslation();
  const { updateProgress } = useReadingStore();

  const story = getStoryById(id ?? '');
  const startPage = parseInt(pageParam ?? '1', 10);
  const [currentPageNumber, setCurrentPageNumber] = useState(startPage || 1);
  const [isEnded, setIsEnded] = useState(false);
  const [isGoodEnding, setIsGoodEnding] = useState(false);

  if (!story) {
    return (
      <View style={styles.center}>
        <Text style={Typography.h3}>Story not found</Text>
      </View>
    );
  }

  const currentPage = story.pages.find((p) => p.pageNumber === currentPageNumber) ?? story.pages[0];
  if (!currentPage) {
    return (
      <View style={styles.center}>
        <Text style={Typography.h3}>Page not found</Text>
      </View>
    );
  }

  const lang = i18n.language;
  const pageText =
    lang === 'es'
      ? currentPage.textEs
      : lang === 'pt-BR'
      ? currentPage.textPtBR
      : currentPage.text;

  const handleChoice = async (choice: StoryPage['choices'][0]) => {
    await updateProgress(story.id, currentPageNumber);

    if (choice.nextPage === null) {
      setIsGoodEnding(!choice.isEnding);
      setIsEnded(true);
      return;
    }
    const nextPage = story.pages.find((p) => p.pageNumber === choice.nextPage);
    if (!nextPage) {
      setIsGoodEnding(true);
      setIsEnded(true);
      return;
    }
    setCurrentPageNumber(choice.nextPage);
  };

  // Ended screen
  if (isEnded) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={isGoodEnding ? [Colors.primary, Colors.accentDark] : [Colors.surface, Colors.background]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.endedContent}>
          <Text style={styles.endedEmoji}>{isGoodEnding ? '🌟' : '📖'}</Text>
          <Text style={styles.endedTitle}>{t('story.read.theEnd')}</Text>
          <Text style={styles.endedSubtitle}>{t('story.read.endSubtitle')}</Text>
          <View style={styles.endedActions}>
            <TouchableOpacity
              style={styles.endedBtn}
              onPress={() => {
                setCurrentPageNumber(1);
                setIsEnded(false);
              }}
            >
              <Text style={styles.endedBtnText}>{t('story.read.playAgain')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.endedBtn, styles.endedBtnSecondary]}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.endedBtnText}>{t('story.read.goHome')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Story image area — 60% */}
      <View style={styles.imageArea}>
        <LinearGradient
          colors={currentPage.backgroundGradient as [string, string]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Decorative elements */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        {/* Page emoji illustration */}
        <Text style={styles.pageEmoji}>{currentPage.emoji}</Text>

        {/* Top nav */}
        <SafeAreaView style={styles.topNav} edges={['top']}>
          <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>
              {t('story.read.page')} {currentPageNumber}
            </Text>
          </View>
          <View style={{ width: 42 }} />
        </SafeAreaView>
      </View>

      {/* Bottom panel — 40% */}
      <View style={styles.bottomPanel}>
        <LinearGradient
          colors={[Colors.surface, Colors.background]}
          style={StyleSheet.absoluteFill}
        />

        <ScrollView
          contentContainerStyle={styles.bottomContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Page text */}
          <Text style={styles.pageText}>{pageText}</Text>

          {/* Choices */}
          <Text style={styles.chooseLabel}>{t('story.read.choose')}</Text>
          <View style={styles.choicesContainer}>
            {currentPage.choices.map((choice, index) => {
              const choiceText =
                lang === 'es'
                  ? choice.textEs
                  : lang === 'pt-BR'
                  ? choice.textPtBR
                  : choice.text;
              return (
                <TouchableOpacity
                  key={choice.id}
                  style={styles.choiceBtn}
                  activeOpacity={0.85}
                  onPress={() => handleChoice(choice)}
                >
                  <LinearGradient
                    colors={
                      index === 0
                        ? [Colors.primary, Colors.primaryDark]
                        : index === 1
                        ? [Colors.accentDark, Colors.blue[900]]
                        : [Colors.surfaceElevated, Colors.surfaceHighlight]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, { borderRadius: BorderRadius.lg }]}
                  />
                  <View style={styles.choiceBtnInner}>
                    <View style={styles.choiceNumber}>
                      <Text style={styles.choiceNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.choiceText}>{choiceText}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Image area
  imageArea: {
    height: IMAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -60,
  },
  decorCircle2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -40,
    left: -40,
  },
  pageEmoji: { fontSize: 130 },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  pageIndicator: {
    backgroundColor: Colors.overlay,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  pageIndicatorText: { ...Typography.caption, fontWeight: '700' },

  // Bottom panel
  bottomPanel: {
    flex: 1,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -20,
    overflow: 'hidden',
  },
  bottomContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  pageText: {
    ...Typography.body,
    lineHeight: 26,
    color: Colors.textSecondary,
  },
  chooseLabel: {
    ...Typography.h4,
    marginBottom: -4,
  },
  choicesContainer: { gap: Spacing.sm },
  choiceBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    minHeight: 58,
    justifyContent: 'center',
  },
  choiceBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: 12,
  },
  choiceNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceNumberText: { ...Typography.buttonSmall, fontSize: 13 },
  choiceText: { ...Typography.body, flex: 1, fontWeight: '500' },

  // Ended screen
  endedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  endedEmoji: { fontSize: 100, marginBottom: Spacing.md },
  endedTitle: { ...Typography.h1, textAlign: 'center' },
  endedSubtitle: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },
  endedActions: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.lg },
  endedBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  endedBtnSecondary: { backgroundColor: 'rgba(0,0,0,0.2)' },
  endedBtnText: { ...Typography.button },
});
