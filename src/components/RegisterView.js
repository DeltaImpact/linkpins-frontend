import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { authActions } from "../actions";
import { validateEmail, renderError } from "../utils/misc";

// const style = {
//     marginTop: 50,
//     paddingBottom: 50,
//     paddingTop: 25,
//     width: '100%',
//     textAlign: 'center',
//     display: 'inline-block',
// };

// @connect(mapStateToProps, mapDispatchToProps)
class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    const redirectRoute = "/";
    this.state = {
      email: "user@yandex.ru",
      username: "user",
      password: "123456",
      passwordConf: "123456",
      firstName: "",
      surName: "",
      email_error_text: null,
      username_error_text: null,
      password_error_text: null,
      passwordConf_error_text: null,
      firstName_error_text: null,
      surName_error_text: null,
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

    if (
      email_is_valid &&
      password_is_valid &&
      username_is_valid &&
      passwordConf_is_valid
    ) {
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
      this.state.firstName,
      this.state.surName
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m4 offset-m4 z-depth-3 card-panel">
            <div className="col hg22 offset-hg1">
              <h2 className="center-align">Register</h2>
              {this.props.account.registerLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}

              {this.props.account.registerError &&
                renderError(this.props.account.registerError)}

              <div className="row">
                <form className="col s12">
                  {/* {this.props.account.registerError && (
                    <div className="row error--container">
                      <div className="error error--text alert alert-info">
                        {this.props.account.registerError}
                      </div>
                    </div>
                  )} */}

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="email"
                        type="email"
                        value={this.state.email}
                        className={
                          this.state.email_error_text != null ? "invalid" : ""
                        }
                        onChange={e => this.changeValue(e, "email")}
                      />
                      <label
                        htmlFor="email"
                        className={this.state.email != null ? "active" : ""}
                      >
                        Email*
                      </label>
                      {this.state.email_error_text && (
                        <div className="error--text">
                          {this.state.email_error_text}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="username"
                        type="text"
                        value={this.state.username}
                        className={
                          this.state.username_error_text != null
                            ? "invalid"
                            : ""
                        }
                        onChange={e => this.changeValue(e, "username")}
                      />
                      <label
                        htmlFor="username"
                        className={this.state.username != null ? "active" : ""}
                      >
                        Username*
                      </label>
                      {this.state.username_error_text && (
                        <div className="error--text">
                          {this.state.username_error_text}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="pass"
                        type="password"
                        value={this.state.password}
                        className={
                          this.state.password_error_text != null
                            ? "invalid"
                            : ""
                        }
                        onChange={e => this.changeValue(e, "password")}
                      />
                      <label
                        htmlFor="pass"
                        className={this.state.password != null ? "active" : ""}
                      >
                        Password*
                      </label>
                      {this.state.password_error_text && (
                        <div className="error--text">
                          {this.state.password_error_text}
                        </div>
                      )}
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="passConf"
                        type="password"
                        value={this.state.passwordConf}
                        className={
                          this.state.passwordConf_error_text != null
                            ? "invalid"
                            : ""
                        }
                        onChange={e => this.changeValue(e, "passwordConf")}
                      />
                      <label
                        htmlFor="passConf"
                        className={
                          this.state.passwordConf != null ? "active" : ""
                        }
                      >
                        Confirm password
                      </label>
                      {this.state.passwordConf_error_text && (
                        <div className="error--text">
                          {this.state.passwordConf_error_text}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="firstName"
                        type="text"
                        value={this.state.firstName}
                        className={
                          this.state.firstName_error_text != null
                            ? "invalid"
                            : ""
                        }
                        onChange={e => this.changeValue(e, "firstName")}
                      />
                      <label
                        htmlFor="firstName"
                        className={this.state.firstName != null ? "active" : ""}
                      >
                        First Name
                      </label>
                      {this.state.firstName_error_text && (
                        <div className="error--text">
                          {this.state.firstName_error_text}
                        </div>
                      )}
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="surName"
                        type="text"
                        value={this.state.surName}
                        className={
                          this.state.surName_error_text != null ? "invalid" : ""
                        }
                        onChange={e => this.changeValue(e, "surName")}
                      />
                      <label
                        htmlFor="surName"
                        className={this.state.surName != null ? "active" : ""}
                      >
                        Last Name
                      </label>
                      {this.state.surName_error_text && (
                        <div className="error--text">
                          {this.state.surName_error_text}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col m12">
                      <div className="col s10  offset-s1">
                        <button
                          className={
                            this.state.disabled == true
                              ? "btn btn-medium waves-effect waves-light s12 disabled"
                              : "btn btn-medium waves-effect waves-light s12"
                          }
                          type="button"
                          name="action"
                          onClick={e => this.login(e)}
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
)(RegisterView);
export { connectedRegisterPage as RegisterView };
