import ApiServices from "../../../api.services";

const baseUrl = "Children/";

const ChildrenServices = {
  getList(payload) {
    return ApiServices.get(`${baseUrl}GetList`, {
      params: payload
    })
  },

  getById(id) {
    return ApiServices.get(`${baseUrl}Get?id=${id}`);
  },

  update(data) {
    return ApiServices.post(`${baseUrl}Update`, data);
  },

  printById(id) {
    return ApiServices.get(`${baseUrl}Print?DocumentID=${id}`, { responseType: "blob" })
  },

};

export default ChildrenServices;