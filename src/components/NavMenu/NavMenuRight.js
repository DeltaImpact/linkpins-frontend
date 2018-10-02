import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../actions";
import { withRouter } from "react-router";

class NavMenuRight extends Component {
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
    let { user } = this.props.account;
    let topbarRight;
    if (user) {
      topbarRight = (
        <div>
          <ul className="right hide-on-med-and-down">
            <li
              className={
                this.props.history.location.pathname == "/parse" ? "active" : ""
              }
            >
              <Link className="black-text" to={"/parse"}>
                parse
              </Link>
            </li>
            <li
              className={
                this.props.history.location.pathname == "/profile"
                  ? "active"
                  : ""
              }
            >
              <Link
                to={"/profile"}
                className="pagenav__option--inline black-text"
              >
                <i className="large material-icons">perm_identity</i>
                {user.username}
              </Link>
            </li>
            <li>
              <Link to="" className="black-text" onClick={this.handleLogout}>
                logout
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      topbarRight = (
        <ul className="right hide-on-med-and-down nav-options-container">
          <li
            className={
              this.props.history.location.pathname == "/login" ? "active" : ""
            }
          >
            <Link className="black-text" to={"/login"}>
              login
            </Link>
          </li>
          <li
            className={
              this.props.history.location.pathname == "/register"
                ? "active"
                : ""
            }
          >
            <Link className="black-text" to={"/register"}>
              register
            </Link>
          </li>
        </ul>
      );
    }

    return <div>{topbarRight}</div>;
  }
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account
  };
}

const connectedNavMenuComponent = withRouter(
  connect(mapStateToProps)(NavMenuRight)
);
export { connectedNavMenuComponent as NavMenuRight };
