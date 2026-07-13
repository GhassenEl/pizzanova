import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing } from '../theme';

const METHOD_LABEL = {
  card: 'Carte bancaire',
  cash: 'Espèces',
  wallet: 'Wallet',
};

export default function InvoiceScreen({ invoice, onHome, onOrders }) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  if (!invoice) {
    return (
      <View style={styles.root}>
        <Text style={styles.empty}>Aucune facture</Text>
        <Pressable onPress={onHome}>
          <Text style={styles.link}>← Accueil</Text>
        </Pressable>
      </View>
    );
  }

  const date = new Date(invoice.createdAt).toLocaleString('fr-TN');

  return (
    <Animated.View
      style={[styles.root, { opacity, transform: [{ scale }] }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stamp}>PAYÉ</Text>
        <Text style={styles.title}>Facture</Text>
        <Text style={styles.id}>{invoice.invoiceId}</Text>
        <Text style={styles.meta}>Commande {invoice.orderId}</Text>
        <Text style={styles.meta}>{date}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Client</Text>
          <Text style={styles.line}>{invoice.customerName}</Text>
          <Text style={styles.line}>{invoice.phone}</Text>
          <Text style={styles.line}>{invoice.address}</Text>
          <Text style={[styles.line, { marginTop: 8 }]}>
            Paiement : {METHOD_LABEL[invoice.paymentMethod] || invoice.paymentMethod} ·{' '}
            {invoice.paymentStatus}
          </Text>
          {invoice.offer ? (
            <Text style={styles.offer}>
              Offre : {invoice.offer.title} ({invoice.offer.code})
            </Text>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Articles</Text>
          {invoice.items.map((item) => (
            <View key={item.key} style={styles.item}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.thumb} />
              ) : null}
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>
                  {item.name}
                  {item.sizeId ? ` · ${item.sizeId}` : ''} ×{item.qty}
                </Text>
              </View>
              <Text style={styles.itemPrice}>
                {(item.unitPrice * item.qty).toFixed(2)}
              </Text>
            </View>
          ))}
          <Divider />
          <Money label="Sous-total" value={invoice.subtotal} />
          {invoice.discount > 0 ? (
            <Money label="Remise" value={-invoice.discount} />
          ) : null}
          <Money label="Livraison" value={invoice.deliveryFee} />
          <Money label="TVA" value={invoice.tax} />
          <Money label="Total TTC" value={invoice.total} bold />
        </View>

        <Pressable style={styles.primary} onPress={onHome}>
          <Text style={styles.primaryText}>Nouvelle commande</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={onOrders}>
          <Text style={styles.secondaryText}>Mes commandes</Text>
        </Pressable>
      </ScrollView>
    </Animated.View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function Money({ label, value, bold }) {
  return (
    <View style={styles.money}>
      <Text style={[styles.moneyLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.moneyValue, bold && styles.bold]}>
        {value.toFixed(2)} TND
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 40 },
  empty: { color: colors.muted, textAlign: 'center', marginTop: 80 },
  link: {
    color: colors.accentSoft,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '700',
  },
  stamp: {
    alignSelf: 'center',
    color: colors.success,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 4,
    borderWidth: 2,
    borderColor: colors.success,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.cream,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  id: {
    color: colors.gold,
    textAlign: 'center',
    fontWeight: '800',
    marginTop: 8,
    fontSize: 16,
  },
  meta: { color: colors.muted, textAlign: 'center', marginTop: 4, fontSize: 13 },
  card: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
  },
  cardTitle: {
    color: colors.gold,
    fontWeight: '800',
    marginBottom: 10,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  line: { color: colors.cream, marginBottom: 4, fontSize: 14 },
  offer: { color: colors.success, marginTop: 8, fontWeight: '700' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: colors.bgSoft,
  },
  itemName: { color: colors.cream, fontSize: 14 },
  itemPrice: { color: colors.cream, fontWeight: '700' },
  divider: {
    height: 1,
    backgroundColor: 'rgba(196,164,132,0.25)',
    marginVertical: 10,
  },
  money: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  moneyLabel: { color: colors.muted },
  moneyValue: { color: colors.cream },
  bold: { fontWeight: '900', fontSize: 16, color: colors.cream },
  primary: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryText: { color: colors.white, fontWeight: '900', fontSize: 15 },
  secondary: {
    marginTop: 10,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,179,3,0.35)',
  },
  secondaryText: { color: colors.gold, fontWeight: '700' },
});
