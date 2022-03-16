import axios from 'axios';
axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('token')) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = window.localStorage.getItem('token');
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
