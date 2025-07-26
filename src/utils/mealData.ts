import { DayMenu } from '../types/mealReservation';

// Menu descriptions configuration
export const MENU_DESCRIPTIONS = {
  DAY1: {
    VEG: {
      name: 'Vegetarian Thali',
      description: 'Luchi, Alur Dum, Cholar Dal, Dhoka, Labra, Rice, Kheer & Papad'
    },
    NON_VEG: {
      name: 'Non-Vegetarian Thali',
      description: 'Rice, Kosha Mangsho, Macher Jhol, Dal, Vegetable, Chutney & Sweet'
    }
  },
  DAY2: {
    VEG: {
      name: 'Vegetarian Thali',
      description: 'Pulao, Paneer Curry, Aloo Posto, Begun Bhaja, Dal, Raita & Mishti'
    },
    NON_VEG: {
      name: 'Non-Vegetarian Thali',
      description: 'Pulao, Ilish Mach Bhapa, Prawn Malai Curry, Dal, Vegetable & Sweet'
    }
  },
  DAY3: {
    VEG: {
      name: 'Vegetarian Thali',
      description: 'Vegetable Biryani, Mixed Dal, Raita, Papad, Sandesh & Mishti Doi'
    },
    NON_VEG: {
      name: 'Non-Vegetarian Thali',
      description: 'Mutton Biryani, Fish Fry, Egg Curry, Raita, Papad & Traditional Sweets'
    }
  }
} as const;

// Day-specific pricing configuration
export const DAILY_PRICES = {
  DAY1: {
    VEG: 10.00,
    NON_VEG: 14.00
  },
  DAY2: {
    VEG: 12.00,
    NON_VEG: 16.00
  },
  DAY3: {
    VEG: 14.00,
    NON_VEG: 18.00
  }
} as const;

export const MEMBER_DISCOUNT_PERCENTAGE = 20;

// Helper function to get price by day number and type
export const getPriceByDay = (dayNumber: string, isVeg: boolean): number => {
  const key = `DAY${dayNumber}` as keyof typeof DAILY_PRICES;
  if (key in DAILY_PRICES) {
    return isVeg ? DAILY_PRICES[key].VEG : DAILY_PRICES[key].NON_VEG;
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
    ],
    nonVegItems: [
      {
        id: 'nonveg-day3',
        name: MENU_DESCRIPTIONS.DAY3.NON_VEG.name,
        description: MENU_DESCRIPTIONS.DAY3.NON_VEG.description,
        price: DAILY_PRICES.DAY3.NON_VEG,
        category: 'non-veg',
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
