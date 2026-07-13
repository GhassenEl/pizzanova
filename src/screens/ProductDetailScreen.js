import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SIZES, finalPrice, listPrice } from '../data/menu';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ pizza, onBack }) {
  const { addPizza } = useCart();
  const [sizeId, setSizeId] = useState('M');
  const [added, setAdded] = useState(false);
  const slide = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const emojiScale = useRef(new Animated.Value(0.6)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(slide, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(emojiScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, slide, emojiScale]);

  const price = finalPrice(pizza, sizeId);
  const was = listPrice(pizza, sizeId);
  const hasDiscount = pizza.discountPct > 0;

  const handleAdd = () => {
    addPizza({ ...pizza, _unitPrice: price }, sizeId, 1);
    setAdded(true);
    Animated.sequence([
      Animated.spring(btnScale, {
        toValue: 1.08,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(btnScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Animated.View
      style={[
        styles.root,
        { opacity, transform: [{ translateY: slide }] },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} style={styles.back}>
          <Text style={styles.backText}>← Retour</Text>
        </Pressable>

        <Animated.Text
          style={[styles.emoji, { transform: [{ scale: emojiScale }] }]}
        >
          {pizza.emoji}
        </Animated.Text>

        <Text style={styles.name}>{pizza.name}</Text>
        <Text style={styles.meta}>
          ★ {pizza.rating} · {pizza.prepMin} min · {pizza.category}
        </Text>
        <Text style={styles.desc}>{pizza.description}</Text>

        {hasDiscount ? (
          <View style={styles.deal}>
            <Text style={styles.dealText}>
              Remise -{pizza.discountPct}% · vous économisez{' '}
              {(was - price).toFixed(2)} TND
            </Text>
          </View>
        ) : null}

        <Text style={styles.section}>Taille</Text>
        <View style={styles.sizes}>
          {SIZES.map((s) => {
            const active = sizeId === s.id;
            return (
              <Pressable
                key={s.id}
                onPress={() => setSizeId(s.id)}
                style={[styles.size, active && styles.sizeActive]}
              >
                <Text style={[styles.sizeId, active && styles.sizeIdActive]}>
                  {s.id}
                </Text>
                <Text style={[styles.sizeLabel, active && styles.sizeIdActive]}>
                  {s.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.section}>Ingrédients</Text>
        <View style={styles.tags}>
          {pizza.ingredients.map((ing) => (
            <View key={ing} style={styles.tag}>
              <Text style={styles.tagText}>{ing}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceBox}>
          <View>
            <Text style={styles.price}>{price.toFixed(2)} TND</Text>
            {hasDiscount ? (
              <Text style={styles.was}>{was.toFixed(2)} TND</Text>
            ) : null}
          </View>
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <Pressable style={styles.btn} onPress={handleAdd}>
              <Text style={styles.btnText}>
                {added ? '✓ Ajouté' : 'Ajouter au panier'}
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 48 },
  back: { marginBottom: spacing.md },
  backText: { color: colors.accentSoft, fontWeight: '700', fontSize: 15 },
  emoji: {
    fontSize: 88,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  name: {
    color: colors.cream,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  meta: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
    fontSize: 13,
  },
  desc: {
    color: colors.cream,
    opacity: 0.85,
    textAlign: 'center',
    marginTop: spacing.md,
    fontSize: 15,
    lineHeight: 22,
  },
  deal: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(230,57,70,0.18)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(230,57,70,0.35)',
  },
  dealText: {
    color: colors.danger,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
  },
  section: {
    color: colors.gold,
    fontWeight: '800',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  sizes: { flexDirection: 'row', gap: 10 },
  size: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sizeActive: {
    borderColor: colors.accent,
    backgroundColor: colors.cardLift,
  },
  sizeId: { color: colors.muted, fontWeight: '900', fontSize: 18 },
  sizeIdActive: { color: colors.cream },
  sizeLabel: { color: colors.muted, fontSize: 11, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: colors.bgSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  tagText: { color: colors.cream, fontSize: 13 },
  priceBox: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.md,
  },
  price: { color: colors.accentSoft, fontSize: 24, fontWeight: '900' },
  was: {
    color: colors.muted,
    textDecorationLine: 'line-through',
    fontSize: 13,
  },
  btn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
  },
  btnText: { color: colors.white, fontWeight: '800', fontSize: 14 },
});
