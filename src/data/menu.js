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
    ingredients: ['Sauce tomate', 'Mozzarella', 'Basilic frais', 'Huile d\'olive'],
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
    ingredients: ['Crème pâtissière', 'Cookies', 'Chocolat noir', 'Coulis'],
    description: 'Enfant gourmand version pizza.',
  },
];

export const PACKS = [
  {
    id: 'pack-duo',
    name: 'Pack Duo',
    emoji: '💑',
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
    pizzas: ['veggie-garden', 'funghi', 'quatre-fromages'],
    drinks: 3,
    price: 62,
    originalPrice: 75,
    discountPct: 17,
    description: '3 pizzas végétariennes + 3 boissons.',
  },
];

export function getPizza(id) {
  return PIZZAS.find((p) => p.id === id);
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
