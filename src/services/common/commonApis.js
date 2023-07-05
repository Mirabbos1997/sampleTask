import ApiServices from '../api.services';

const CommonApis = {
  getList(docUrl, payload) {
    return ApiServices.get(`${docUrl}/GetList`, {
      params: payload
    })
  },
}

export default CommonApis;