export interface CAFE {
  _id: string;
  name: string;
  rating: string;
  deliveryTime: number;
  costForTwo: number;
  reviews: number;
}

export interface MENU_ITEMS {
  _id: string;
  itemName: string;
  rating: string;
  price: string;
  isVeg: boolean;
}

export interface CAFE_MENU {
  cafeId: string;
  recommended: MENU_ITEMS[];
  coffee: MENU_ITEMS[];
  sandwich: MENU_ITEMS[];
  drinks: MENU_ITEMS[];
}

export interface CART {
  cafeId: string;
  count: number;
  isVeg: boolean;
  itemId: string;
  itemName: string;
  price: string;
  _id: string;
  rating: string;
}

export interface UPDATE_CART {
  itemId: string;
  cafeId: string;
  itemName: string;
  _id: string;
  rating: string;
  price: string;
  isVeg: boolean;
}
