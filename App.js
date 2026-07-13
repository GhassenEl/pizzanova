import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CartProvider, useCart } from './src/context/CartContext';
import { colors } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import PacksScreen from './src/screens/PacksScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import InvoiceScreen from './src/screens/InvoiceScreen';
import OffersScreen from './src/screens/OffersScreen';
import OrdersScreen from './src/screens/OrdersScreen';

function Navigator() {
  const { lastInvoice } = useCart();
  const [screen, setScreen] = useState('home');
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const openPizza = (pizza) => {
    setSelectedPizza(pizza);
    setScreen('detail');
  };

  return (
    <>
      {screen === 'home' && (
        <HomeScreen
          onOpenPizza={openPizza}
          onOpenPacks={() => setScreen('packs')}
          onOpenCart={() => setScreen('cart')}
          onOpenOffers={() => setScreen('offers')}
          onOpenOrders={() => setScreen('orders')}
        />
      )}
      {screen === 'detail' && selectedPizza && (
        <ProductDetailScreen
          pizza={selectedPizza}
          onBack={() => setScreen('home')}
          onOpenPizza={openPizza}
        />
      )}
      {screen === 'packs' && (
        <PacksScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'offers' && (
        <OffersScreen
          onBack={() => setScreen('home')}
          onApplied={() => setScreen('cart')}
        />
      )}
      {screen === 'cart' && (
        <CartScreen
          onBack={() => setScreen('home')}
          onCheckout={() => setScreen('checkout')}
        />
      )}
      {screen === 'checkout' && (
        <CheckoutScreen
          onBack={() => setScreen('cart')}
          onPaid={(inv) => {
            setInvoice(inv);
            setScreen('invoice');
          }}
        />
      )}
      {screen === 'invoice' && (
        <InvoiceScreen
          invoice={invoice || lastInvoice}
          onHome={() => setScreen('home')}
          onOrders={() => setScreen('orders')}
        />
      )}
      {screen === 'orders' && (
        <OrdersScreen
          onBack={() => setScreen('home')}
          onOpenInvoice={(inv) => {
            setInvoice(inv);
            setScreen('invoice');
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <Navigator />
      </SafeAreaView>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0,
  },
});
