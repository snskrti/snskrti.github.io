export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'veg' | 'non-veg';
  available: boolean;
}

export interface FoodMenuItem {
  title: string;
  description: string;
}

export interface DayMenu {
  date: string;
  day: string;
  vegItems: MenuItem[];
  nonVegItems?: MenuItem[];
}

export interface SelectedItemWithAge {
  quantity: number;
  ageGroup: 'adult' | 'child' | 'infant';
}

export interface MealReservation {
  selectedItems: {
    [itemId: string]: SelectedItemWithAge;
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
