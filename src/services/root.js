import axios from 'axios';

const root = axios.create({
  baseURL: 'http://localhost/crm/carcrm/public/',
});

export default root;
