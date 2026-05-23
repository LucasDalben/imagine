import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';

const { height, width } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export function SplashIntro({ onFinish }: Props) {
  const { t } = useTranslation();

  const titleY = useRef(new Animated.Value(0)).current;
  const titleRotate = useRef(new Animated.Value(0)).current;
  const imageY = useRef(new Animated.Value(4)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(12)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Title: gentle float up/down
    Animated.loop(
      Animated.sequence([
        Animated.timing(titleY, {
          toValue: -10,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 10,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Title: subtle sway
    Animated.loop(
      Animated.sequence([
        Animated.timing(titleRotate, {
          toValue: -1,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(titleRotate, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Bottom image: float with opposite phase
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageY, {
          toValue: 8,
          duration: 2100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(imageY, {
          toValue: -8,
          duration: 2100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Welcome text slides up + fades in at 2s
    const welcomeTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(welcomeOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(welcomeTranslateY, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    // At 3s: light flash, then navigate
    const flashTimer = setTimeout(() => {
      Animated.timing(flashOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onFinish();
      });
    }, 3000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(flashTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleRotateDeg = titleRotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-1.5deg', '1.5deg'],
  });

  return (
    <View style={styles.container}>
      {/* Title image — top area */}
      <View style={styles.titleArea}>
        <Animated.View
          style={{ transform: [{ translateY: titleY }, { rotate: titleRotateDeg }] }}
        >
          <Image
            source={require('@/assets/imagine_titulo.png')}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Welcome text — fades in at 2s */}
      <Animated.View
        style={[
          styles.welcomeContainer,
          { opacity: welcomeOpacity, transform: [{ translateY: welcomeTranslateY }] },
        ]}
      >
        <Text style={styles.welcomeText}>{t('splash.welcome')}</Text>
      </Animated.View>

      {/* Bottom illustration */}
      <View style={styles.imageArea}>
        <Animated.View style={{ transform: [{ translateY: imageY }] }}>
          <Image
            source={require('@/assets/imagem_inicial_tela.png')}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Light flash overlay */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.flash, { opacity: flashOpacity }]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 0,
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImage: {
    width: 560,
    height: height * 0.28,
  },
  welcomeContainer: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#16A34A',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  imageArea: {
    flex: 1.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bottomImage: {
    width: width,
    height: height * 0.46,
  },
  flash: {
    backgroundColor: '#FFFFFF',
    zIndex: 999,
  },
});
