import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PACKS } from '../data/menu';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';
import PackCard from '../components/PackCard';

export default function PacksScreen({ onBack }) {
  const { addPack } = useCart();
  const [toast, setToast] = useState('');
  const toastY = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    if (!toast) return;
    Animated.spring(toastY, {
      toValue: 0,
      friction: 7,
      useNativeDriver: true,
    }).start();
    const t = setTimeout(() => {
      Animated.timing(toastY, {
        toValue: 80,
        duration: 220,
        useNativeDriver: true,
      }).start(() => setToast(''));
    }, 1600);
    return () => clearTimeout(t);
  }, [toast, toastY]);

  const handleAdd = (pack) => {
    addPack(pack);
    setToast(`${pack.name} ajouté`);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>← Retour</Text>
        </Pressable>
        <Text style={styles.title}>Packs & remises</Text>
        <Text style={styles.sub}>
          Combos prêts à commander — économies jusqu&apos;à 24%
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {PACKS.map((pack, index) => (
          <PackCard
            key={pack.id}
            pack={pack}
            index={index}
            onAdd={handleAdd}
          />
        ))}
      </ScrollView>

      {toast ? (
        <Animated.View
          style={[styles.toast, { transform: [{ translateY: toastY }] }]}
        >
          <Text style={styles.toastText}>✓ {toast}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  back: { color: colors.accentSoft, fontWeight: '700', marginBottom: 8 },
  title: {
    color: colors.cream,
    fontSize: 28,
    fontWeight: '900',
  },
  sub: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  toast: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.success,
    borderRadius: 14,
    padding: spacing.md,
    alignItems: 'center',
  },
  toastText: { color: colors.white, fontWeight: '800' },
});
