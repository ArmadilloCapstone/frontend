const initialState = {
    user_id: "",
    user_name: "",
    showSignup: false
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER_ID":
        return { ...state, user_id: action.payload };
      case "SET_USER_NAME":
        return { ...state, user_name: action.payload };
      case "SET_SHOW_SIGNUP":
        return { ...state, showSignup: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;