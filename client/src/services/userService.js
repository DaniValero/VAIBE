import jwt_decode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

const apiURL = "http://localhost:3000";
const tokenProperty = "token";


async function login(user) {
  const response = await http.post(apiURL + "/login", {
    ...user,
  });
  const token = response.headers["x-auth-token"];
  localStorage.setItem(tokenProperty, token);
  toast.info("User Logged")

  return jwt_decode(token);
}

function loginWithToken(token) {
  localStorage.setItem(tokenProperty, token);

  return jwt_decode(token);
}

function logout() {
  localStorage.removeItem(tokenProperty);
}

async function register(user) {
  
  const response = await http.post(apiURL + "/signup", {
    ...user,
  });
  const token = response.headers["x-auth-token"];
  localStorage.setItem(tokenProperty, token);
  toast.info("Account created")


  return token;
}

function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenProperty);
    return jwt_decode(token);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithToken,
  logout,
  getCurrentUser,
  register,
};
