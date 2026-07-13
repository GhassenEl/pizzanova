import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';

export default function CartScreen({ onBack }) {
  const { items, total, removeItem, clear } = useCart();
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
        <Text style={styles.title}>Panier</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🍕</Text>
          <Text style={styles.emptyText}>Votre panier est vide</Text>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.list}>
            {items.map((item) => (
              <View key={item.key} style={styles.row}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <View style={styles.body}>
                  <Text style={styles.name}>
                    {item.name}
                    {item.sizeId ? ` · ${item.sizeId}` : ''}
                  </Text>
                  <Text style={styles.meta}>
                    {item.qty} × {item.unitPrice.toFixed(2)} TND
                  </Text>
                </View>
                <Pressable onPress={() => removeItem(item.key)}>
                  <Text style={styles.remove}>✕</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>{total.toFixed(2)} TND</Text>
            </View>
            <View style={styles.actions}>
              <Pressable style={styles.clear} onPress={clear}>
                <Text style={styles.clearText}>Vider</Text>
              </Pressable>
              <Pressable style={styles.order}>
                <Text style={styles.orderText}>Commander</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
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
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 56, marginBottom: 12 },
  emptyText: { color: colors.muted, fontSize: 16 },
  list: { padding: spacing.lg, paddingBottom: 140 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  emoji: { fontSize: 28, marginRight: 12 },
  body: { flex: 1 },
  name: { color: colors.cream, fontWeight: '700', fontSize: 15 },
  meta: { color: colors.muted, marginTop: 4, fontSize: 13 },
  remove: { color: colors.danger, fontSize: 18, padding: 8 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.cardLift,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  totalLabel: { color: colors.muted, fontSize: 12 },
  total: { color: colors.cream, fontSize: 24, fontWeight: '900' },
  actions: { flexDirection: 'row', gap: 10 },
  clear: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.bgSoft,
  },
  clearText: { color: colors.muted, fontWeight: '700' },
  order: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.accent,
  },
  orderText: { color: colors.white, fontWeight: '800' },
});
