import axios from "axios";
import { toast } from "react-toastify";


import config from "../config.json";

axios.interceptors.response.use(false, function (error) {
  if (error.response.status !== 400) {
    toast.error(
      "Algo ha ocurrido lo solucionamos pronto",
      config.toastErrorOptions
    );

   
  }
  return Promise.reject(error);
});


function setToken(token) {
  if(token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};
