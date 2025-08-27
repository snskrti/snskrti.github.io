export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'veg' | 'non-veg';
  available: boolean;
}

export interface DayMenu {
  date: string;
  day: string;
  vegItems: MenuItem[];
  nonVegItems?: MenuItem[];
}

export interface MealReservation {
  selectedItems: {
    [itemId: string]: number; // itemId -> quantity
  };
  customerInfo: {
    name: string;
    email: string;
    isMember: boolean;
  };
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
}

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  metadata: {
    customerName: string;
    customerEmail: string;
    isMember: string;
    reservation: string;
  };
}
