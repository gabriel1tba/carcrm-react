import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/',
});

export default api;

// baseURL: 'http://localhost/' => Root
// baseURL: 'http://localhost/api/' => API
