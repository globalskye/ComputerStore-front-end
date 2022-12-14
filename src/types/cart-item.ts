export interface CartItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  garantia: string;
  category: string;
  provider: string;
  count: number;
}

export interface TypeForOrder {
  adress: string;
  items: CartItemType[];
}
