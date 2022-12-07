import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/user/admin/';

export const getCustomerBoard = () => {
  return axios.get(API_URL + 'customer/', { headers: authHeader() });
};

export const getBoard = (board: string) => {
  return axios.get(API_URL + board + '/', { headers: authHeader() });
};
export const deleteUserById = (id: number) => {
  return axios.delete(API_URL + 'users/' + id, { headers: authHeader() });
};
export const deleteProductById = (id: number) => {
  return axios.delete(API_URL + 'product/' + id, { headers: authHeader() });
};
