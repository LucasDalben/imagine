import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

export function AnimatedBackground() {
  const translateX = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 12,
          duration: 9000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -12,
          duration: 9000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) animate();
      });
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ translateX }],
          width: width + 24,
          left: -12,
        },
      ]}
      pointerEvents="none"
    >
      <ImageBackground
        source={require('@/assets/background.png')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
    </Animated.View>
  );
}
