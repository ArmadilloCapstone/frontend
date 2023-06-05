const initialState = {
    user_id: (localStorage.getItem('userid') || ""),
    user_name: (localStorage.getItem('username') || ""),
    user_option: (localStorage.getItem('useroption') || ""),
    showSignup: false,
    message_click: false,
    message_alarm: false
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER_ID":
        return { ...state, user_id: action.payload };
      case "SET_USER_NAME":
        return { ...state, user_name: action.payload };
      case "SET_CLASS_NAME":
        return { ...state, class_name: action.payload };
      case "SET_USER_OPTION":
        return { ...state, user_option: action.payload };
      case "SET_SHOW_SIGNUP":
        return { ...state, showSignup: action.payload };
      case "SET_MESSAGE_CLICK":
        return { ...state, message_click: action.payload };
      case "SET_MESSAGE_ALARM":
        return { ...state, message_alarm: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;