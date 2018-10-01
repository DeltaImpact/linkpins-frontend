import React from "react";

export class UserFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      firstName: "",
      surName: "",
      gender: null,
      email_error_text: null,
      username_error_text: null,
      firstName_error_text: null,
      surName_error_text: null,
      disabled: false
      // disabled: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      debugger;
      // this.setState({ value: nextProps.value });
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

  isDisabled() {
    let values_changed = false;
    let email_is_valid = false;
    let username_is_valid = false;

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

    if (
      this.state.email != values.email &&
      this.state.username != values.username &&
      this.state.firstName != values.firstName &&
      this.state.surName != values.surName &&
      this.state.gender != values.gender
    ) {
      values_changed = true;
    }

    if (email_is_valid && username_is_valid && values_changed) {
      this.setState({
        disabled: false
      });
    }
  }

  SaveChanges(e) {
    e.preventDefault();
    debugger;
    // email, username, firstName, surName, gender
    //     email: "user123@yandex.ru"
    // firstName: null
    // gender: null
    // language: null
    // role: "User"
    // surname: null
    // userName: "user123"
    this.props.editProfile(
      this.state.email,
      this.state.username,
      this.state.firstName,
      this.state.surName,
      this.state.gender
    );
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
                    this.state.username_error_text != null ? "invalid" : ""
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
              <div className="input-field col s12">
                <input
                  id="username"
                  type="text"
                  value={this.state.username}
                  className={
                    this.state.username_error_text != null ? "invalid" : ""
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
                  id="firstName"
                  type="text"
                  value={this.state.firstName}
                  className={
                    this.state.firstName_error_text != null ? "invalid" : ""
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
              <div className="col s12">
                <label className="active left checkbox__container checkbox__label">
                  Gender
                </label>
                <p className="left checkbox__container">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      checked={this.state.gender == null ? "checked" : ""}
                      onChange={e => {
                        this.setState({
                          gender: null
                        });
                      }}
                    />
                    <span>Unspecified</span>
                  </label>
                </p>
                <p className="left checkbox__container">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      checked={this.state.gender == true ? "checked" : ""}
                      onChange={e => {
                        this.setState({
                          gender: true
                        });
                      }}
                    />
                    <span>Male</span>
                  </label>
                </p>
                <p className="left checkbox__container">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      checked={this.state.gender == false ? "checked" : ""}
                      onChange={e => {
                        this.setState({
                          gender: false
                        });
                      }}
                    />
                    <span>Female</span>
                  </label>
                </p>
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
                    onClick={e => this.SaveChanges(e)}
                  >
                    Save changes
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