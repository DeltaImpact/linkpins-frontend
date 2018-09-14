import React from "react";

export class UserFields extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const values = this.props.values;

    // debugger;

    return (
      <div>
        <div className="row">
          {/* {JSON.stringify(values)} */}

          <form className="col s12">
            {/* <div class="row">
              <div class="input-field col s6">
                <input
                  placeholder="Placeholder"
                  id="first_name"
                  type="text"
                  class="validate"
                />
                ><label for="first_name">First Name</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate" />>
                <label for="last_name">Last Name</label>
              </div>
            </div> */}

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
                {/* border-color: #26a69a; */}
                {/* <ul class="tabs ">
                  <li class="tab col s4 active">
                    <a href="#test1">Surpise</a>
                  </li>
                  <li class="tab col s4">
                    <a class="active" href="#test2">
                      Male
                    </a>
                  </li>
                  <li class="tab col s4">
                    <a href="#test3">Female</a>
                  </li>
                </ul> */}
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
