import axios from "axios";
import logService from "./logService";
import { toast } from "react-toastify";

// setting the base url for the application
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// this is for handling errors globally
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // hadling the unexpected errors globally
    logService.log(error);
    toast.error("An unexpected error occured");
  }
  // if it is an expected error then simply return a rejected promise
  return Promise.reject(error);
});

function setJwt(jwt) {
  // setting default headers
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  all: axios.all,
  setJwt,
};

export default http;
