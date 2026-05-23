import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const BASE = width * 0.86;

const GOLD = '#D4AF37';
const GOLD_BRIGHT = '#F5E67A';

// ─── Deterministic pseudo-random [0, 1) — sem Math.random para evitar re-renders ──
function pr(seed: number): number {
  return (((seed * 1664525 + 1013904223) >>> 0) % 100000) / 100000;
}

// Raio de cada anel como fração de BASE (size / 2)
const RING_R = [0.50, 0.46, 0.415, 0.365, 0.305];

// Config pré-computada para cada fragmento
const FRAG_COUNT = 44;
const FRAG_CFG = Array.from({ length: FRAG_COUNT }, (_, i) => ({
  angle: (i / FRAG_COUNT) * Math.PI * 2 + (pr(i * 7) - 0.5) * 0.5,
  ringIdx: i % RING_R.length,
  size: 1 + Math.floor(pr(i * 7 + 1) * 2.9),   // 1–3 px
  drift: 6 + pr(i * 7 + 2) * 16,               // 6–22 px
  duration: 2000 + pr(i * 7 + 3) * 2500,       // 2–4.5 s
  initialPhase: i / FRAG_COUNT,                 // escalonamento 0→1
  spiral: (pr(i * 7 + 4) - 0.5) * 1.0,        // torção ±0.5 rad (redemoinho)
}));

// ─── Single rotating ring ────────────────────────────────────────────────────
type RingProps = {
  size: number;
  borderWidth: number;
  color: string;
  opacity: number;
  duration: number;
  direction: 1 | -1;
};

function AnimatedRing({ size, borderWidth, color, opacity, duration, direction }: RingProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${direction * 360}deg`],
  });

  return (
    <Animated.View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderColor: color,
          opacity,
        },
        { transform: [{ rotate }] },
      ]}
    />
  );
}

// ─── Dots scattered around a circular path ───────────────────────────────────
function SparkleRing({
  radius,
  count = 12,
  duration,
  direction,
}: {
  radius: number;
  count?: number;
  duration: number;
  direction: 1 | -1;
}) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${direction * 360}deg`],
  });

  const containerSize = radius * 2;

  return (
    <Animated.View
      style={[
        { position: 'absolute', width: containerSize, height: containerSize },
        { transform: [{ rotate }] },
      ]}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 2 * Math.PI;
        const dotSize = i % 3 === 0 ? 4 : 2.5;
        const x = radius + radius * Math.cos(angle) - dotSize / 2;
        const y = radius + radius * Math.sin(angle) - dotSize / 2;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: i % 3 === 0 ? GOLD_BRIGHT : GOLD,
              opacity: i % 3 === 0 ? 0.45 : 0.18,
            }}
          />
        );
      })}
    </Animated.View>
  );
}

// ─── Pulsing glow disc ───────────────────────────────────────────────────────
function GlowLayer({ size, minOpacity, maxOpacity, duration }: {
  size: number;
  minOpacity: number;
  maxOpacity: number;
  duration: number;
}) {
  const opacity = useRef(new Animated.Value(minOpacity)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: maxOpacity,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: minOpacity,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: GOLD },
        { opacity },
      ]}
    />
  );
}

// ─── Fragmento individual — aparece na borda, deriva para dentro com redemoinho ──
function FragmentParticle({ bx, by, angle, drift, spiral, size, duration, initialPhase }: {
  bx: number;
  by: number;
  angle: number;
  drift: number;
  spiral: number;
  size: number;
  duration: number;
  initialPhase: number;
}) {
  const phase = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Atraso escalonado: cada fragmento começa em um ponto diferente do ciclo
    const delay = initialPhase * duration;
    const t = setTimeout(() => {
      Animated.loop(
        Animated.timing(phase, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }, delay);
    return () => clearTimeout(t);
  }, []);

  // Direção: para dentro (ângulo + π) + torção espiral = efeito de sucção de buraco negro
  const driftAngle = angle + Math.PI + spiral;
  const dx = Math.cos(driftAngle) * drift;
  const dy = Math.sin(driftAngle) * drift;

  const tx      = phase.interpolate({ inputRange: [0, 1], outputRange: [0, dx] });
  const ty      = phase.interpolate({ inputRange: [0, 1], outputRange: [0, dy] });
  const opacity = phase.interpolate({
    inputRange:  [0, 0.06, 0.38, 0.88, 1],
    outputRange: [0, 0.26, 0.09, 0.01,  0],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: bx - size / 2,
        top: by - size / 2,
        width: size,
        height: size,
        backgroundColor: GOLD,
        opacity,
        transform: [{ translateX: tx }, { translateY: ty }],
      }}
    />
  );
}

// ─── Nuvem de fragmentos — distribuídos nas bordas dos anéis ─────────────────
function FragmentCloud() {
  return (
    <View style={{ position: 'absolute', width: BASE, height: BASE }}>
      {FRAG_CFG.map((cfg, i) => {
        const radius = RING_R[cfg.ringIdx] * BASE;
        const bx = BASE / 2 + radius * Math.cos(cfg.angle);
        const by = BASE / 2 + radius * Math.sin(cfg.angle);
        return (
          <FragmentParticle
            key={i}
            bx={bx}
            by={by}
            angle={cfg.angle}
            drift={cfg.drift}
            spiral={cfg.spiral}
            size={cfg.size}
            duration={cfg.duration}
            initialPhase={cfg.initialPhase}
          />
        );
      })}
    </View>
  );
}

// ─── Public component ────────────────────────────────────────────────────────
export function MagicRing() {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Ambient glow — muito suave */}
      <GlowLayer size={BASE * 1.08} minOpacity={0.02} maxOpacity={0.07} duration={4000} />
      <GlowLayer size={BASE * 0.62} minOpacity={0.02} maxOpacity={0.06} duration={3400} />

      {/* Rings — opacidades bem baixas para efeito sutil */}
      <AnimatedRing size={BASE}        borderWidth={0.5} color={GOLD}        opacity={0.18} duration={26000} direction={1}  />
      <AnimatedRing size={BASE * 0.92} borderWidth={0.5} color={GOLD_BRIGHT} opacity={0.10} duration={19000} direction={-1} />
      <AnimatedRing size={BASE * 0.83} borderWidth={0.5} color={GOLD}        opacity={0.22} duration={15000} direction={1}  />
      <AnimatedRing size={BASE * 0.73} borderWidth={0.5} color={GOLD_BRIGHT} opacity={0.12} duration={21000} direction={-1} />
      <AnimatedRing size={BASE * 0.61} borderWidth={1}   color={GOLD}        opacity={0.20} duration={11000} direction={1}  />
      <AnimatedRing size={BASE * 0.47} borderWidth={0.5} color={GOLD_BRIGHT} opacity={0.25} duration={8500}  direction={-1} />
      <AnimatedRing size={BASE * 0.30} borderWidth={1}   color={GOLD}        opacity={0.18} duration={6500}  direction={1}  />

      {/* Sparkle dot rings — menos pontos, mais transparentes */}
      <SparkleRing radius={BASE * 0.415} count={10} duration={15000} direction={1}  />
      <SparkleRing radius={BASE * 0.305} count={7}  duration={11000} direction={-1} />

      {/* Fragmentos — beiradas sumindo em pixels como buraco negro */}
      <FragmentCloud />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
  },
});
