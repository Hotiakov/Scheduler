import axios from "axios";
import { AccessToken } from "shared/types/accessToken";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_KEY);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
})

$api.interceptors.response.use((config) => {
  return config
}, async error => {
  const originalRequest = error.config;
  if(error.response.status === 401) {
    try{
      const response = await axios.get<AccessToken>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {withCredentials: true});
      localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_KEY, response.data.accessToken);
      return $api.request(originalRequest);
    } catch(e) {
      return e;
    }
  }
  return error;
})

export {
  $api
}