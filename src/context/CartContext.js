import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  DELIVERY_FEE,
  TAX_RATE,
  getOfferByCode,
} from '../data/menu';

const CartContext = createContext(null);

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [lastInvoice, setLastInvoice] = useState(null);

  const addPizza = (pizza, sizeId = 'M', qty = 1) => {
    const key = `pizza:${pizza.id}:${sizeId}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          key,
          type: 'pizza',
          id: pizza.id,
          name: pizza.name,
          sizeId,
          emoji: pizza.emoji,
          image: pizza.image,
          unitPrice: pizza._unitPrice,
          qty,
        },
      ];
    });
  };

  const addDrink = (drink, qty = 1) => {
    const key = `drink:${drink.id}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          key,
          type: 'drink',
          id: drink.id,
          name: drink.name,
          volume: drink.volume,
          emoji: drink.emoji,
          image: drink.image,
          unitPrice: drink._unitPrice,
          qty,
        },
      ];
    });
  };

  const addPack = (pack) => {
    const key = `pack:${pack.id}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          key,
          type: 'pack',
          id: pack.id,
          name: pack.name,
          emoji: pack.emoji,
          image: pack.image,
          unitPrice: pack.price,
          qty: 1,
        },
      ];
    });
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clear = () => {
    setItems([]);
    setAppliedOffer(null);
    setPromoCode('');
  };

  const subtotal = useMemo(
    () => round2(items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)),
    [items]
  );

  const deliveryFee = useMemo(() => {
    if (!items.length) return 0;
    if (appliedOffer?.type === 'delivery' && subtotal >= (appliedOffer.minOrder || 0)) {
      return 0;
    }
    return DELIVERY_FEE;
  }, [items.length, appliedOffer, subtotal]);

  const discount = useMemo(() => {
    if (!appliedOffer) return 0;
    if (subtotal < (appliedOffer.minOrder || 0)) return 0;
    if (appliedOffer.type === 'percent') {
      return round2(subtotal * (appliedOffer.value / 100));
    }
    if (appliedOffer.type === 'fixed') {
      return Math.min(subtotal, appliedOffer.value);
    }
    if (appliedOffer.type === 'delivery') {
      return DELIVERY_FEE;
    }
    return 0;
  }, [appliedOffer, subtotal]);

  const taxable = Math.max(0, subtotal - (appliedOffer?.type === 'delivery' ? 0 : discount));
  const tax = round2(taxable * TAX_RATE);
  const total = round2(
    Math.max(0, subtotal - (appliedOffer?.type === 'delivery' ? 0 : discount)) +
      deliveryFee +
      tax
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const applyPromo = (code) => {
    const offer = getOfferByCode(code);
    if (!offer) return { ok: false, message: 'Code invalide' };
    if (subtotal < (offer.minOrder || 0)) {
      return {
        ok: false,
        message: `Minimum ${offer.minOrder} TND requis`,
      };
    }
    setPromoCode(offer.code);
    setAppliedOffer(offer);
    return { ok: true, message: `${offer.title} appliquée` };
  };

  const clearPromo = () => {
    setPromoCode('');
    setAppliedOffer(null);
  };

  const placeAndPay = ({
    customerName,
    phone,
    address,
    paymentMethod,
  }) => {
    if (!items.length) return null;
    const invoiceId = `FAC-${Date.now().toString(36).toUpperCase()}`;
    const orderId = `CMD-${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();
    const snapshot = {
      orderId,
      invoiceId,
      createdAt,
      customerName: customerName.trim() || 'Client',
      phone: phone.trim() || '—',
      address: address.trim() || 'À emporter',
      paymentMethod,
      paymentStatus: 'payé',
      items: items.map((i) => ({ ...i })),
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      offer: appliedOffer
        ? { code: appliedOffer.code, title: appliedOffer.title }
        : null,
    };
    setOrders((prev) => [snapshot, ...prev]);
    setLastInvoice(snapshot);
    clear();
    return snapshot;
  };

  const value = useMemo(
    () => ({
      items,
      addPizza,
      addDrink,
      addPack,
      removeItem,
      clear,
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      count,
      promoCode,
      appliedOffer,
      applyPromo,
      clearPromo,
      orders,
      lastInvoice,
      setLastInvoice,
      placeAndPay,
    }),
    [
      items,
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      count,
      promoCode,
      appliedOffer,
      orders,
      lastInvoice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
