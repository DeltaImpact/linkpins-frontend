import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { withRouter } from "react-router";
import { NavMenuRight } from "./NavMenuRight";

import "./../../static/styles/NavMenu.css";
// import { Dropdown, NavItem, Button } from 'react-materialize';
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";

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
    // debugger
    return (
      <div className="Header">
        <div className="navbar-fixed">
          <nav
            className="white"
          >
            <div className="container">
              <div className="nav-wrapper">
                <Link to={"/"} className="left brand-logo nav-brand-logo black-text">
                  <i className="black-text material-icons">broken_image</i>
                  Linkpins
                </Link>
                <NavMenuRight></NavMenuRight>
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
