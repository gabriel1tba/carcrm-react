import axios from 'axios';
import { rootUrl } from './app';

export const HTTP = axios.create({
  baseURL: rootUrl,
});
