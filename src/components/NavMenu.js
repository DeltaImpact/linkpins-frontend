import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { withRouter } from "react-router";

import "./../static/styles/NavMenu.css";
// import { Dropdown, NavItem, Button } from 'react-materialize';
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class NavMenu extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(userActions.logout());
  }

  render() {
    let { user } = this.props.auth;
    let topbarRight;
    if (user) {
      topbarRight = (
        <div>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to={"/profile"} className="inline-icon">
                <i className="large material-icons">perm_identity</i>
                {user.username}
              </Link>
            </li>
            <li>
              <a onClick={this.handleLogout}>logout</a>
            </li>
            <li>
              <Link to={"/profile"} className="inline-icon">
                <i className="material-icons">more_vert</i>
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      topbarRight = (
        <ul className="right hide-on-med-and-down">
          <li
            className={
              this.props.history.location.pathname == "/parse" ? "active" : ""
            }
          >
            <Link to={"/parse"}>parse</Link>
          </li>
          <li
            className={
              this.props.history.location.pathname == "/login" ? "active" : ""
            }
          >
            <Link to={"/login"}>login</Link>
          </li>
          <li
            className={
              this.props.history.location.pathname == "/register"
                ? "active"
                : ""
            }
          >
            <Link to={"/register"}>register</Link>
          </li>
        </ul>
      );
    }
    // debugger
    return (
      <div className="Header">
        <div className="navbar-fixed">
          <nav
            className="white"
            // role="navigation"
          >
            <div className="container">
              <div className="nav-wrapper">
                <Link to={"/"} className="left brand-logo">
                  <i className="material-icons">broken_image</i>
                  Linkpins
                </Link>
                {topbarRight}
              </div>
            </div>
          </nav>
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

const connectedNavMenuComponent = withRouter(connect(mapStateToProps)(NavMenu));
export { connectedNavMenuComponent as NavMenu };
