import React from "react";

export class UserFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOld: "",
      password: "",
      passwordConf: "",
      password_error_text: null,
      passwordConf_error_text: null,
      disabled: false,
      // disabled: true,
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

    

    if (password_is_valid && passwordConf_is_valid) {
      this.setState({
        disabled: false
      });
    }
  }

  SaveChanges(e) {
    e.preventDefault();
    debugger;
//     email: "user123@yandex.ru"
// firstName: null
// gender: null
// language: null
// role: "User"
// surname: null
// userName: "user123"
    this.props
    .editProfile(
      this.state.passwordOld,
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
                  id="disabled"
                  // id="email"
                  type="email"
                  value={values.email}
                  // className={this.emailClasses()}
                  readOnly
                />
                <label
                  htmlFor="disabled"
                  // htmlFor="email"
                  className={values.email != null ? "active" : ""}
                >
                  Email
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="disabled"
                  // id="email"
                  type="text"
                  value={values.userName}
                  // className={this.emailClasses()}
                  readOnly
                />
                <label
                  htmlFor="disabled"
                  // htmlFor="email"
                  className={values.userName != null ? "active" : ""}
                >
                  Username
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  id="disabled"
                  // id="email"
                  type="text"
                  // value={values.firstName}
                  // className={this.emailClasses()}
                  readOnly
                />
                <label
                  htmlFor="disabled"
                  // htmlFor="email"
                  className={values.firstName != null ? "active" : ""}
                >
                  First Name
                </label>
              </div>
              <div className="input-field col s6">
                <input
                  id="disabled"
                  // id="email"
                  type="text"
                  // value={values.surname}
                  // className={this.emailClasses()}
                  readOnly
                />
                <label
                  htmlFor="disabled"
                  // htmlFor="email"
                  className={values.surname != null ? "active" : ""}
                >
                  Last Name
                </label>
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
                      checked="checked"
                      //   disabled="disabled"
                      readOnly
                    />
                    <span>Unspecified</span>
                  </label>
                </p>
                <p className="left checkbox__container">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      //   disabled="disabled"
                      readOnly
                    />
                    <span>Male</span>
                  </label>
                </p>
                <p className="left checkbox__container">
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      //   disabled="disabled"
                      readOnly
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

// const values = props.values;
// var listItems = Object.keys(values).map(function(value, index) {

//   return (
//     <li key={index}>
//       {value} : {values[value]}
//     </li>
//   );
// });
// return <ul className="user-list">{listItems}</ul>;
