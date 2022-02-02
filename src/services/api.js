import axios from 'axios';

const baseURL = 'http://localhost/';
const baseURLApi = 'http://localhost/api/';

export const api = axios.create({
  baseURL: baseURL,
});

export const apiAuth = axios.create({
  baseURL: baseURLApi,
});

apiAuth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'access_token'
  )}`;

  return config;
});

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = 'login';
    }

    return Promise.reject(error);
  }
);
