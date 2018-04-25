import axios from 'axios';

axios.defaults.baseURL = '/api';

const _api = {
  auth : {
    login : (data) => axios.post('/auth/login', data),
    logout : () => axios.post('/auth/logout'),
    check : () => axios.get("/auth/login")
  },
  users : {
    create : (data) => axios.post("/users", data),
    read : (id) => axios.get("/users/" + id),
    update : (id, data) => axios.put("/users/" + id, data),
    destroy : (id) => axios.delete("/users/" + id)
  },
  patterns : {
    create : (data) => axios.post("/patterns", data),
    read : (id) => axios.get("/patterns/" + id),
    update : (id, data) => axios.put("/patterns/" + id, data),
    destory : (id) => axios.delete("/patterns/" + id) 
  }
};
  
export const apiActionCreator = (endpoint, operation, args) => {
  const _type = endpoint.toUpperCase() + "_" + operation.toUpperCase();
  const _apiCall = _api[endpoint][operation];
  const _promise = new Promise(
    async (resolve, reject) => {
      try{
        const res = await _apiCall(...args);
        if(res.data.success){
          resolve(res.data);
        }else{
          reject(res.data);
        }
      }catch(err){
        reject({
          messages : {
            errors : [err]
          }
        });
      }
    }
  );
  
  return async (dispatch) => {
    try{
      await dispatch({
        type : _type,
        payload : _promise
      });
    }
    catch(err){
      // A perplexing lack of exception handling for errors that the promise
      // middleware seems conceptually designed to catch :P
      // https://github.com/pburtchaell/redux-promise-middleware/issues/75
    }
  };
};

export function S3Resource(key){
  return("https://s3.us-east-2.amazonaws.com/textile-raverlyesque-test/" + key);
}