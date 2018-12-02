const INITIAL_STATE = { username: "", fullname: "" ,email: "", address: "", errorLogin: "" ,errorRegister: "" };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USERNAME_EXISTS" :
            return { ...state, errorRegister: "Username already exists" };
        case "USER_LOGIN_SUCCESS" :
            return action.payload;
        case "USER_LOGIN_FAIL" :
            return { ...state, errorLogin: "Authentication Error" }
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        case "COOKIES_CHECKED" :
            return { ...state, cookieCheck: true };
        default :
            return state;
    }
}