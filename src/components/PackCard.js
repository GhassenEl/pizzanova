import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';
import { getPizza } from '../data/menu';

export default function PackCard({ pack, index = 0, onAdd }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: index * 90,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        delay: index * 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, scale]);

  const names = pack.pizzas
    .map((id) => getPizza(id)?.name)
    .filter(Boolean)
    .join(' · ');

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <View style={styles.card}>
        <Image source={{ uri: pack.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {pack.emoji} {pack.name}
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>-{pack.discountPct}%</Text>
            </View>
          </View>
          <Text style={styles.desc}>{pack.description}</Text>
          <Text style={styles.names} numberOfLines={2}>
            {names}
          </Text>
          <Text style={styles.drinks}>+ {pack.drinks} boissons</Text>
          <View style={styles.footer}>
            <View>
              <Text style={styles.price}>{pack.price.toFixed(2)} TND</Text>
              <Text style={styles.was}>{pack.originalPrice.toFixed(2)} TND</Text>
            </View>
            <Pressable style={styles.btn} onPress={() => onAdd(pack)}>
              <Text style={styles.btnText}>Ajouter</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(232,93,4,0.35)',
    overflow: 'hidden',
  },
  image: { width: '100%', height: 140, backgroundColor: colors.bgSoft },
  content: { padding: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  badge: {
    backgroundColor: colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { color: colors.white, fontWeight: '800', fontSize: 12 },
  desc: {
    color: colors.muted,
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  names: {
    color: colors.accentSoft,
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
  },
  drinks: {
    color: colors.gold,
    marginTop: 6,
    fontSize: 13,
  },
  footer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.cream,
    fontSize: 22,
    fontWeight: '800',
  },
  was: {
    color: colors.muted,
    textDecorationLine: 'line-through',
    fontSize: 13,
  },
  btn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  btnText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
});
