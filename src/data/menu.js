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

/** Images Unsplash vérifiées HTTP 200 (juillet 2026). */
const IMG = {
  margherita:
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
  pepperoni:
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
  cheese:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  spicy:
    'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=900&q=80',
  gourmet:
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
  whole:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
  veggie:
    'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=80',
  funghi:
    'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=900&q=80',
  dessert:
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
  sweet:
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80',
  rustic:
    'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=900&q=80',
  wood:
    'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=900&q=80',
  slice:
    'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
  oven:
    'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=900&q=80',
};

export const FALLBACK_PIZZA_IMAGE = IMG.cheese;

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
    image: IMG.margherita,
    ingredients: ['Sauce tomate San Marzano', 'Mozzarella fior di latte', 'Basilic frais', "Huile d'olive"],
    description:
      'Pizza napolitaine traditionnelle : pâte fine, sauce tomate douce, mozzarella fondante et basilic frais. Idéale pour les puristes.',
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
    image: IMG.pepperoni,
    ingredients: ['Sauce tomate', 'Mozzarella', 'Pepperoni grillé', 'Origan', 'Huile pimentée'],
    description:
      'Croûte croustillante garnie de pepperoni légèrement grillé, mozzarella filandreuse et une touche d’origan. Classique indémodable.',
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
    image: IMG.cheese,
    ingredients: ['Base crème', 'Mozzarella', 'Gorgonzola', 'Chèvre', 'Parmesan'],
    description:
      'Base crème onctueuse et quatuor de fromages (mozzarella, gorgonzola, chèvre, parmesan) pour un goût riche et fondant.',
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
    image: IMG.spicy,
    ingredients: ['Sauce tomate piquante', 'Mozzarella', 'Salami épicé', 'Piments frais', 'Filet de miel'],
    description:
      'Version diabolique : salami épicé, piments et sauce tomate relevée, équilibrée par un filet de miel. Pour les amateurs de feu.',
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
    image: IMG.gourmet,
    ingredients: ['Crème fraîche', 'Mozzarella', 'Champignons sautés', 'Huile de truffe', 'Copeaux de parmesan'],
    description:
      'Signature PizzaNova : crème, champignons dorés et huile de truffe blanche. Texture soyeuse, arôme intense — portion premium.',
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
    image: IMG.whole,
    ingredients: ['Sauce BBQ fumée', 'Poulet grillé', 'Oignons rouges', 'Mozzarella', 'Coriandre fraîche'],
    description:
      'Poulet mariné grillé, sauce barbecue fumée, oignons rouges et mozzarella. Saveurs smokehouse sur pâte napolitaine.',
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
    image: IMG.veggie,
    ingredients: ['Sauce tomate', 'Courgettes grillées', 'Poivrons', 'Olives noires', 'Roquette'],
    description:
      'Légumes de saison grillés (courgettes, poivrons), olives et roquette croquante sur sauce tomate légère. Fraîche et colorée.',
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
    image: IMG.funghi,
    ingredients: ['Base crème', 'Champignons de Paris', 'Ail confit', 'Mozzarella', 'Persil plat'],
    description:
      'Forestière douce : crème à l’ail, champignons sautés et mozzarella. Parfaite en semaine, réconfortante sans être lourde.',
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
    image: IMG.dessert,
    ingredients: ['Pâte à pizza sucrée', 'Nutella', 'Banane fraîche', 'Noisettes concassées', 'Sucre glace'],
    description:
      'Dessert partageable : croûte chaude, généreux Nutella, rondelles de banane et noisettes croquantes. Saupoudrée de sucre glace.',
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
    image: IMG.sweet,
    ingredients: ['Crème pâtissière', 'Cookies écrasés', 'Chocolat noir fondu', 'Coulis caramel'],
    description:
      'Pizza dessert gourmande : crème pâtissière, cookies croustillants, chocolat noir et filet de caramel. Version enfant (et adulte) gourmand.',
  },
];

export const PACKS = [
  {
    id: 'pack-duo',
    name: 'Pack Duo',
    emoji: '💑',
    image: IMG.cheese,
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
    image: IMG.whole,
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
    image: IMG.spicy,
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
    image: IMG.veggie,
    pizzas: ['veggie-garden', 'funghi', 'quatre-fromages'],
    drinks: 3,
    price: 62,
    originalPrice: 75,
    discountPct: 17,
    description: '3 pizzas végétariennes + 3 boissons.',
  },
];

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
    image: IMG.margherita,
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
    image: IMG.whole,
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
    image: IMG.pepperoni,
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
    image: IMG.gourmet,
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
