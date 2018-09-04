const INITIAL_STATE = { username: "", email: "", error: "" };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USER_LOGIN_SUCCESS" :
            return action.payload;
        case "USER_LOGIN_FAIL" :
            return { ...state, error: "Authentication Error" }
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        default :
            return state;
    }
}