import axios, {  } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

export const getAllProductItems = () => {
  
  return axios.get(API_URL +"product/");
  
};
export const getAllProviders = () => {
  return axios.get(API_URL + "product/providers")
};
export const getAllCategories = () => {
    return axios.get(API_URL + "product/categories")
};
export const addCardItem = (id:number) => {
  return axios.post(API_URL+"user/card/",{
    id,
  },{ headers: authHeader() })
};

