import axios from 'axios';
import { API_URL } from '../constants';
import { Product } from '../types/product';
import authHeader from './auth-header';

export const addProductItem = (product: Product) => {
  return axios.post(API_URL + 'user/admin/product/', product, { headers: authHeader() });
};
