import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const apiAuth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiAuth.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    '@CARCRM:Token'
  )}`;

  return config;
});

export const apiUpload = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiUpload.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    '@CARCRM:Token'
  )}`;
  config.headers.contentType = 'multipart/form-data';

  return config;
});

apiAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response.status === 401) {
      localStorage.removeItem('@CARCRM:Token');
      window.location.href = 'login';
    }

    return Promise.reject(error);
  }
);
