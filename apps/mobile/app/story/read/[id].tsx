import React, { useState, useRef, useEffect } from 'react';
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
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/theme';
import { type StoryPage, type Story } from '@/data/stories';
import { fetchStoryById } from '@/services/storiesService';
import { useReadingStore } from '@/stores/readingStore';

const { height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.5;

export default function StoryReadScreen() {
  const { id, page: pageParam } = useLocalSearchParams<{ id: string; page: string }>();
  const { t, i18n } = useTranslation();
  const { updateProgress } = useReadingStore();
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const startPage = parseInt(pageParam ?? '1', 10) || 1;
  const [currentPageNumber, setCurrentPageNumber] = useState(startPage);
  const [endingType, setEndingType] = useState<'good' | 'bad'>('good');
  const [showEnding, setShowEnding] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchStoryById(id ?? '').then((s) => {
      setStory(s);
      setLoading(false);
    });
  }, [id]);

  const fadeTransition = (callback: () => void) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      callback();
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Story not found</Text>
      </View>
    );
  }

  const currentPage: StoryPage | undefined =
    story.pages.find((p) => p.pageNumber === currentPageNumber) ?? story.pages[0];
  if (!currentPage) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Page not found</Text>
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
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setShowEnding(true); });
      return;
    }

    const nextPage = story.pages.find((p) => p.pageNumber === choice.nextPage);
    if (!nextPage) {
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setShowEnding(true); });
      return;
    }

    if (nextPage.choices.length === 0) {
      // Landing on an ending page — show its text, then a 'The Story Ends' button
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setCurrentPageNumber(choice.nextPage!); });
      return;
    }

    fadeTransition(() => setCurrentPageNumber(choice.nextPage!));
  };

  const isEndingPage = currentPage.choices.length === 0;
  const isNarrativePage = currentPage.type === 'narrative' || currentPage.choices.length === 1;

  // Ending screen
  if (showEnding) {
    const isGood = endingType === 'good';
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={
            isGood
              ? [Colors.endingGoodFrom, Colors.endingGoodTo]
              : [Colors.endingBadFrom, Colors.endingBadTo]
          }
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.endedContent}>
          <Text style={styles.endedEmoji}>{isGood ? '✨' : '🌑'}</Text>
          <Text style={styles.endedTitle}>
            {isGood ? t('story.read.endGoodTitle') : t('story.read.endBadTitle')}
          </Text>
          <Text style={styles.endedSubtitle}>
            {isGood ? t('story.read.endGoodSubtitle') : t('story.read.endBadSubtitle')}
          </Text>
          <View style={styles.endedActions}>
            <TouchableOpacity
              style={[styles.endedBtn, isGood ? styles.endedBtnGood : styles.endedBtnBad]}
              activeOpacity={0.8}
              onPress={() => {
                setCurrentPageNumber(startPage);
                setShowEnding(false);
                fadeAnim.setValue(1);
              }}
            >
              <Text style={styles.endedBtnText}>{t('story.read.playAgain')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.endedBtn, styles.endedBtnSecondary]}
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.endedBtnText}>{t('story.read.goHome')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // Reading screen
  return (
    <View style={styles.container}>
      {/* Image area */}
      <View style={styles.imageArea}>
        {currentPage.backgroundImage ? (
          <Image
            source={{ uri: currentPage.backgroundImage }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
        ) : null}
        <LinearGradient
          colors={['transparent', Colors.background]}
          style={styles.imageGradient}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 0, y: 1 }}
        />
        <Animated.Text style={[styles.pageEmoji, { opacity: fadeAnim }]}>
          {currentPage.emoji}
        </Animated.Text>
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

      {/* Bottom panel */}
      <View style={styles.bottomPanel}>
        <LinearGradient
          colors={[Colors.surface, Colors.background]}
          style={StyleSheet.absoluteFill}
        />
        <ScrollView
          contentContainerStyle={styles.bottomContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.pageText}>{pageText}</Text>

            {isEndingPage ? (
              <TouchableOpacity
                style={styles.continueBtn}
                activeOpacity={0.75}
                onPress={() => setShowEnding(true)}
              >
                <Text style={styles.continueBtnText}>{t('story.read.theEnd')}</Text>
              </TouchableOpacity>
            ) : isNarrativePage ? (
              <TouchableOpacity
                style={styles.continueBtn}
                activeOpacity={0.75}
                onPress={() => currentPage.choices[0] && handleChoice(currentPage.choices[0])}
              >
                <Text style={styles.continueBtnText}>{t('story.read.continue')}</Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.textMuted} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            ) : (
              <View style={styles.choicesContainer}>
                <Text style={styles.chooseLabel}>{t('story.read.choose')}</Text>
                {currentPage.choices.map((choice) => {
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
                      activeOpacity={0.7}
                      onPress={() => handleChoice(choice)}
                    >
                      <Text style={styles.choiceArrow}>{'›'}</Text>
                      <Text style={styles.choiceText}>{choiceText}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: { ...Typography.h3, color: Colors.textPrimary },

  imageArea: {
    height: IMAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
  },
  pageEmoji: { fontSize: 100 },
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
  pageIndicatorText: { ...Typography.caption, fontWeight: '700', color: Colors.textPrimary },

  bottomPanel: {
    flex: 1,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -24,
    overflow: 'hidden',
  },
  bottomContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  pageText: {
    ...Typography.body,
    fontSize: 16,
    lineHeight: 28,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },

  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.full,
    paddingVertical: 15,
    paddingHorizontal: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  continueBtnText: {
    ...Typography.button,
    fontSize: 15,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },

  chooseLabel: {
    ...Typography.caption,
    color: Colors.textDisabled,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  choicesContainer: { gap: Spacing.sm },
  choiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.lg,
    paddingVertical: 16,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  choiceArrow: {
    fontSize: 20,
    color: Colors.textDisabled,
    width: 14,
    lineHeight: 22,
  },
  choiceText: {
    ...Typography.body,
    flex: 1,
    color: Colors.textPrimary,
    fontWeight: '500',
    lineHeight: 22,
  },

  endedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  endedEmoji: { fontSize: 96, marginBottom: Spacing.md },
  endedTitle: { ...Typography.h2, textAlign: 'center', color: Colors.textPrimary },
  endedSubtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 24,
  },
  endedActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
    width: '100%',
  },
  endedBtn: {
    flex: 1,
    borderRadius: BorderRadius.full,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  endedBtnGood: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.35)',
  },
  endedBtnBad: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  endedBtnSecondary: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  endedBtnText: { ...Typography.button, color: Colors.textPrimary },
});
