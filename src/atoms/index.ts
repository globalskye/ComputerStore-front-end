import { atom } from 'recoil';
import { CartItemType } from '../types/cart-item';
import UserProfile from '../types/user-profile';

export const userProfileAtom = atom<UserProfile | undefined>({
  key: 'userState',
  default: undefined
});

export const cartState = atom<CartItemType[]>({
  key: 'shopCart',
  default: []
});
