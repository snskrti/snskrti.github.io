import { DayMenu } from '../types/mealReservation';

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
        description: 'Visit various food stalls and buy fresh food on the spot - Bengali street food, sweets, snacks and more!',
        price: 0,
        category: 'veg',
        available: false
      }
    ],
    nonVegItems: []
  }
];
