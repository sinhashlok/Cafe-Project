export interface CAFE {
  _id: string;
  name: string;
  rating: number;
  deliveryTime: number;
  costForTwo: number;
  reviews: number;
}

export interface MENU_ITEMS {
  _id: string;
  itemName: string;
  rating: number;
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
  rating: number;
}

export interface UPDATE_CART {
  itemId: string;
  cafeId: string;
  itemName: string;
  _id: string;
  rating: number;
  price: string;
  isVeg: boolean;
}
