export interface DinnerOption {
  date: string;
  title: string;
  description: string;
  menu: string[];
  price: number;
  memberPrice: number;
  availableSlots: number;
  image?: string;
}

export interface CartItem {
  date: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  isMember: boolean;
  membershipId?: string;
}

export interface ReservationSummary {
  items: CartItem[];
  subtotal: number;
  memberDiscount: number;
  total: number;
  customerInfo: CustomerInfo;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}

export const dinnerOptions: DinnerOption[] = [
  {
    date: '2025-09-28',
    title: 'Traditional Bengali Feast',
    description: 'Experience authentic Bengali cuisine with traditional preparations.',
    menu: [
      'Shorshe Ilish (Hilsa in Mustard)',
      'Chingri Malai Curry (Prawns in Coconut)',
      'Begun Bhaja (Fried Eggplant)',
      'Dal with Ghee',
      'Steamed Rice',
      'Mishti Doi (Sweet Yogurt)',
      'Rasgulla'
    ],
    price: 25.00,
    memberPrice: 22.50,
    availableSlots: 50,
    image: '/images/bengali-feast.jpg'
  },
  {
    date: '2025-09-29',
    title: 'Durga Puja Special',
    description: 'Celebrate with traditional Durga Puja delicacies.',
    menu: [
      'Khichuri (Mixed Rice and Lentils)',
      'Labra (Mixed Vegetable Curry)',
      'Tomato Chatni',
      'Papad',
      'Payesh (Rice Pudding)',
      'Sandesh',
      'Narkel Naru (Coconut Balls)'
    ],
    price: 20.00,
    memberPrice: 18.00,
    availableSlots: 60,
    image: '/images/durga-puja-special.jpg'
  },
  {
    date: '2025-09-30',
    title: 'Vegetarian Delights',
    description: 'A celebration of vegetarian Bengali cuisine.',
    menu: [
      'Aloo Posto (Potatoes with Poppy Seeds)',
      'Shukto (Bitter Gourd Curry)',
      'Dhokar Dalna (Lentil Cake Curry)',
      'Bhapa Chingri (Steamed Prawns)',
      'Jeera Rice',
      'Aam Doi (Mango Yogurt)',
      'Pantua'
    ],
    price: 22.00,
    memberPrice: 19.80,
    availableSlots: 45,
    image: '/images/vegetarian-delights.jpg'
  },
  {
    date: '2025-10-01',
    title: 'Grand Finale Buffet',
    description: 'A grand buffet featuring the best of Bengali cuisine.',
    menu: [
      'Mutton Curry',
      'Fish Curry',
      'Chicken Kosha',
      'Mixed Vegetables',
      'Pulao Rice',
      'Luchi (Fried Bread)',
      'Chutney Selection',
      'Assorted Sweets'
    ],
    price: 30.00,
    memberPrice: 27.00,
    availableSlots: 80,
    image: '/images/grand-finale.jpg'
  }
];
