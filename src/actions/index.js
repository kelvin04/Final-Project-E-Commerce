import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';

// parameter user onLogin dpt dr LoginPage
export const onLogin = (user) => {
    // dispatch: sebuah function yg bertugas mengirim data ke reducer, bukan pake return lg
    // bedanya kalo dispatch bisa mengirim action lebih dr sekali, tp kalo return cuma bisa kirim 1 kali, karena kalo return setelah sampai return langsung keluar dr function 
    // dispatch jg mencegah eror a-syncrhonus
    return(dispatch) => {
        // di users ada property: id, username, email, password
        axios.get(API_URL_1 + '/users', {
            params: {
                // dibandinginnya di params
                // email yg kiri, dpt dr backend JSON
                // yg user.email dpt dr LoginPage
                email: user.email,
                password: user.password
            }
        }).then(user => {
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                // payload dikirim ke AuthReducer, yg parameternya action
                // yg dikirim username sama email karena password kan rahasia, ga perlu dikirim ke payload
                // data[0] karena yg dipush/ dikirim selalu yg dikirim array baru yg kosong, karena sdh diisi jdnya array[0]
                // error: "", buat ilangin message eror kalo berhasil login
                payload: { username: user.data[0].username, email: user.data[0].email, error: "" }
                // kalo sudah selesai masuk ke reducer
            });
        }).catch(err => {
            console.log(err);
            dispatch ({
                type: "USER_LOGIN_FAIL",
            });
        })
    };
    

    // return {
    //     type: "USER_LOGIN_SUCCESS",
    //     payload: user
    // };
};

// ga butuh parameter soalnya mau balikin ke state awal
export const onLogout = () => {
    return {
        type: "USER_LOGOUT"
    };
}

// parameternya bisa jg username, password, email, tp bs jg disingkat jd user
export const onRegister = (user) => {
    return (dispatch) => {
        // .post untuk update data baru
        axios.post(API_URL_1 + '/users', user)
        .then((res) => {
            console.log(res);
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                payload: { username: res.data.username, email: res.data.email, error: "" }
            });
        })
        .then((err) => {
            console.log(err);
        })
        // sebetulnya pake yg di bawah tp panjang, karena sama semua dan udah ada di function onRegister maka disingkat jd user
        // {
        //     username: user. username,
        //     email: user.email,
        //     password: user.password
        // })
    }
}