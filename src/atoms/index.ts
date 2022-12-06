import { atom } from 'recoil';
import UserProfile from '../types/user-profile';

export const isAuthenticatedAtom = atom<boolean>({
  key: 'isAuthenticated',
  default: false
});

export const userProfileAtom = atom<UserProfile | undefined>({
  key: 'userState',
  default: undefined
});
