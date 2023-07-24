import axios from "axios";
import config from "../config/config";
import { store } from "../store";
import { loginFailed } from "../store/slices/authSlice";
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(error.response);
//     if (error?.response?.status === 401 || error?.response?.status === 400) {
//       localStorage.removeItem('user');
//       Promise.reject(error);
//       // return error.response;
//       // window.location.href = '/login';
//     }
//   }
// );
const { baseUrl } = config;
console.log("from axiosRequest: ", baseUrl);
const getHeaders = () => {
  const state = store.getState();
  let user = state.authReducer.data;
  if (!user) return {};
  return { Authorization: `Bearer ${user.token}` };
};
const handleError = (error) => {
  let response = "";
  console.log(error.response);
  if (error?.response?.status === 401) {
    store.dispatch(loginFailed());
    //localStorage.removeItem("user");
    // const location = window.location.href;
    // if (!(location.includes('/login') || location.includes('/signup'))) {
    //   window.location.href = '/login';
    // }
    window.location.href = "/contact";
  }
  if (error.response) {
    response = error.response.data.message;
  } else if (error.request) {
    response = error.request.toString();
  } else {
    response = error.message;
  }
  console.log("response::::", response);
  throw new Error(response);
};
const httpRequest = async (method, url, data = "", headers = {}) => {
  let config = { method, url, headers: { ...getHeaders(), ...headers } };
  if (data) {
    config = { ...config, data };
  }
  try {
    const results = await axios(config);
    return results.data;
  } catch (error) {
    handleError(error);
  }
};
export const getRequest = (url) => httpRequest("get", baseUrl + "/" + url);
export const deleteRequest = (url) =>
  httpRequest("delete", baseUrl + "/" + url);
export const postRequest = (url, data, options = {}) =>
  httpRequest("post", baseUrl + "/" + url, data, options);
export const patchRequest = (url, data) =>
  httpRequest("patch", baseUrl + "/" + url, data);
