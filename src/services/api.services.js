import axios from 'axios';

// const ApiServices = axios.create({
//    baseURL: 'https://subdomain.ox-sys.com/',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Accept': 'application/json'
//   },
// });

const ApiServices = async () => {
  try {
    const response = await axios.post('https://subdomain.ox-sys.com/', 
      // new URLSearchParams({
      //   param1: 'value1',
      //   param2: 'value2'
      // }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    // Handle the response
    console.log(response.data.token);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};

// ApiServices.interceptors.request.use(function (config) {
//   console.log(config);
//   let token = localStorage.getItem("token");
//   console.log(token);
//   if (token) {
//     config.headers["Authorization"] = ["Bearer", token].join(" ");
//   }
//   return config;
// }, function (error) {
//   if (error && error.response && error.response.data && error.response.data.error) {
//     return Promise.reject(error.response.data.error);
//   } else {
//     return Promise.reject(error);
//   }
// });

// ApiServices.interceptors.response.use(res => res, error => {
//   if (error && error.response && error.response.status === 401) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userInfo');
//     window.location.href = '/auth';
//   }

//   if (error && error.response && error.response.data && error.response.data.error) {
//     return Promise.reject(error.response.data.error);
//   } else {
//     return Promise.reject(error);
//   }
// });

export default ApiServices;
