export const CATEGORIES = [
  { id: 'all', label: 'Toutes', emoji: '🍕' },
  { id: 'classiques', label: 'Classiques', emoji: '🧀' },
  { id: 'speciales', label: 'Spéciales', emoji: '🔥' },
  { id: 'vegetariennes', label: 'Végé', emoji: '🌿' },
  { id: 'sucrees', label: 'Sucrées', emoji: '🍫' },
  { id: 'gazeuses', label: 'Gazeuses', emoji: '🥤' },
  { id: 'eaux', label: 'Eaux', emoji: '💧' },
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
  cola:
    'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80',
  colaCan:
    'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=80',
  soda:
    'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80',
  orange:
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80',
  water:
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80',
  waterGlass:
    'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=900&q=80',
  sparkling:
    'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=900&q=80',
  bottle:
    'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=900&q=80',
};

export const FALLBACK_PIZZA_IMAGE = IMG.cheese;

function withKind(list, kind) {
  return list.map((item) => ({ ...item, kind }));
}

/** Prix de base en TND (taille M). discountPct = remise produit. */
const PIZZA_ITEMS = [
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

export const PIZZAS = withKind(PIZZA_ITEMS, 'pizza');

const DRINK_ITEMS = [
  {
    id: 'coca-33',
    name: 'Coca-Cola 33 cl',
    category: 'gazeuses',
    price: 3.5,
    discountPct: 0,
    rating: 4.7,
    prepMin: 1,
    emoji: '🥤',
    badge: null,
    volume: '33 cl',
    tags: ['gazeuse', 'cola', 'boisson'],
    image: IMG.colaCan,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Colorant caramel', 'Caféine', 'Arômes'],
    description:
      'Boisson gazeuse cola glacée, format canette 33 cl. Le classique pour accompagner une pizza.',
  },
  {
    id: 'coca-15',
    name: 'Coca-Cola 1,5 L',
    category: 'gazeuses',
    price: 6,
    discountPct: 5,
    rating: 4.6,
    prepMin: 1,
    emoji: '🥤',
    badge: '-5%',
    volume: '1,5 L',
    tags: ['gazeuse', 'cola', 'famille'],
    image: IMG.cola,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Colorant caramel', 'Caféine', 'Arômes'],
    description:
      'Grande bouteille 1,5 L de Coca-Cola — idéale pour partager à table avec un pack famille.',
  },
  {
    id: 'fanta-33',
    name: 'Fanta Orange 33 cl',
    category: 'gazeuses',
    price: 3.5,
    discountPct: 0,
    rating: 4.5,
    prepMin: 1,
    emoji: '🍊',
    badge: null,
    volume: '33 cl',
    tags: ['gazeuse', 'orange', 'boisson'],
    image: IMG.orange,
    ingredients: ['Eau gazéifiée', 'Jus d\'orange', 'Sucre', 'Arômes naturels', 'Acide citrique'],
    description:
      'Gazeuse orange fruitée et pétillante, format 33 cl. Fraîcheur acidulée avec les pizzas épicées.',
  },
  {
    id: 'sprite-33',
    name: 'Sprite 33 cl',
    category: 'gazeuses',
    price: 3.5,
    discountPct: 0,
    rating: 4.4,
    prepMin: 1,
    emoji: '🍋',
    badge: null,
    volume: '33 cl',
    tags: ['gazeuse', 'citron', 'boisson'],
    image: IMG.soda,
    ingredients: ['Eau gazéifiée', 'Sucre', 'Arômes citron-lime', 'Acide citrique'],
    description:
      'Boisson gazeuse citron-lime, goût léger et rafraîchissant. Parfaite après une Diavola.',
  },
  {
    id: 'boga-33',
    name: 'Boga Cidre 33 cl',
    category: 'gazeuses',
    price: 3.2,
    discountPct: 0,
    rating: 4.6,
    prepMin: 1,
    emoji: '🍎',
    badge: 'Local',
    volume: '33 cl',
    tags: ['gazeuse', 'local', 'boisson'],
    image: IMG.soda,
    ingredients: ['Eau gazéifiée', 'Arôme pomme', 'Sucre', 'Acide citrique'],
    description:
      'Gazeuse tunisienne au goût cidre/pomme. Un choix local pour accompagner vos pizzas.',
  },
  {
    id: 'schweppes-33',
    name: 'Schweppes Citron 33 cl',
    category: 'gazeuses',
    price: 3.8,
    discountPct: 0,
    rating: 4.5,
    prepMin: 1,
    emoji: '🍋',
    badge: null,
    volume: '33 cl',
    tags: ['gazeuse', 'citron', 'premium'],
    image: IMG.orange,
    ingredients: ['Eau gazéifiée', 'Arômes citron', 'Sucre', 'Quinine'],
    description:
      'Schweppes citron pétillant, notes amères légères. Excellent avec les fromages et la Truffe.',
  },
  {
    id: 'eau-plate-50',
    name: 'Eau minérale plate 50 cl',
    category: 'eaux',
    price: 1.5,
    discountPct: 0,
    rating: 4.3,
    prepMin: 1,
    emoji: '💧',
    badge: null,
    volume: '50 cl',
    tags: ['eau', 'plate', 'minérale'],
    image: IMG.water,
    ingredients: ['Eau minérale naturelle'],
    description:
      'Eau minérale naturelle plate, bouteille 50 cl. Hydratation pure pendant le repas.',
  },
  {
    id: 'eau-plate-15',
    name: 'Eau minérale plate 1,5 L',
    category: 'eaux',
    price: 2.5,
    discountPct: 0,
    rating: 4.4,
    prepMin: 1,
    emoji: '💧',
    badge: null,
    volume: '1,5 L',
    tags: ['eau', 'plate', 'famille'],
    image: IMG.bottle,
    ingredients: ['Eau minérale naturelle'],
    description:
      'Grande bouteille d\'eau minérale plate 1,5 L — format table / famille.',
  },
  {
    id: 'eau-gazeuse-50',
    name: 'Eau minérale gazeuse 50 cl',
    category: 'eaux',
    price: 2,
    discountPct: 0,
    rating: 4.5,
    prepMin: 1,
    emoji: '🫧',
    badge: null,
    volume: '50 cl',
    tags: ['eau', 'gazeuse', 'minérale'],
    image: IMG.sparkling,
    ingredients: ['Eau minérale naturelle', 'Gaz carbonique'],
    description:
      'Eau minérale naturellement ou légèrement gazeifiée, 50 cl. Digestion légère après pizza.',
  },
  {
    id: 'eau-gazeuse-15',
    name: 'Eau minérale gazeuse 1,5 L',
    category: 'eaux',
    price: 3,
    discountPct: 0,
    rating: 4.4,
    prepMin: 1,
    emoji: '🫧',
    badge: null,
    volume: '1,5 L',
    tags: ['eau', 'gazeuse', 'famille'],
    image: IMG.waterGlass,
    ingredients: ['Eau minérale naturelle', 'Gaz carbonique'],
    description:
      'Eau minérale gazeuse 1,5 L pour partager. Fraîcheur pétillante sans sucre.',
  },
];

export const DRINKS = withKind(DRINK_ITEMS, 'drink');

/** Catalogue complet (pizzas + boissons). */
export const CATALOG = [...PIZZAS, ...DRINKS];

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

export function getProduct(id) {
  return CATALOG.find((p) => p.id === id);
}

export function getOfferByCode(code) {
  if (!code) return null;
  return OFFERS.find((o) => o.code.toUpperCase() === code.trim().toUpperCase()) || null;
}

export function finalPrice(product, sizeId = 'M') {
  if (product.kind === 'drink') {
    const discounted = product.price * (1 - (product.discountPct || 0) / 100);
    return Math.round(discounted * 100) / 100;
  }
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[1];
  const base = product.price * size.multiplier;
  const discounted = base * (1 - (product.discountPct || 0) / 100);
  return Math.round(discounted * 100) / 100;
}

export function listPrice(product, sizeId = 'M') {
  if (product.kind === 'drink') {
    return Math.round(product.price * 100) / 100;
  }
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[1];
  return Math.round(product.price * size.multiplier * 100) / 100;
}

export function getRecommendations(product, limit = 4) {
  const pool =
    product?.kind === 'drink'
      ? DRINKS
      : product?.kind === 'pizza'
        ? [...PIZZAS, ...DRINKS.filter((d) => d.category === 'gazeuses').slice(0, 2)]
        : PIZZAS;

  if (!product) {
    return [...pool].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }
  const scored = pool
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.kind === product.kind) score += 2;
      const shared = (p.tags || []).filter((t) => (product.tags || []).includes(t));
      score += shared.length * 2;
      if (p.discountPct > 0) score += 1;
      score += p.rating;
      return { product: p, score };
    });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.product);
}

export function getTopRated(limit = 5) {
  return [...PIZZAS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getDealPizzas() {
  return PIZZAS.filter((p) => p.discountPct > 0).sort(
    (a, b) => b.discountPct - a.discountPct
  );
}

export function getDrinksByCategory(category) {
  if (category === 'gazeuses' || category === 'eaux') {
    return DRINKS.filter((d) => d.category === category);
  }
  return DRINKS;
}
