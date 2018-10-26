import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

export const onLogin = (user) => {
    return(dispatch) => {
        axios.get(API_URL_1 + '/login', {
            params: {
                username: user.username,
                password: user.password
            }
        }).then(user => {
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: user.data[0].username, email: user.data[0].email, errorLogin: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        }).catch(err => {
            console.log(err);
            dispatch ({
                type: "USER_LOGIN_FAIL",
            });
        })
    };
};

export const keepLogin = (username) => {
    return(dispatch) => {
        axios.get(API_URL_1 + '/keeplogin', {
            params: {
                username: username
            }
        }).then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: user.data[0].username, errorLogin: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        }).catch((err) => {
            console.log(err);
            dispatch({
                type: "USER_LOGIN_FAIL"
            });
        })
    }
};

export const onLogout = () => {
    return {
        type: "USER_LOGOUT"
    };
}

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    };
}


export const onRegister = (user) => {
    return (dispatch) => {
        axios.post(API_URL_1 + '/register', user)
        .then((res) => {
            if(res.data == "Username already exists") {
                dispatch({
                    type: "USERNAME_EXISTS"
                })
            }
            else {
                alert('Register Success!');
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: { username: res.data.username, email: res.data.email }
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const productSearch = (search) => {
    return(dispatch) => {
        axios.get(API_URL_1 + '/search', {
            params: {
                ProductName: search
            }
        }).then((res) => {
            console.log(res)
            if(res.data.length == 0) {
                dispatch({
                    type: "PRODUCT_NOT_FOUND",
                    payload: { searchResult:[], err: "Product not found" }
                });
            }
            else {
                dispatch({
                    type: "SEARCH_SUCCESS",
                    payload: { searchResult: res.data }
                });
            }
            
        }).catch((err) => {
            console.log(err);
        })
    }
}