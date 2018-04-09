const authReducer = (state={}, action) => {
  switch(action.type){
    case "AUTH_RESET_ERRORS" : {
      state = Object.assign({}, state, { messages : [] });
      break;
    }
    case "AUTH_CHECK_PENDING":
    case "USERS_CREATE_PENDING":
    case "AUTH_LOGOUT_PENDING" :
    case "AUTH_LOGIN_PENDING" : {
      state = Object.assign({}, state, { pending : true, messages : {} }, );
      break;
    }
    
    case "AUTH_LOGOUT_FULFILLED" : {
      state = {
        pending : false,
        authenticated : false,
        profile : {},
        messages : action.payload.messages
      };
      break;
    }
    case "AUTH_CHECK_FULFILLED" :
    case "USERS_CREATE_FULFILLED" :
    case "AUTH_LOGIN_FULFILLED" : {
      state={
        pending: false,
        authenticated : true,
        profile: action.payload.data,
        messages : action.payload.messages
      };
      break;
    }
    
    case "AUTH_LOGOUT_REJECTED":
    case "AUTH_CHECK_REJECTED" :
    case "USERS_CREATE_REJECTED":
    case "AUTH_LOGIN_REJECTED" : {
      state=Object.assign(
        {}, state, { pending : false, messages : action.payload.messages });
      break;
    }
  }
  return state;
};

export default authReducer;