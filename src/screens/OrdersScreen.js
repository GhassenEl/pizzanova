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

export default function OrdersScreen({ onBack, onOpenInvoice }) {
  const { orders, setLastInvoice } = useCart();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.root, { opacity }]}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>← Retour</Text>
        </Pressable>
        <Text style={styles.title}>Mes commandes</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyText}>Aucune commande pour l’instant</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {orders.map((order) => (
            <Pressable
              key={order.orderId}
              style={styles.card}
              onPress={() => {
                setLastInvoice(order);
                onOpenInvoice(order);
              }}
            >
              <View style={styles.row}>
                <Text style={styles.id}>{order.orderId}</Text>
                <View style={styles.paid}>
                  <Text style={styles.paidText}>PAYÉ</Text>
                </View>
              </View>
              <Text style={styles.date}>
                {new Date(order.createdAt).toLocaleString('fr-TN')}
              </Text>
              <Text style={styles.total}>{order.total.toFixed(2)} TND</Text>
              <Text style={styles.hint}>Voir facture →</Text>
            </Pressable>
          ))}
        </ScrollView>
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
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: colors.muted },
  list: { padding: spacing.lg },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.12)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: { color: colors.cream, fontWeight: '800', fontSize: 15 },
  paid: {
    backgroundColor: 'rgba(42,157,143,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  paidText: { color: colors.success, fontWeight: '800', fontSize: 11 },
  date: { color: colors.muted, marginTop: 6, fontSize: 12 },
  total: {
    color: colors.accentSoft,
    fontWeight: '900',
    fontSize: 20,
    marginTop: 8,
  },
  hint: { color: colors.gold, marginTop: 8, fontWeight: '600', fontSize: 13 },
});
