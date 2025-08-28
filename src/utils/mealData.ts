import { DayMenu } from '../types/mealReservation';

// Simple food items with title and description
export const FOOD_ITEMS = {
  // Day 1 Menu Items
  day1VegItems: [
    { title: 'Shahi Veg Kabab', description: 'Fragrant spiced vegetarian kebabs, grilled to perfection' },
    { title: 'Royal Fried Rice', description: 'Aromatic basmati rice tossed with vegetables and mild spices' },
    { title: 'Fulkopir Dorma', description: 'Cauliflower florets stuffed and simmered in a rich Bengali-style curry' },
    { title: 'Paneer-e-Khaas', description: 'Cottage cheese cooked in a silky, flavorful gravy' },
    { title: 'Aam Madhuri', description: 'Traditional sweet mango chutney with a tangy twist' },
    { title: 'Rasmalai Royale', description: 'Soft cottage cheese dumplings soaked in saffron milk' }
  ],
  day1NonVegItems: [
    { title: 'Machher Ruchi Pathuri', description: 'Bengali-style fish wrapped in banana leaves and steamed to perfection' },
    { title: 'Royal Fried Rice', description: 'Fluffy basmati rice tossed with garden-fresh vegetables' },
    { title: 'Fulkopir Dorma', description: 'Cauliflower stuffed and slow-cooked in a spiced Bengali-style curry' },
    { title: 'Shahi Mutton Kosha', description: 'Succulent mutton, slow-braised in rich, bold gravy' },
    { title: 'Aam Madhuri', description: 'A traditional sweet and tangy mango chutney' },
    { title: 'Rasmalai Royale', description: 'Soft cottage cheese dumplings in saffron-infused milk' }
  ],
  
  // Day 2 Menu Items
  day2VegItems: [
    { title: 'Heritage Veg Chop', description: 'Crispy spiced vegetable croquettes, a timeless Bengali favorite' },
    { title: 'Basanti Pulao', description: 'Fragrant golden rice with a touch of sweetness and saffron glow' },
    { title: 'Kashmiri Sada Aloo Dum', description: 'Baby potatoes simmered in light Kashmiri-style spices' },
    { title: 'Paneer Kaju Masala', description: 'Cottage cheese in a rich cashew-kissed gravy' },
    { title: 'Anaras Madhuri', description: 'Pineapple chutney with a sweet-tangy charm' },
    { title: 'Kalakand Delight', description: 'Soft, melt-in-mouth milk fudge with a festive touch' }
  ],
  day2NonVegItems: [
    { title: 'Golden Bay Fish Fry', description: 'Crispy Pangasius fillet, delicately spiced and golden fried' },
    { title: 'Basanti Pulao', description: 'Fragrant saffron rice with a hint of sweetness' },
    { title: 'Kashmiri Sada Aloo Dum', description: 'Baby potatoes in a light, flavorful Kashmiri-style gravy' },
    { title: 'Chingri Malaikari', description: 'Prawns simmered in a luxurious coconut-milk curry' },
    { title: 'Anaras Madhuri', description: 'Sweet-tangy pineapple chutney, a refreshing touch' },
    { title: 'Kalakand Delight', description: 'Soft, grainy milk fudge that melts in the mouth' }
  ],
  
  // Day 3 Menu Items
  day3VegItems: [
    { title: 'Crispy Beguni', description: 'Golden fried eggplant, light and flavorful' },
    { title: 'Shahi Veg Kabab', description: 'Soft, spiced vegetable patties grilled to perfection' },
    { title: 'Royal Khichuri', description: 'Fragrant Bengali rice and lentil blend, comfort on a plate' },
    { title: 'Bangali Labra', description: 'Seasonal vegetables slow-cooked with gentle spices' },
    { title: 'Fruit Symphony Chutney', description: 'A sweet and tangy medley of mixed fruits' },
    { title: 'Nolen Gurer Payesh', description: 'Traditional Bengali rice pudding enriched with date palm jaggery' }
  ],
  
  // Day 4 Menu Items
  day4Items: [
    { title: 'Anandamela Food Arrangement', description: 'Visit various food stalls and buy fresh food on the spot - Indian street food, sweets, snacks and more! Please carry cash for buying snacks at the venue.' }
  ]
};

// Menu descriptions configuration
export const MENU_DESCRIPTIONS = {
  DAY1: {
    VEG: {
      name: 'Vegetarian Thali',
      description: 'Shahi Veg Kabab, Royal Fried Rice, Fulkopir Dorma, Paneer-e-Khaas, Aam Madhuri, Rasmalai Royale'
    },
    NON_VEG: {
      name: 'Non-Vegetarian Thali',
      description: 'Golden Bay Fish Fry, Royal Fried Rice, Fulkopir Dorma, Shahi Mutton Kosha, Aam Madhuri, Rasmalai Royale'
    }
  },
  DAY2: {
    VEG: {
      name: 'Vegetarian Thali',
      description: 'Heritage Veg Chop, Basanti Pulao, Kashmiri Sada Aloo Dum, Paneer Kaju Masala, Anaras Madhuri, Kalakand Delight'
    },
    NON_VEG: {
      name: 'Non-Vegetarian Thali',
      description: 'Golden Bay Fish Fry, Basanti Pulao, Kashmiri Sada Aloo Dum, Chingri Malaikari, Anaras Madhuri, Kalakand Delight'
    }
  },
  DAY3: {
    VEG: {
      name: 'Vegetarian Thali',
      description: 'Crispy Beguni, Shahi Veg Kabab, Royal Khichuri, Bangali Labra, Fruit Symphony Chutney, Nolen Gurer Payesh'
    }
  }
} as const;

// Day-specific pricing configuration
export const DAILY_PRICES = {
  DAY1: {
    VEG: 15.00,
    NON_VEG: 18.00
  },
  DAY2: {
    VEG: 15.00,
    NON_VEG: 17.00
  },
  DAY3: {
    VEG: 15.00,
    NON_VEG: 0.00
  }
} as const;

export const MEMBER_DISCOUNT_PERCENTAGE = 5;

// Helper function to get price by day number and type
export const getPriceByDay = (dayNumber: string, isVeg: boolean): number => {
  const key = `DAY${dayNumber}` as keyof typeof DAILY_PRICES;
  if (key in DAILY_PRICES) {
    return !isVeg ? DAILY_PRICES[key].NON_VEG : DAILY_PRICES[key].VEG;
  }
  return 0;
};

export const durgaPujaMeals2025: DayMenu[] = [
  {
    date: '2025-09-28',
    day: 'Day 1 - Shashti',
    vegItems: [
      {
        id: 'veg-day1',
        name: MENU_DESCRIPTIONS.DAY1.VEG.name,
        description: MENU_DESCRIPTIONS.DAY1.VEG.description,
        price: DAILY_PRICES.DAY1.VEG,
        category: 'veg',
        available: true
      }
    ],
    nonVegItems: [
      {
        id: 'nonveg-day1',
        name: MENU_DESCRIPTIONS.DAY1.NON_VEG.name,
        description: MENU_DESCRIPTIONS.DAY1.NON_VEG.description,
        price: DAILY_PRICES.DAY1.NON_VEG,
        category: 'non-veg',
        available: true
      }
    ]
  },
  {
    date: '2025-09-29',
    day: 'Day 2 - Saptami',
    vegItems: [
      {
        id: 'veg-day2',
        name: MENU_DESCRIPTIONS.DAY2.VEG.name,
        description: MENU_DESCRIPTIONS.DAY2.VEG.description,
        price: DAILY_PRICES.DAY2.VEG,
        category: 'veg',
        available: true
      }
    ],
    nonVegItems: [
      {
        id: 'nonveg-day2',
        name: MENU_DESCRIPTIONS.DAY2.NON_VEG.name,
        description: MENU_DESCRIPTIONS.DAY2.NON_VEG.description,
        price: DAILY_PRICES.DAY2.NON_VEG,
        category: 'non-veg',
        available: true
      }
    ]
  },
  {
    date: '2025-09-30',
    day: 'Day 3 - Ashtami',
    vegItems: [
      {
        id: 'veg-day3',
        name: MENU_DESCRIPTIONS.DAY3.VEG.name,
        description: MENU_DESCRIPTIONS.DAY3.VEG.description,
        price: DAILY_PRICES.DAY3.VEG,
        category: 'veg',
        available: true
      }
    ]
  },
  {
    date: '2025-10-01',
    day: 'Day 4 - Navami & Dashami',
    vegItems: [
      {
        id: 'anandamela-info',
        name: 'Anandamela Food Arrangement',
        description: 'Visit various food stalls and buy fresh food on the spot - Indian street food, sweets, snacks and more! Please carry cash for buying snacks at the venue.',
        price: 0,
        category: 'veg',
        available: false
      }
    ],
    nonVegItems: []
  }
];
