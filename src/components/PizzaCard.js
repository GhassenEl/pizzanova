import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';
import { finalPrice, listPrice } from '../data/menu';
import PizzaImage from './PizzaImage';

export default function PizzaCard({ pizza, index = 0, onPress, compact }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay: index * 70,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 60,
        delay: index * 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  const price = finalPrice(pizza);
  const was = listPrice(pizza);
  const hasDiscount = pizza.discountPct > 0;
  const ingredientsLine = (pizza.ingredients || []).slice(0, 3).join(', ');
  const subtitle =
    pizza.kind === 'drink'
      ? pizza.volume || ingredientsLine
      : ingredientsLine;

  if (compact) {
    return (
      <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
        <Pressable
          onPress={onPress}
          style={styles.compact}
          onPressIn={() =>
            Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start()
          }
          onPressOut={() =>
            Animated.spring(scale, {
              toValue: 1,
              friction: 5,
              useNativeDriver: true,
            }).start()
          }
        >
          <PizzaImage uri={pizza.image} style={styles.compactImg} />
          <Text style={styles.compactName} numberOfLines={1}>
            {pizza.name}
          </Text>
          <Text style={styles.compactIng} numberOfLines={1}>
            {ingredientsLine}
          </Text>
          <Text style={styles.compactPrice}>{price.toFixed(2)} TND</Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <Pressable
        onPressIn={() =>
          Animated.spring(scale, {
            toValue: 0.96,
            useNativeDriver: true,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }).start()
        }
        onPress={onPress}
        style={styles.card}
      >
        <PizzaImage uri={pizza.image} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {pizza.name}
            </Text>
            {pizza.badge ? (
              <View
                style={[
                  styles.badge,
                  pizza.badge.startsWith('-') && styles.badgeSale,
                ]}
              >
                <Text style={styles.badgeText}>{pizza.badge}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.desc} numberOfLines={2}>
            {pizza.description}
          </Text>
          <Text style={styles.ingredients} numberOfLines={1}>
            {ingredientsLine}
            {(pizza.ingredients || []).length > 3 ? '…' : ''}
          </Text>
          <View style={styles.footer}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{price.toFixed(2)} TND</Text>
              {hasDiscount ? (
                <Text style={styles.was}>{was.toFixed(2)}</Text>
              ) : null}
            </View>
            <Text style={styles.meta}>★ {pizza.rating}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.12)',
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 14,
    marginRight: spacing.md,
  },
  body: { flex: 1, paddingVertical: 2, paddingRight: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flex: 1,
    color: colors.cream,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  badge: {
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeSale: { backgroundColor: colors.danger },
  badgeText: {
    color: colors.bg,
    fontSize: 11,
    fontWeight: '800',
  },
  desc: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
  ingredients: {
    color: colors.accentSoft,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  price: {
    color: colors.accentSoft,
    fontSize: 16,
    fontWeight: '800',
  },
  was: {
    color: colors.muted,
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  meta: { color: colors.gold, fontSize: 13, fontWeight: '600' },
  compact: {
    width: 148,
    marginRight: 12,
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.12)',
  },
  compactImg: { width: '100%', height: 100 },
  compactName: {
    color: colors.cream,
    fontWeight: '700',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  compactIng: {
    color: colors.muted,
    fontSize: 10,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  compactPrice: {
    color: colors.accentSoft,
    fontWeight: '800',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 4,
  },
});
