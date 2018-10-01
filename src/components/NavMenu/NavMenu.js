import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../actions";
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
    this.props.dispatch(authActions.logout());
  }

  render() {
    
    return (
      <div className="Header">
        <div className="navbar-fixed">
          <nav
            className="white"
          >
            <div className="container">
              <div className="nav-wrapper">
                {/* <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a> */}

                <Link to={"/"} className="left brand-logo nav__logo black-text ">
                  <i className="black-text material-icons hide-on-med-and-down">broken_image</i>
                  Linkpinss
                </Link>
                <NavMenuRight></NavMenuRight>


                {/* <nav>
                  <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Logo</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                      <li><a href="sass.html">Sass</a></li>
                      <li><a href="badges.html">Components</a></li>
                      <li><a href="collapsible.html">Javascript</a></li>
                      <li><a href="mobile.html">Mobile</a></li>
                    </ul>
                  </div>
                </nav> */}


                {/* <ul className="sidenav" id="mobile-demo">
                  <li><a href="sass.html">Sass</a></li>
                  <li><a href="badges.html">Components</a></li>
                  <li><a href="collapsible.html">Javascript</a></li>
                  <li><a href="mobile.html">Mobile</a></li>
                </ul> */}


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
