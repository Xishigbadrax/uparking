import Auth from '@utils/auth';
import axios from 'axios';

const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

baseAxios.interceptors.request.use(
  function (config) {
    const token = Auth.getToken();
    const removeToken = !!config[0];

    if (token && !removeToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
