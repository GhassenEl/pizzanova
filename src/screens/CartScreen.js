import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';

export default function CartScreen({ onBack, onCheckout }) {
  const {
    items,
    subtotal,
    discount,
    deliveryFee,
    tax,
    total,
    removeItem,
    clear,
    promoCode,
    appliedOffer,
    applyPromo,
    clearPromo,
  } = useCart();
  const [code, setCode] = useState(promoCode || '');
  const [msg, setMsg] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const onApply = () => {
    const res = applyPromo(code);
    setMsg(res.message);
  };

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
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.thumb} />
                ) : (
                  <Text style={styles.emoji}>{item.emoji}</Text>
                )}
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

            <Text style={styles.section}>Code promo</Text>
            <View style={styles.promoRow}>
              <TextInput
                value={code}
                onChangeText={setCode}
                placeholder="ex: MIDI15"
                placeholderTextColor={colors.muted}
                autoCapitalize="characters"
                style={styles.input}
              />
              <Pressable style={styles.applyBtn} onPress={onApply}>
                <Text style={styles.applyText}>OK</Text>
              </Pressable>
            </View>
            {appliedOffer ? (
              <Pressable onPress={clearPromo}>
                <Text style={styles.promoOk}>
                  ✓ {appliedOffer.title} ({appliedOffer.code}) — retirer
                </Text>
              </Pressable>
            ) : msg ? (
              <Text style={styles.promoMsg}>{msg}</Text>
            ) : null}

            <View style={styles.summary}>
              <Row label="Sous-total" value={subtotal} />
              {discount > 0 ? (
                <Row label="Remise offre" value={-discount} accent />
              ) : null}
              <Row label="Livraison" value={deliveryFee} />
              <Row label="TVA (7%)" value={tax} />
              <Row label="Total" value={total} bold />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View>
              <Text style={styles.totalLabel}>À payer</Text>
              <Text style={styles.total}>{total.toFixed(2)} TND</Text>
            </View>
            <View style={styles.actions}>
              <Pressable style={styles.clear} onPress={clear}>
                <Text style={styles.clearText}>Vider</Text>
              </Pressable>
              <Pressable style={styles.order} onPress={onCheckout}>
                <Text style={styles.orderText}>Commander</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </Animated.View>
  );
}

function Row({ label, value, bold, accent }) {
  return (
    <View style={styles.sumRow}>
      <Text style={[styles.sumLabel, bold && styles.bold]}>{label}</Text>
      <Text
        style={[
          styles.sumValue,
          bold && styles.bold,
          accent && { color: colors.success },
        ]}
      >
        {value.toFixed(2)} TND
      </Text>
    </View>
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
  list: { padding: spacing.lg, paddingBottom: 160 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: colors.bgSoft,
  },
  emoji: { fontSize: 28, marginRight: 12 },
  body: { flex: 1 },
  name: { color: colors.cream, fontWeight: '700', fontSize: 15 },
  meta: { color: colors.muted, marginTop: 4, fontSize: 13 },
  remove: { color: colors.danger, fontSize: 18, padding: 8 },
  section: {
    color: colors.gold,
    fontWeight: '800',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  promoRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.cream,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.2)',
  },
  applyBtn: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  applyText: { color: colors.white, fontWeight: '800' },
  promoOk: { color: colors.success, marginTop: 8, fontWeight: '600' },
  promoMsg: { color: colors.danger, marginTop: 8, fontSize: 13 },
  summary: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
  },
  sumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sumLabel: { color: colors.muted, fontSize: 14 },
  sumValue: { color: colors.cream, fontSize: 14 },
  bold: { fontWeight: '900', color: colors.cream, fontSize: 16 },
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
