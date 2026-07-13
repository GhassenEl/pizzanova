import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FALLBACK_PIZZA_IMAGE } from '../data/menu';
import { colors } from '../theme';

/** Image pizza avec fallback si l’URL échoue. */
export default function PizzaImage({ uri, style, fallback = FALLBACK_PIZZA_IMAGE }) {
  const [src, setSrc] = useState(uri || fallback);

  return (
    <View style={[styles.wrap, style]}>
      <Image
        source={{ uri: src }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: colors.bgSoft,
  },
});
