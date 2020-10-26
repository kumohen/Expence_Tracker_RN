const initialState = {
    isLoginin: false,
    payment:[],
    getProfile:[]
  };
  export default function (state = initialState, action) {
    switch (action.type) {
    //   case "USER_LOGIN":
    //     return { ...state, login: action.payload, isLoginin: true };
    //   case "USER_AUTH":
    //     return { ...state, login: action.payload };
    //   case "USER_LOGOUT":
    //     return { ...state, isLoginin: false };
    //   case "GET_USERS":
    //     return { ...state, users: action.payload };
      case "USER_SIGNUP":
        return {
          ...state,
          user: action.payload,
          isLoginin: true,
        };
      case "USER_SIGNIN":
          return {
             ...state,
            user: action.payload,
            isLoginin: true,
          }  
      case "LOGOUT": 
         return {...state,isLoginin:false}    
      case "PAYMENT_DETAIL":
         return {...state , payment:action.payload}   
      case "PROFILE_DETAIL":
       
         return {...state,getProfile:action.payload}   

      default:
        return state;
    }
  }