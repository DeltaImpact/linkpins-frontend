import React from "react";
import { validateEmail, renderError } from "../../utils/misc";

export class UserFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.values.email,
      username: this.props.values.userName,
      firstName: this.props.values.firstName,
      surName: this.props.values.surname,
      gender: this.props.values.gender,
      email_error_text: null,
      username_error_text: null,
      firstName_error_text: null,
      surName_error_text: null,
      disabled: false,
      // disabled: true
    };
  
  }
  // componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    this.setState({
      disabled: true
    });

  ;
    if (nextProps.values !== this.props.values) {
      // this.needsUpdate = true;
      this.setState({
        email: nextProps.values.email,
        username: nextProps.values.userName,
        firstName: nextProps.values.firstName,
        surName: nextProps.values.surname,
        gender: nextProps.values.gender
      });
    }
  }
  // componentDidUpdate() {
  //   if (this.needsUpdate) {
  //     this.needsUpdate = false;
  //   ;
  //     // let sda = this.props;
  //     if (this.props.parse.page) {
  //       this.state.previewImage = this.props.parse.page.images[0];
  //       this.state.previewDescription = this.props.parse.page.possibleDescriptions[0];
  //       this.state.previewTitle = this.props.parse.page.header;
  //     }
  //     // alert(JSON.stringify(this.props))
  //   }
  // }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  changeGenderValue(value) {
    // this.setState({
    //   gender: value
    // });
    const next_state = {};
    next_state["gender"] = value;
    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  isDisabled() {
    let values_changed = false;
    let email_is_valid = false;
    let username_is_valid = false;
    let firstName_is_valid = false;
    let surName_is_valid = false;

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
        email_error_text: "Sorry, this is not a valid email."
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
        username_error_text:
          "Your username length name must be between 3 an 100."
      });
    }

    if (this.state.surName === "" || !this.state.surName) {
      // if (this.state.surName == this.props.values.surName)
        surName_is_valid = true;
      this.setState({
        surName_error_text: null
      });
    } else if (
      this.state.surName.length >= 3 &&
      this.state.surName.length < 100
    ) {
      surName_is_valid = true;
      this.setState({
        surName_error_text: null
      });
    } else {
      this.setState({
        surName_error_text: "Your surname length name must be between 3 an 100."
      });
    }

    if (this.state.firstName === "" || !this.state.firstName) {
      // if (this.state.firstName == this.props.values.firstName)
        firstName_is_valid = true;
      this.setState({
        firstName_error_text: null
      });
    } else if (
      this.state.firstName.length >= 3 &&
      this.state.firstName.length < 100
    ) {
      firstName_is_valid = true;
      this.setState({
        firstName_error_text: null
      });
    } else {
      this.setState({
        firstName_error_text:
          "Your first name length name must be between 3 an 100."
      });
    }

    // if (
    //   this.state.email != this.props.values.email ||
    //   this.state.username != this.props.values.userName ||
    //   this.state.firstName != this.props.values.firstName ||
    //   this.state.surName != this.props.values.surName ||
    //   this.state.gender != this.props.values.gender
    // ) {
    //   values_changed = true;
    // }

  ;
    if (
      email_is_valid &&
      username_is_valid &&
      // values_changed &&
      firstName_is_valid &&
      surName_is_valid
    ) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  SaveChanges(e) {
    e.preventDefault();
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
  ;
    return (
      <div>
        <div className="row">
          <form className="col s12">
            {this.props.error && renderError(this.props.error)}
            {this.props.loading && (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            )}
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
              <div className="input-field col s6">
                <input
                  id="firstName"
                  type="text"
                  value={
                    this.state.firstName == null ? "" : this.state.firstName
                  }
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
                  value={this.state.surName == null ? "" : this.state.surName}
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
                        this.changeGenderValue(null);
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
                        this.changeGenderValue(true);
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
                        this.changeGenderValue(false);
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
