import axios, { Axios } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user";



export const getUserBoard = () => {
  return axios.get(API_URL , { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "/admin", { headers: authHeader() });
};
