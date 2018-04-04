import axios from 'axios';

axios.defaults.baseURL = '/api';

const _api = {
  auth : {
    login : (data) => axios.post('/auth/login', data),
    logout : (data) => axios.post('/auth/logout', data),
    check : () => axios.get("/auth")
  },
  users : {
    create : (data) => axios.post("/users", data),
    read : (id) => axios.get("/users/" + id),
    update : (id) => axios.put("/users/" + id),
    destroy : (id) => axios.delete("/users/" + id)
  }
};
  
export const apiActionCreator = (endpoint, operation, args) => {
  const _type = endpoint.toUpperCase() + "_" + operation.toUpperCase();
  const _apiCall = _api[endpoint][operation];
  const _promise = () => {
    return new Promise( async (resolve, reject) => {
      try{
        const res = await _apiCall(...args);
        if(res.data.success){
          resolve(res.data.payload);
        }else{
          reject(res.data.message);
        }
      }catch(err){
        reject(err);
      }
    });
  };
  
  return async (dispatch) => {
    try{
      await dispatch({
        type : _type,
        payload : _promise
      });
    }
    catch(err){
      // A perplexing lack of exception handling for errors that the promise
      // middleware seems practically designed to catch
      // https://github.com/pburtchaell/redux-promise-middleware/issues/75
    }
  };
};