import { atom } from 'recoil';
import { Provider } from '../types/Provider';
import { CartItemType } from '../types/cart-item';
import { Category } from '../types/category';
import UserProfile from '../types/user-profile';

export const userProfileAtom = atom<UserProfile | undefined>({
  key: 'userState',
  default: undefined
});

export const cartState = atom<CartItemType[]>({
  key: 'shopCart',
  default: []
});

export const selectedCategoriesState = atom<Category[]>({
  key: 'selectedCategories',
  default: []
});

export const selectedProvidersState = atom<Provider[]>({
  key: 'selectedProviders',
  default: []
});
