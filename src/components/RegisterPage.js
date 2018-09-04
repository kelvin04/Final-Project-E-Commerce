import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { onRegister } from '../actions';
import '../supports/css/components/loginpage.css';

class RegisterPage extends Component {
    onRegisterClick = () => {
        this.props.onRegister ({
            username: this.refs.name.value,
            email: this.refs.email.value,
            password: this.refs.password.value
        });
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
                                    <input type="text" ref="name" className="form-control" id="inputUsername" placeholder="Username" />
                                </div>

                                <div className="form-group">
                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email Address" />
                                </div>

                                <div className="form-group">
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" />
                                </div>

                                <br/>

                                <input type="button"className="btn btn-primary" value="Register" onClick={this.onRegisterClick}/>
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
export default connect(mapStateToProps, { onRegister })(RegisterPage);

