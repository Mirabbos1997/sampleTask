import ApiServices from '../api.services';

const SigninService = {
  signin(data) {
    console.log(data);
    return ApiServices.post('security/auth_check', data);
  },
}

export default SigninService