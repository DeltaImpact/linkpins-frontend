import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authActions } from "../actions";
import { validateEmail } from "../utils/misc";

// const style = {
//     marginTop: 50,
//     paddingBottom: 50,
//     paddingTop: 25,
//     width: '100%',
//     textAlign: 'center',
//     display: 'inline-block',
// };

// @connect(mapStateToProps, mapDispatchToProps)
class RightSidebar extends React.Component {
    constructor(props) {
        super(props);
        const redirectRoute = "/";
        this.state = {
            email: "user@yandex.ru",
            username: "user",
            password: "123456",
            passwordConf: "123456",
            email_error_text: null,
            username_error_text: null,
            password_error_text: null,
            passwordConf_error_text: null,
            redirectTo: redirectRoute,
            disabled: false
        };
        
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;
        let username_is_valid = false;
        let passwordConf_is_valid = false;


        if (this.state.email === "") {
            this.setState({
                email_error_text: null
            });
        } else if (validateEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null
            });
        } else {
            this.setState({
                email_error_text: "Sorry, this is not a valid email"
            });
        }

        if (this.state.username === "" || !this.state.username) {
            this.setState({
                username_error_text: null
            });
        } else if (this.state.username.length >= 3) {
            username_is_valid = true;
            this.setState({
                username_error_text: null
            });
        } else {
            this.setState({
                username_error_text: "Your username must be at least 3 characters"
            });
        }

        if (this.state.password === "" || !this.state.password) {
            this.setState({
                password_error_text: null
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null
            });
        } else {
            this.setState({
                password_error_text: "Your password must be at least 6 characters"
            });
        }

        if (this.state.password == this.state.passwordConf) {
            passwordConf_is_valid = true;
            this.setState({
                passwordConf_error_text: null
            });
        } else {
            this.setState({
                passwordConf_error_text: "Passwords did not match."
            });

        }

        if (email_is_valid && password_is_valid && username_is_valid && passwordConf_is_valid) {
            this.setState({
                disabled: false
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
        if (e.key === "Enter") {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        this.props.register(
            this.state.email,
            this.state.username,
            this.state.password,
            this.state.redirectTo
        );
    }

    emailClasses() {
        return this.state.email_error_text != null ? "invalid" : "";
    }

    submitClasses() {
        return this.state.disabled == true
            ? "btn btn-medium waves-effect waves-light s12 disabled"
            : "btn btn-medium waves-effect waves-light s12";
    }

    render() {
        
        return (
            <aside id="right-sidebar-nav">
                <div className="ps-scrollbar-x-rail" >
                    <div className="ps-scrollbar-x" >
                    </div>
                </div>
                <div className="ps-scrollbar-y-rail" >
                    <div className="ps-scrollbar-y">
                    </div>
                </div>
            </aside>

        );
    }
}

function mapStateToProps(state) {
    const { account } = state;
    return {
        account
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

const connectedRegisterPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(RightSidebar);
export { connectedRegisterPage as RightSidebar };
