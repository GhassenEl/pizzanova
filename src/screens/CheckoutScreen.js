import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';
import { useCart } from '../context/CartContext';

const METHODS = [
  { id: 'card', label: 'Carte bancaire', icon: '💳' },
  { id: 'cash', label: 'Espèces à la livraison', icon: '💵' },
  { id: 'wallet', label: 'Wallet / Flouci', icon: '📱' },
];

export default function CheckoutScreen({ onBack, onPaid }) {
  const { items, total, subtotal, discount, deliveryFee, tax, placeAndPay } =
    useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [method, setMethod] = useState('card');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const pay = () => {
    if (!name.trim() || !phone.trim()) {
      setError('Nom et téléphone requis');
      return;
    }
    setError('');
    setPaying(true);
    setTimeout(() => {
      const invoice = placeAndPay({
        customerName: name,
        phone,
        address,
        paymentMethod: method,
      });
      setPaying(false);
      if (invoice) onPaid(invoice);
    }, 900);
  };

  if (!items.length) {
    return (
      <View style={styles.root}>
        <Pressable onPress={onBack} style={styles.pad}>
          <Text style={styles.back}>← Retour</Text>
        </Pressable>
        <Text style={[styles.title, styles.pad]}>Panier vide</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.root, { opacity }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>← Panier</Text>
        </Pressable>
        <Text style={styles.title}>Passer commande</Text>
        <Text style={styles.sub}>
          {items.length} article(s) · {total.toFixed(2)} TND
        </Text>

        <Text style={styles.section}>Livraison</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          placeholderTextColor={colors.muted}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={[styles.input, styles.area]}
          placeholder="Adresse de livraison"
          placeholderTextColor={colors.muted}
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.section}>Paiement</Text>
        {METHODS.map((m) => {
          const active = method === m.id;
          return (
            <Pressable
              key={m.id}
              onPress={() => setMethod(m.id)}
              style={[styles.method, active && styles.methodActive]}
            >
              <Text style={styles.methodIcon}>{m.icon}</Text>
              <Text style={[styles.methodLabel, active && styles.methodLabelOn]}>
                {m.label}
              </Text>
            </Pressable>
          );
        })}

        <View style={styles.box}>
          <Line label="Sous-total" value={subtotal} />
          {discount > 0 ? <Line label="Remise" value={-discount} /> : null}
          <Line label="Livraison" value={deliveryFee} />
          <Line label="TVA" value={tax} />
          <Line label="Total facture" value={total} bold />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.payBtn, paying && { opacity: 0.7 }]}
          onPress={pay}
          disabled={paying}
        >
          <Text style={styles.payText}>
            {paying ? 'Paiement en cours…' : `Payer ${total.toFixed(2)} TND`}
          </Text>
        </Pressable>
      </ScrollView>
    </Animated.View>
  );
}

function Line({ label, value, bold }) {
  return (
    <View style={styles.line}>
      <Text style={[styles.lineLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.lineValue, bold && styles.bold]}>
        {value.toFixed(2)} TND
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  pad: { padding: spacing.lg },
  content: { padding: spacing.lg, paddingBottom: 40 },
  back: { color: colors.accentSoft, fontWeight: '700', marginBottom: 8 },
  title: { color: colors.cream, fontSize: 28, fontWeight: '900' },
  sub: { color: colors.muted, marginTop: 4, marginBottom: spacing.md },
  section: {
    color: colors.gold,
    fontWeight: '800',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.cream,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.15)',
  },
  area: { minHeight: 80, textAlignVertical: 'top' },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  methodActive: { borderColor: colors.accent, backgroundColor: colors.cardLift },
  methodIcon: { fontSize: 22, marginRight: 12 },
  methodLabel: { color: colors.muted, fontWeight: '600', fontSize: 15 },
  methodLabelOn: { color: colors.cream },
  box: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  lineLabel: { color: colors.muted },
  lineValue: { color: colors.cream },
  bold: { fontWeight: '900', fontSize: 16, color: colors.cream },
  error: { color: colors.danger, marginTop: 12, fontWeight: '600' },
  payBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payText: { color: colors.white, fontWeight: '900', fontSize: 16 },
});
