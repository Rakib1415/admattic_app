import axios from 'axios';
import { BASE_URL } from 'constants/api-endpoints';
import interceptor from './interceptor';

const httpService = axios.create({
  // baseURL: 'https://localhost:3003/api',
  baseURL : BASE_URL,
});

interceptor(httpService);

export default httpService;
