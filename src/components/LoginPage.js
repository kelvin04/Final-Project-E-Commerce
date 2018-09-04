import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onLogin } from '../actions'
import '../supports/css/components/loginpage.css';

class LoginPage extends Component {
    onLoginClick = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onLogin({ email, password });
    }

    render() {
        if(this.props.auth.username == "") {
            return(
                <div className="login-background">
                    <div className="container">
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>User Login</h2>
                                    <br/>
                                </div>
                                <form id="Login">
                                    <div className="form-group">
                                        <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email Address" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" />
                                    </div>
                                    <div className="forgot">
                                        <a href="reset.html">Forgot password?</a>
                                    </div>
                                    <input type="button" className="btn btn-primary" value="Login" onClick={this.onLoginClick}/>
                                    <h2 className="label-danger">{this.props.auth.error}</h2>
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
