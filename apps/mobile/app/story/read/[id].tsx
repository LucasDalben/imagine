import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  ImageBackground,
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

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.5;
const ENDING_IMAGE_HEIGHT = height * 0.4;
const ENDING_IMAGE_WIDTH = width * 0.9;

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
  const [showFalseEnding, setShowFalseEnding] = useState(false);
  const [choicesMade, setChoicesMade] = useState<string[]>([]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchStoryById(id ?? '').then((s) => {
      setStory(s);
      setLoading(false);
      if (s) {
        const urls = s.pages
          .map((p) => p.image_url ?? p.backgroundImage)
          .filter((u): u is string => Boolean(u));
        if (urls.length > 0) Image.prefetch(urls);
      }
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
    if (currentPage.isFakeEnding) {
      fadeTransition(() => setShowFalseEnding(true));
      return;
    }

    if (currentPage.isEnding) {
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setShowEnding(true); });
      return;
    }

    const resolved = choice.conditions?.find((c) => choicesMade.includes(c.if));
    const targetPageNumber = resolved ? resolved.nextPage : choice.nextPage;

    setChoicesMade((prev) => [...prev, choice.id]);
    await updateProgress(story.id, currentPageNumber);

    if (targetPageNumber === null) {
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setShowEnding(true); });
      return;
    }

    const nextPage = story.pages.find((p) => p.pageNumber === targetPageNumber);
    if (!nextPage) {
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setShowEnding(true); });
      return;
    }

    if (nextPage.choices.length === 0) {
      // Landing on an ending page — show its text, then a 'The Story Ends' button
      const type = choice.endingType ?? 'good';
      fadeTransition(() => { setEndingType(type); setCurrentPageNumber(targetPageNumber); });
      return;
    }

    fadeTransition(() => setCurrentPageNumber(targetPageNumber));
  };

  const isEndingPage = currentPage.choices.length === 0;
  const isNarrativePage = currentPage.type === 'narrative' || currentPage.choices.length === 1;

  // False ending screen
  if (showFalseEnding) {
    const restartStory = () => {
      setCurrentPageNumber(1);
      setShowFalseEnding(false);
      setChoicesMade([]);
      fadeAnim.setValue(1);
    };
    return (
      <ImageBackground
        source={require('@/assets/background_victory.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(10,11,16,0.45)', 'rgba(10,11,16,0.82)', 'rgba(10,11,16,0.97)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <SafeAreaView style={styles.falseEndContent}>
          {story.imageFalseFinal ? (
            <Image
              source={{ uri: story.imageFalseFinal }}
              style={styles.endingFinalImage}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={300}
            />
          ) : (
            <View style={styles.falseEndIconWrap}>
              <Ionicons name="lock-closed" size={44} color={Colors.primary} />
            </View>
          )}
          <Text style={styles.falseEndTitle}>{t('story.read.falseEndingTitle')}</Text>
          <Text style={styles.falseEndSubtitle}>{t('story.read.falseEndingSubtitle')}</Text>

          <TouchableOpacity
            style={styles.falseEndBtn}
            activeOpacity={0.85}
            onPress={restartStory}
          >
            <Ionicons name="refresh" size={18} color={Colors.textOnPrimary} style={{ marginRight: 8 }} />
            <Text style={styles.falseEndBtnText}>{t('story.read.tryAgain')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.falseEndHomeLink}
            activeOpacity={0.7}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.falseEndHomeLinkText}>{t('story.read.goToMain')}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  // Regular ending screen
  if (showEnding) {
    const isGood = endingType === 'good';
    return (
      <View style={styles.container}>
        <Image
          source={require('@/assets/background_victory.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.55)' }]} />
        <SafeAreaView style={styles.endedContent}>
          <View style={styles.endingImageRect}>
            <Image
              source={require('@/assets/caju_page_image_final.webp')}
              style={styles.endingImageRectImg}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={300}
            />
          </View>
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
                setCurrentPageNumber(1);
                setShowEnding(false);
                setChoicesMade([]);
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
      <SafeAreaView edges={['top']} style={styles.imageWrapper}>
        <View style={styles.imageArea}>
          {(currentPage.image_url || currentPage.backgroundImage) ? (
            <Image
              source={{ uri: currentPage.image_url ?? currentPage.backgroundImage }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
            />
          ) : (
            <Animated.Text style={[styles.pageEmoji, { opacity: fadeAnim }]}>
              {currentPage.emoji}
            </Animated.Text>
          )}
          <LinearGradient
            colors={['transparent', Colors.background]}
            style={styles.imageGradient}
            start={{ x: 0, y: 0.4 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.topNav}>
            <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
            <View style={styles.pageIndicator}>
              <Text style={styles.pageIndicatorText}>
                {t('story.read.page')} {currentPageNumber}
              </Text>
            </View>
            <View style={{ width: 42 }} />
          </View>
        </View>
      </SafeAreaView>

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
                onPress={() =>
                  currentPage.isFakeEnding ? setShowFalseEnding(true) : setShowEnding(true)
                }
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

  imageWrapper: {
    marginHorizontal: 12,
    marginTop: 8,
  },
  imageArea: {
    height: IMAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
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
    top: Spacing.sm,
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

  falseEndContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  falseEndIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(34,197,94,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  falseEndTitle: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  falseEndSubtitle: {
    ...Typography.body,
    color: 'rgba(200,201,212,0.75)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  falseEndBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: 16,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    width: '100%',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  falseEndBtnText: {
    ...Typography.button,
    color: Colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  falseEndHomeLink: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  falseEndHomeLinkText: {
    ...Typography.body,
    color: 'rgba(200,201,212,0.55)',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  endedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  endingFinalImage: {
    width: ENDING_IMAGE_WIDTH,
    height: ENDING_IMAGE_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  endingImageRect: {
    width: ENDING_IMAGE_WIDTH,
    height: ENDING_IMAGE_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  endingImageRectImg: {
    width: '100%',
    height: '100%',
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
