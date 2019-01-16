import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../actions";
import { withRouter } from "react-router";
import { NavMenuRight } from "./NavMenuRight";

import "./../../static/styles/NavMenu.css";

class NavMenu extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <div className="Header">
        <div className="navbar-fixed">
          <nav className="white">
            <div className="container">
              <div className="nav-wrapper">
                <Link
                  to={"/"}
                  className="left brand-logo nav__logo black-text "
                >
                  <i className="black-text material-icons hide-on-med-and-down">
                    broken_image
                  </i>
                  Linkpinss
                </Link>
                <NavMenuRight />
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
