import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onLogin } from '../actions'
import '../supports/css/components/loginpage.css';

const cookies = new Cookies();

class LoginPage extends Component {
    // componentWillReceiveProps(newProps) {
    //     if(newProps.auth.username !== "") {
    //         cookies.set('LoginCookies', newProps.auth.username, { path: '/' });        
    //     }
    // }

    loginFunction = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.onLogin({ username, password });
    }

    onLoginPress = (event) => {
        var code = event.keycode || event.which;
        if(code === 13) {
            this.loginFunction();
        }
    }

    onLoginClick = () => {
        this.loginFunction();
    }

    render() {
        if(this.props.auth.username == "") {
            return(
                <div className="login-background">
                    <div className="container">
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h1 style={{ margin:"10px 0px 0px 0px" }}>User Login</h1>
                                    <br/>
                                </div>
                                <form id="Login">
                                    <div className="form-group">
                                        <input type="username" ref="username" className="form-control" id="inputEmail" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.onLoginPress.bind(this)} />
                                    </div>
                                    <div className="forgot">
                                        <a href="reset.html">Forgot password?</a>
                                    </div>
                                    <h3 style={{ color: "red" }}>{this.props.auth.errorLogin}</h3>
                                    <input type="button" className="btn btn-primary" value="Login" onClick={this.onLoginClick} style={{ outline: 'none' }}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    return { auth };
}

export default  connect(mapStateToProps, { onLogin })(LoginPage);
