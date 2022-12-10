import axios from 'axios';
import { API_URL } from '../constants';
import authHeader from './auth-header';

export const getAllProductItems = () => {
  return axios.get(API_URL + 'product/');
};
export const getAllProviders = () => {
  return axios.get(API_URL + 'product/providers');
};
export const getAllCategories = () => {
  return axios.get(API_URL + 'product/categories');
};
export const addCardItem = (id: number) => {
  return axios.post(
    API_URL + 'user/card/',
    {
      id
    },
    { headers: authHeader() }
  );
};
export const order = (obj: any) => {
  return axios.post(API_URL + 'user/order/', obj, { headers: authHeader() });
};
