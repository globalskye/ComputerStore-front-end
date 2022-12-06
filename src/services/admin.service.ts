import axios, { Axios } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/admin/";

export const getCustomerBoard = () => {
    return axios.get(API_URL + "customer/" , { headers: authHeader() });
  };
  
export const getBoard = (board : string) => {
    return axios.get(API_URL+board +"/",{ headers: authHeader() })
}