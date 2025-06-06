/** @format */

import {toast} from "react-toastify";
export const apiKey = "77159a81225e378d5ffa95a61d3e1f8d";

// export const API_URL = "https://oms-api.ecomm11.com/api/";

// export const Img_Url = "http://oms-api.ecomm11.com/public";

const {protocol, hostname, port} = window.location;

export const API_URL = "http://localhost:8001/api/";

export const showToast = (message, type = "default") => {
  const options = {autoClose: 5000};
  const msg = typeof message === "object" ? message.msg : message;

  switch (type) {
    case "success":
      toast.success(msg, options);
      break;
    case "error":
      toast.error(msg, options);
      break;
    case "info":
      toast.info(msg, options);
      break;
    case "warn":
      toast.warn(msg, options);
      break;
    default:
      toast(msg, options);
      break;
  }
};

export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (message) => {
  toast.error(message);
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const expiryTime = tokenPayload.exp * 1000;
  const currentTime = Date.now();

  return currentTime >= expiryTime;
};
