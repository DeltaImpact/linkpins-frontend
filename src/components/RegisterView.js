/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import Paper from 'material-ui/Paper';
import { userActions } from '../actions';
// import * as actionCreators from '../actions/auth';

import { validateEmail } from '../utils/misc';



const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

// @connect(mapStateToProps, mapDispatchToProps)
class RegisterView extends React.Component {

    constructor(props) {
        super(props);
        // const redirectRoute = '/login';
        // this.state = {
        //     email: '',
        //     password: '',
        //     username: '',
        //     email_error_text: null,
        //     username_error_text: null,
        //     password_error_text: null,
        //     redirectTo: redirectRoute,
        //     disabled: true,
        // };
        const redirectRoute = '/';
        this.state = {
            email: 'user@yandex.ru',
            password: '123456',
            username: 'user',
            email_error_text: null,
            username_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: false,
        };
        // debugger
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;

        if (this.state.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });

        } else {
            this.setState({
                email_error_text: 'Sorry, this is not a valid email',
            });
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (email_is_valid && password_is_valid) {
            this.setState({
                disabled: false,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        // console.log(JSON.stringify(this.state));
        // debugger
        // const { dispatch } = this.props;
        // console.log(this.props);
        // debugger
        // dispatch(userActions.register(this.state.email, this.state.username, this.state.password, this.state.redirectTo));
        // let asd;
        this.props.register(this.state.email, this.state.username, this.state.password, this.state.redirectTo);
        // debugger
    }

    render() {
        // debugger
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <div style={style}>
                    <div className="text-center">
                        <h2>Register</h2>
                        {/* {
                            this.props.registerStatusText &&
                            <div className="alert alert-info">
                                {this.props.registerStatusText}
                            </div>
                        } */}
                        {
                            this.props.auth.registerStatusText  &&
                            <div className="alert alert-info">
                                {this.props.auth.registerStatusText}
                            </div>
                        }

                        <div className="col-md-12">
                            <TextField
                                value={this.state.email}
                                hintText="Email"
                                floatingLabelText="Email"
                                type="email"
                                errorText={this.state.email_error_text}
                                onChange={(e) => this.changeValue(e, 'email')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                                value={this.state.username}
                                hintText="Username"
                                floatingLabelText="Username"
                                type="text"
                                errorText={this.state.username_error_text}
                                onChange={(e) => this.changeValue(e, 'username')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                                value={this.state.password}
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password"
                                errorText={this.state.password_error_text}
                                onChange={(e) => this.changeValue(e, 'password')}
                            />
                        </div>

                        <RaisedButton
                            disabled={this.state.disabled}
                            style={{ marginTop: 50 }}
                            label="Submit"
                            onClick={(e) => this.login(e)}
                        />
                        {this.props.auth.loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }

                    </div>
                </div>

            </div>
        );

    }
}

function mapStateToProps(state) {
    const { data, authentication, auth } = state;
    const { user } = authentication;
    // debugger
    // console.log("mapStateToProps(state)");
    // console.log(state);
    return {
        // user,
        // data,
        auth
    };
    // const { loggingIn } = state.authentication;
    // return {
    //     loggingIn,
    //     // isRegistering: state.auth.isRegistering,
    //     // registerStatusText: state.auth.registerStatusText,
    // };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

RegisterView.propTypes = {
    // register: React.PropTypes.func,
    // registerStatusText: React.PropTypes.string,
};

// const connectedRegisterPage = connect(mapStateToProps)(RegisterView);
const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { connectedRegisterPage as RegisterView }; 