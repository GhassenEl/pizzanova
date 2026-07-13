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

export default function PizzaCard({ pizza, index = 0, onPress }) {
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

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }, { scale }] }}
    >
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
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{pizza.emoji}</Text>
        </View>
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
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.12)',
  },
  emojiWrap: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: colors.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  emoji: { fontSize: 36 },
  body: { flex: 1 },
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
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    marginTop: 10,
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
});
