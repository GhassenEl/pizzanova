import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar as RNStatusBar, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './src/context/CartContext';
import { colors } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import PacksScreen from './src/screens/PacksScreen';
import CartScreen from './src/screens/CartScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedPizza, setSelectedPizza] = useState(null);

  return (
    <CartProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        {screen === 'home' && (
          <HomeScreen
            onOpenPizza={(pizza) => {
              setSelectedPizza(pizza);
              setScreen('detail');
            }}
            onOpenPacks={() => setScreen('packs')}
            onOpenCart={() => setScreen('cart')}
          />
        )}
        {screen === 'detail' && selectedPizza && (
          <ProductDetailScreen
            pizza={selectedPizza}
            onBack={() => setScreen('home')}
          />
        )}
        {screen === 'packs' && (
          <PacksScreen onBack={() => setScreen('home')} />
        )}
        {screen === 'cart' && (
          <CartScreen onBack={() => setScreen('home')} />
        )}
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
