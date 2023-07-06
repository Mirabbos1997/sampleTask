import axios from 'axios';

const ApiServices = axios.create({
  baseURL: 'https://toko.ox-sys.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Accept': 'application/json'
  },
});

ApiServices.interceptors.request.use(function (config) {
  // console.log(config);
  let token = localStorage.getItem("token");
  // console.log(token);
  if (token) {
    config.headers["Authorization"] = [token].join(" ");
  }
  return config;
},
  function (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      return Promise.reject(error.response.data.error);
    } else {
      return Promise.reject(error);
    }
  }
);

ApiServices.interceptors.response.use(res => res, error => {
  if (error && error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/auth';
  }

  if (error && error.response && error.response.data && error.response.data.error) {
    return Promise.reject(error.response.data.error);
  } else {
    return Promise.reject(error);
  }
});

export default ApiServices;
