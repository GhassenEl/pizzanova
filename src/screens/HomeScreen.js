import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CATEGORIES,
  PIZZAS,
  OFFERS,
  getTopRated,
  getDealPizzas,
} from '../data/menu';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';
import PizzaCard from '../components/PizzaCard';

export default function HomeScreen({
  onOpenPizza,
  onOpenPacks,
  onOpenCart,
  onOpenOffers,
  onOpenOrders,
}) {
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

  const recommended = useMemo(() => getTopRated(5), []);
  const deals = useMemo(() => getDealPizzas(), []);
  const highlightOffer = OFFERS[0];

  return (
    <View style={styles.root}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Animated.View
              style={[
                styles.hero,
                { opacity: brandOpacity, transform: [{ translateY: brandY }] },
              ]}
            >
              <View style={styles.heroTop}>
                <View>
                  <Text style={styles.brand}>PizzaNova</Text>
                  <Text style={styles.tagline}>
                    Commande · paiement · offres
                  </Text>
                </View>
                <View style={styles.heroActions}>
                  <Pressable style={styles.iconBtn} onPress={onOpenOrders}>
                    <Text style={styles.cartIcon}>🧾</Text>
                  </Pressable>
                  <Pressable style={styles.iconBtn} onPress={onOpenCart}>
                    <Text style={styles.cartIcon}>🛒</Text>
                    {count > 0 ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{count}</Text>
                      </View>
                    ) : null}
                  </Pressable>
                </View>
              </View>

              <Pressable style={styles.offerBanner} onPress={onOpenOffers}>
                <Image
                  source={{ uri: highlightOffer.image }}
                  style={styles.offerImg}
                />
                <View style={styles.offerOverlay}>
                  <Text style={styles.offerTitle}>{highlightOffer.title}</Text>
                  <Text style={styles.offerSub}>{highlightOffer.subtitle}</Text>
                  <Text style={styles.offerCode}>Code {highlightOffer.code}</Text>
                </View>
              </Pressable>

              <View style={styles.quickRow}>
                <Pressable style={styles.quick} onPress={onOpenOffers}>
                  <Text style={styles.quickText}>🔥 Offres</Text>
                </Pressable>
                <Pressable style={styles.quick} onPress={onOpenPacks}>
                  <Text style={styles.quickText}>🎁 Packs</Text>
                </Pressable>
                <Pressable style={styles.quick} onPress={onOpenOrders}>
                  <Text style={styles.quickText}>📦 Commandes</Text>
                </Pressable>
              </View>
            </Animated.View>

            <Text style={styles.section}>Recommandées pour vous</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recoRow}
            >
              {recommended.map((p, i) => (
                <PizzaCard
                  key={p.id}
                  pizza={p}
                  index={i}
                  compact
                  onPress={() => onOpenPizza(p)}
                />
              ))}
            </ScrollView>

            {deals.length > 0 ? (
              <>
                <Text style={styles.section}>En promo</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.recoRow}
                >
                  {deals.map((p, i) => (
                    <PizzaCard
                      key={p.id}
                      pizza={p}
                      index={i}
                      compact
                      onPress={() => onOpenPizza(p)}
                    />
                  ))}
                </ScrollView>
              </>
            ) : null}

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
                    <Text
                      style={[
                        styles.chipLabel,
                        active && styles.chipLabelActive,
                      ]}
                    >
                      {c.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={[styles.section, { marginTop: 4 }]}>Menu</Text>
          </View>
        }
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
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
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
  heroActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: { fontSize: 20 },
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
  offerBanner: {
    marginTop: spacing.md,
    height: 120,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  offerImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  offerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26,15,10,0.55)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  offerTitle: { color: colors.cream, fontWeight: '900', fontSize: 18 },
  offerSub: { color: colors.cream, opacity: 0.9, marginTop: 2, fontSize: 13 },
  offerCode: {
    color: colors.gold,
    marginTop: 6,
    fontWeight: '800',
    fontSize: 12,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.md,
  },
  quick: {
    flex: 1,
    backgroundColor: colors.cardLift,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  quickText: { color: colors.cream, fontWeight: '700', fontSize: 12 },
  section: {
    color: colors.gold,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  recoRow: {
    paddingBottom: spacing.sm,
  },
  chips: {
    paddingVertical: spacing.sm,
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
