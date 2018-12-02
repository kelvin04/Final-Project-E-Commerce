import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { onRegister } from '../actions';
import { withAlert } from 'react-alert'
import '../supports/css/components/loginpage.css';


class RegisterPage extends Component {
    registerFunction = () => {
        const { username, fullname, email, password, passwordConfirmation } = this.refs;
        if(username.value === "" || email.value === "" || password.value === "") {
            this.props.alert.error(
                <div style={{ textTransform: 'capitalize'}}>
                    All fields cannot be left empty!
                </div>
            )
        }
        else if(password.value !== passwordConfirmation.value) {
            this.props.alert.error(
                <div style={{ textTransform: 'capitalize'}}>
                    Password does not match!
                </div>
            )
        }
        else if(username.value !== "" && email.value !== "" && password.value !== "") {
            this.props.onRegister ({
                username: username.value,
                fullname: fullname.value,
                email: email.value,
                password: password.value
            });
        }
    }

    onRegisterPress = (event) => {
        var code = event.keycode || event.which;
        if(code === 13) {
            this.registerFunction();
        }
    }

    onRegisterClick = () => {
        this.registerFunction();
    }

    render() {
        if(this.props.auth.username == ""){
        return(
            <div className="login-background">
                    <div className="container">
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Create Account</h2>
                                    <p>Already have account? <Link to="/login" id="bold">Login here</Link> </p>
                                </div>
                                <form id="Login">
                                <div className="form-group">
                                    <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" />
                                </div>

                                <div className="form-group">
                                    <input type="text" ref="fullname" className="form-control" id="inputUsername" placeholder="Full Name" />
                                </div>

                                <div className="form-group">
                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email Address" />
                                </div>

                                <div className="form-group">
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password"  onKeyPress={this.onRegisterPress.bind(this)} />
                                </div>

                                <div className="form-group">
                                    <input type="password" ref="passwordConfirmation" className="form-control" id="inputPassword" placeholder="Confirm Password"  onKeyPress={this.onRegisterPress.bind(this)} />
                                </div>
                                <h2 style={{ color: "red" }}>{this.props.auth.errorRegister}</h2>
                                <input type="button"className="btn btn-primary" value="Register" onClick={this.onRegisterClick} style={{ outline: 'none' }}/>
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
    return { auth: state.auth };
}

// dikasih null dulu soalnya belum pake mapStateToProps
export default connect(mapStateToProps, { onRegister })(withAlert(RegisterPage));

