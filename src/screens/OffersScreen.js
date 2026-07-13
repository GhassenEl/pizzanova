import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { OFFERS } from '../data/menu';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';
import PizzaImage from '../components/PizzaImage';

export default function OffersScreen({ onBack, onApplied }) {
  const { applyPromo, appliedOffer } = useCart();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.root, { opacity }]}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>← Retour</Text>
        </Pressable>
        <Text style={styles.title}>Offres du moment</Text>
        <Text style={styles.sub}>
          Appliquez un code au panier avant de payer
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {OFFERS.map((offer, index) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            index={index}
            active={appliedOffer?.code === offer.code}
            onApply={() => {
              const res = applyPromo(offer.code);
              if (res.ok) onApplied?.(offer);
            }}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
}

function OfferCard({ offer, index, active, onApply }) {
  const scale = useRef(new Animated.Value(0.94)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 380,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, scale]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <View style={styles.card}>
        <PizzaImage uri={offer.image} style={styles.img} />
        <View style={styles.body}>
          <View style={[styles.dot, { backgroundColor: offer.color }]} />
          <Text style={styles.name}>{offer.title}</Text>
          <Text style={styles.desc}>{offer.subtitle}</Text>
          <Text style={styles.code}>Code · {offer.code}</Text>
          <Text style={styles.min}>Min. {offer.minOrder} TND</Text>
          <Pressable
            style={[styles.btn, active && styles.btnActive]}
            onPress={onApply}
          >
            <Text style={styles.btnText}>
              {active ? '✓ Appliquée' : 'Utiliser'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  back: { color: colors.accentSoft, fontWeight: '700', marginBottom: 8 },
  title: { color: colors.cream, fontSize: 28, fontWeight: '900' },
  sub: { color: colors.muted, marginTop: 6, marginBottom: spacing.sm },
  list: { padding: spacing.lg, paddingBottom: 40 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.15)',
  },
  img: { width: '100%', height: 120, backgroundColor: colors.bgSoft },
  body: { padding: spacing.md },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  name: { color: colors.cream, fontWeight: '900', fontSize: 18 },
  desc: { color: colors.muted, marginTop: 4, fontSize: 14, lineHeight: 20 },
  code: {
    color: colors.gold,
    fontWeight: '800',
    marginTop: 10,
    fontSize: 14,
  },
  min: { color: colors.muted, fontSize: 12, marginTop: 4 },
  btn: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  btnActive: { backgroundColor: colors.success },
  btnText: { color: colors.white, fontWeight: '800' },
});
