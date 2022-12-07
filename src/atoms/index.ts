import { type } from 'os';
import { atom } from 'recoil';
import UserProfile from '../types/user-profile';

export const userProfileAtom = atom<UserProfile | undefined>({
  key: 'userState',
  default: undefined
});
