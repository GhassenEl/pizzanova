export const CATEGORIES = [
  { id: 'all', label: 'Toutes', emoji: '🍕' },
  { id: 'classiques', label: 'Classiques', emoji: '🧀' },
  { id: 'speciales', label: 'Spéciales', emoji: '🔥' },
  { id: 'vegetariennes', label: 'Végé', emoji: '🌿' },
  { id: 'sucrees', label: 'Sucrées', emoji: '🍫' },
];

export const SIZES = [
  { id: 'S', label: 'Petite', multiplier: 0.85 },
  { id: 'M', label: 'Moyenne', multiplier: 1 },
  { id: 'L', label: 'Grande', multiplier: 1.35 },
];

/** Prix de base en TND (taille M). discountPct = remise produit. */
export const PIZZAS = [
  {
    id: 'margherita',
    name: 'Margherita',
    category: 'classiques',
    price: 18,
    discountPct: 0,
    rating: 4.7,
    prepMin: 15,
    emoji: '🍅',
    badge: null,
    tags: ['classique', 'fromage', 'tomate'],
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Basilic frais', "Huile d'olive"],
    description: 'La reine des classiques — simple, fondante, authentique.',
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    category: 'classiques',
    price: 24,
    discountPct: 10,
    rating: 4.8,
    prepMin: 18,
    emoji: '🌶️',
    badge: '-10%',
    tags: ['classique', 'viande', 'épicé'],
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Pepperoni', 'Origan'],
    description: 'Croûte croustillante, pepperoni grillé et fromage filandreux.',
  },
  {
    id: 'quatre-fromages',
    name: '4 Fromages',
    category: 'classiques',
    price: 26,
    discountPct: 0,
    rating: 4.6,
    prepMin: 16,
    emoji: '🧀',
    badge: null,
    tags: ['classique', 'fromage', 'crème'],
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Chèvre', 'Parmesan', 'Crème'],
    description: 'Quatuor crémeux pour les fans de fromage.',
  },
  {
    id: 'diavola',
    name: 'Diavola',
    category: 'speciales',
    price: 28,
    discountPct: 15,
    rating: 4.9,
    prepMin: 20,
    emoji: '😈',
    badge: '-15%',
    tags: ['épicé', 'viande', 'spécial'],
    image:
      'https://images.unsplash.com/photo-1604382355076-af4b0eb75b4a?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Sauce tomate piquante', 'Mozzarella', 'Salami épicé', 'Piments', 'Miel'],
    description: 'Feu contrôlé — piquant, sucré, addictif.',
  },
  {
    id: 'truffe',
    name: 'Truffe Blanche',
    category: 'speciales',
    price: 42,
    discountPct: 0,
    rating: 4.9,
    prepMin: 22,
    emoji: '✨',
    badge: 'Premium',
    tags: ['premium', 'champignon', 'crème'],
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Crème', 'Mozzarella', 'Champignons', 'Huile de truffe', 'Parmesan'],
    description: 'Signature PizzaNova — parfum de truffe, texture soyeuse.',
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken',
    category: 'speciales',
    price: 30,
    discountPct: 20,
    rating: 4.5,
    prepMin: 20,
    emoji: '🍗',
    badge: '-20%',
    tags: ['viande', 'bbq', 'spécial'],
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Sauce BBQ', 'Poulet grillé', 'Oignons rouges', 'Mozzarella', 'Coriandre'],
    description: 'Saveurs smokehouse sur pâte napolitaine.',
  },
  {
    id: 'veggie-garden',
    name: 'Jardin Vert',
    category: 'vegetariennes',
    price: 22,
    discountPct: 5,
    rating: 4.4,
    prepMin: 17,
    emoji: '🥗',
    badge: '-5%',
    tags: ['végé', 'légumes', 'léger'],
    image:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d5b?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Sauce tomate', 'Courgettes', 'Poivrons', 'Olives', 'Roquette'],
    description: 'Légumes grillés, fraîcheur et croquant.',
  },
  {
    id: 'funghi',
    name: 'Funghi',
    category: 'vegetariennes',
    price: 23,
    discountPct: 0,
    rating: 4.5,
    prepMin: 16,
    emoji: '🍄',
    badge: null,
    tags: ['végé', 'champignon', 'crème'],
    image:
      'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Crème', 'Champignons', 'Ail', 'Mozzarella', 'Persil'],
    description: 'Forestière douce, parfaite en semaine.',
  },
  {
    id: 'nutella',
    name: 'Nutella Banane',
    category: 'sucrees',
    price: 20,
    discountPct: 10,
    rating: 4.8,
    prepMin: 12,
    emoji: '🍌',
    badge: '-10%',
    tags: ['dessert', 'chocolat', 'sucré'],
    image:
      'https://images.unsplash.com/photo-1620374645498-af6bd681a0bd?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Nutella', 'Banane', 'Noisettes', 'Sucre glace'],
    description: 'Dessert partageable — croûte chaude, cœur fondant.',
  },
  {
    id: 'oreo',
    name: 'Cookie Crush',
    category: 'sucrees',
    price: 21,
    discountPct: 0,
    rating: 4.6,
    prepMin: 14,
    emoji: '🍪',
    badge: 'Nouveau',
    tags: ['dessert', 'chocolat', 'sucré'],
    image:
      'https://images.unsplash.com/photo-1594007654729-407eedc4be64?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Crème pâtissière', 'Cookies', 'Chocolat noir', 'Coulis'],
    description: 'Enfant gourmand version pizza.',
  },
];

export const PACKS = [
  {
    id: 'pack-duo',
    name: 'Pack Duo',
    emoji: '💑',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    pizzas: ['margherita', 'pepperoni'],
    drinks: 2,
    price: 48,
    originalPrice: 58,
    discountPct: 17,
    description: '2 pizzas M + 2 boissons — idéal à deux.',
  },
  {
    id: 'pack-family',
    name: 'Pack Famille',
    emoji: '👨‍👩‍👧‍👦',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    pizzas: ['margherita', 'pepperoni', 'veggie-garden', 'quatre-fromages'],
    drinks: 4,
    price: 89,
    originalPrice: 112,
    discountPct: 20,
    description: '4 pizzas L + 4 boissons — table familiale.',
  },
  {
    id: 'pack-party',
    name: 'Pack Party',
    emoji: '🎉',
    image:
      'https://images.unsplash.com/photo-1604382355076-af4b0eb75b4a?auto=format&fit=crop&w=900&q=80',
    pizzas: ['diavola', 'truffe', 'bbq-chicken', 'funghi', 'nutella'],
    drinks: 6,
    price: 149,
    originalPrice: 195,
    discountPct: 24,
    description: '5 pizzas mixtes + 6 boissons — soirée réussie.',
  },
  {
    id: 'pack-veggie',
    name: 'Pack Vert',
    emoji: '🌱',
    image:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d5b?auto=format&fit=crop&w=900&q=80',
    pizzas: ['veggie-garden', 'funghi', 'quatre-fromages'],
    drinks: 3,
    price: 62,
    originalPrice: 75,
    discountPct: 17,
    description: '3 pizzas végétariennes + 3 boissons.',
  },
];

/** Offres promo (codes + banners). */
export const OFFERS = [
  {
    id: 'flash-midi',
    title: 'Flash Midi',
    subtitle: '-15% sur tout le panier avant 15h',
    code: 'MIDI15',
    type: 'percent',
    value: 15,
    minOrder: 25,
    color: '#E85D04',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'livraison',
    title: 'Livraison offerte',
    subtitle: 'Code LIVRE0 dès 40 TND',
    code: 'LIVRE0',
    type: 'delivery',
    value: 5,
    minOrder: 40,
    color: '#2A9D8F',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'weekend',
    title: 'Week-end Gourmand',
    subtitle: '-8 TND avec WEEK8',
    code: 'WEEK8',
    type: 'fixed',
    value: 8,
    minOrder: 50,
    color: '#FFB703',
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nouveau',
    title: 'Bienvenue',
    subtitle: '-20% première commande · NOVA20',
    code: 'NOVA20',
    type: 'percent',
    value: 20,
    minOrder: 20,
    color: '#E63946',
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
  },
];

export const DELIVERY_FEE = 5;
export const TAX_RATE = 0.07;

export function getPizza(id) {
  return PIZZAS.find((p) => p.id === id);
}

export function getOfferByCode(code) {
  if (!code) return null;
  return OFFERS.find((o) => o.code.toUpperCase() === code.trim().toUpperCase()) || null;
}

export function finalPrice(pizza, sizeId = 'M') {
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[1];
  const base = pizza.price * size.multiplier;
  const discounted = base * (1 - (pizza.discountPct || 0) / 100);
  return Math.round(discounted * 100) / 100;
}

export function listPrice(pizza, sizeId = 'M') {
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[1];
  return Math.round(pizza.price * size.multiplier * 100) / 100;
}

/** Recommandations : même catégorie / tags, puis meilleures notes. */
export function getRecommendations(pizza, limit = 4) {
  if (!pizza) {
    return [...PIZZAS].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }
  const scored = PIZZAS.filter((p) => p.id !== pizza.id).map((p) => {
    let score = 0;
    if (p.category === pizza.category) score += 3;
    const shared = (p.tags || []).filter((t) => (pizza.tags || []).includes(t));
    score += shared.length * 2;
    if (p.discountPct > 0) score += 1;
    score += p.rating;
    return { pizza: p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.pizza);
}

export function getTopRated(limit = 5) {
  return [...PIZZAS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getDealPizzas() {
  return PIZZAS.filter((p) => p.discountPct > 0).sort(
    (a, b) => b.discountPct - a.discountPct
  );
}
