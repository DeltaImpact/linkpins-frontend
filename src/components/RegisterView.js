import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { userActions } from '../actions';
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
        let username_is_valid = false;


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

        if (this.state.username === '' || !this.state.username) {
            this.setState({
                username_error_text: null,
            });
        } else if (this.state.username.length >= 3) {
            username_is_valid = true;
            this.setState({
                username_error_text: null,
            });
        } else {
            this.setState({
                username_error_text: 'Your username must be at least 3 characters',
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
        this.props.register(this.state.email, this.state.username, this.state.password, this.state.redirectTo);
    }

    render() {
        // debugger
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <div style={style}>
                    <div className="text-center">
                        <h2>Register</h2>
                        {
                            this.props.auth.statusText &&
                            <div className="alert alert-info">
                                {this.props.auth.statusText}
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
                        
                        <Button
                            variant="contained"
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
    const { auth } = state;
    return {
        auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { connectedRegisterPage as RegisterView }; 