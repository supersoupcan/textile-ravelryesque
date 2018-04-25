const messageReducer = (state={}, action) => {
  if(action.payload){
    state = action.payload.messages;
  }else{
    state = {};
  }
  return state;
};

export default messageReducer;