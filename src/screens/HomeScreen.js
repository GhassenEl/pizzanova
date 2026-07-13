import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CATEGORIES, PIZZAS } from '../data/menu';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';
import PizzaCard from '../components/PizzaCard';

export default function HomeScreen({ onOpenPizza, onOpenPacks, onOpenCart }) {
  const { count } = useCart();
  const [category, setCategory] = useState('all');
  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandY = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(brandOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(brandY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [brandOpacity, brandY]);

  const pizzas = useMemo(() => {
    if (category === 'all') return PIZZAS;
    return PIZZAS.filter((p) => p.category === category);
  }, [category]);

  const deals = useMemo(
    () => PIZZAS.filter((p) => p.discountPct > 0).length,
    []
  );

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.hero,
          { opacity: brandOpacity, transform: [{ translateY: brandY }] },
        ]}
      >
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.brand}>PizzaNova</Text>
            <Text style={styles.tagline}>Four chaud · remises · packs</Text>
          </View>
          <Pressable style={styles.cartBtn} onPress={onOpenCart}>
            <Text style={styles.cartIcon}>🛒</Text>
            {count > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{count}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
        <Pressable style={styles.packsCta} onPress={onOpenPacks}>
          <Text style={styles.packsCtaText}>🎁 Voir les packs promo</Text>
          <Text style={styles.packsCtaSub}>{deals} pizzas en remise</Text>
        </Pressable>
      </Animated.View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((c) => {
          const active = category === c.id;
          return (
            <Pressable
              key={c.id}
              onPress={() => setCategory(c.id)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={styles.chipEmoji}>{c.emoji}</Text>
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                {c.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PizzaCard
            pizza={item}
            index={index}
            onPress={() => onOpenPizza(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brand: {
    color: colors.cream,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  tagline: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 14,
  },
  cartBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: { fontSize: 22 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: colors.white, fontSize: 11, fontWeight: '800' },
  packsCta: {
    marginTop: spacing.md,
    backgroundColor: colors.cardLift,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.25)',
  },
  packsCtaText: {
    color: colors.cream,
    fontWeight: '800',
    fontSize: 15,
  },
  packsCtaSub: {
    color: colors.gold,
    marginTop: 4,
    fontSize: 12,
  },
  chips: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSoft,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.card,
    borderColor: colors.accent,
  },
  chipEmoji: { marginRight: 6, fontSize: 14 },
  chipLabel: { color: colors.muted, fontWeight: '600', fontSize: 13 },
  chipLabelActive: { color: colors.cream },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
