import axios from 'axios';
import {API_URL} from '../utils/utils';

const TIMEOUT_DURATION = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    timeout: TIMEOUT_DURATION,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    throw error;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};