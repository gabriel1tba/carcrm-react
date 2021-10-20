import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.103/crm/carcrm/public/',
});

export default api;

// baseURL: 'http://localhost/crm/carcrm/public/api/' => API
// baseURL: 'http://localhost/crm/carcrm/public/' => Root
