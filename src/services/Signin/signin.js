import ApiServices from '../api.services';

// import axios from 'axios';
import qs from 'qs';


const SigninService = {
  signin(data, config) {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };

    // axios.post('https://example.com/token', qs.stringify(data), config)
    //   .then(response => {
    //     const token = response.data.token;
    //     console.log(`Token: ${token}`);
    //     // Handle the token response here
    //   })
    //   .catch(error => console.error(error));
    return ApiServices.post('security/auth_check', qs.stringify(data), config);
  },
}

export default SigninService