import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

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
          unitPrice: pizza._unitPrice,
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
          unitPrice: pack.price,
          qty: 1,
        },
      ];
    });
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addPizza, addPack, removeItem, clear, total, count }),
    [items, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
