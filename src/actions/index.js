import axios from 'axios';
// import { API_URL_1 } from '../supports/api-url/apiurl';

export const onLogin = (user) => {
    return(dispatch) => {
        axios.get('http://localhost:1989/login', {
            params: {
                email: user.email,
                password: user.password
            }
        }).then(user => {
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: user.data[0].username, email: user.data[0].email, error: "" }
            });
        }).catch(err => {
            console.log(err);
            dispatch ({
                type: "USER_LOGIN_FAIL",
            });
        })
    };
};

export const keepLogin = (email) => {
    return(dispatch) => {
        axios.get('http://localhost:1989/login', {
            params: {
                email: email
            }
        })
        .then(user => {
            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: user.data[0].username, email: user.data[0].email, error: "" }
            });
            dispatch({
                type: "COOKIES_CHECKED"
            });
        })
        .catch((err) => {
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
    return{
        type: "COOKIES_CHECKED"
    };
}


export const onRegister = (user) => {
    return (dispatch) => {
        axios.post('http://localhost:1989/register', user)
        .then((res) => {
            alert('Register Success!');
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: res.data.username, email: res.data.email }
            });
        })
        .then((err) => {
            console.log(err);
        })
    }
}