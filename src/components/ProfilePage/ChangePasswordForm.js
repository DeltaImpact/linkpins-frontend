import React from "react";
import { connect } from "react-redux";


class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOld: "",
      password: "",
      passwordConf: "",
      password_error_text: null,
      passwordConf_error_text: null,
      disabled: true,
    };
  }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  isDisabled() {
    let old_password_is_valid = false;
    let password_is_valid = false;
    let passwordConf_is_valid = false;

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

    if (password_is_valid && passwordConf_is_valid) {
      this.setState({
        disabled: false
      });
    }
  }

  changePassword(e) {
    e.preventDefault();
    debugger
    this.props.changePassword(
      this.state.passwordOld,
      this.state.password,
      this.state.passwordConf,
    )
  }
  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  isDisabled() {
    let old_password_is_valid = false;
    let password_is_valid = false;
    let passwordConf_is_valid = false;

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

    if (password_is_valid && passwordConf_is_valid) {
      this.setState({
        disabled: false
      });
    }
  }

  changePassword(e) {
    e.preventDefault();
    // debugger
    this.props.changePassword(
      this.state.passwordOld,
      this.state.password,
      this.state.passwordConf,
    )
  }


  render() {
    const values = this.props.values;

    return (
      <div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="passOld"
                  type="password"
                  onChange={e => this.changeValue(e, "passwordOld")}
                />
                <label htmlFor="passOld">Old password</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="pass"
                  type="password"
                  className={
                    this.state.password_error_text != null ? "invalid" : ""
                  }
                  onChange={e => this.changeValue(e, "password")}
                />
                <label
                  htmlFor="pass"
                  className={this.state.password != "" ? "active" : ""}
                >
                  New password
                </label>
                {this.state.password_error_text && (
                  <div className="error--text">
                    {this.state.password_error_text}
                  </div>
                )}
              </div>
              <div className="input-field col s12">
                <input
                  id="passConf"
                  type="password"
                  className={
                    this.state.passwordConf_error_text != null ? "invalid" : ""
                  }
                  onChange={e => this.changeValue(e, "passwordConf")}
                />
                <label
                  htmlFor="passConf"
                  className={this.state.passwordConf != "" ? "active" : ""}
                >
                  Confirm new password
                </label>
                {this.state.passwordConf_error_text && (
                  <div className="error--text">
                    {this.state.passwordConf_error_text}
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
                    onClick={e => this.changePassword(e)}
                  >
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { account } = state;
  // debugger
  return {
    account
  };
}

const connectedChangePasswordForm = connect(mapStateToProps)(ChangePasswordForm);
export { connectedChangePasswordForm as ChangePasswordForm };