import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { withRouter } from "react-router";


class NavMenuRight extends Component {
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
                            <a className="black-text" onClick={this.handleLogout}>logout</a>
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
                <ul className="right hide-on-med-and-down nav-options-container">
                    <li
                        className={
                            this.props.history.location.pathname == "/parse" ? "active" : ""
                        }
                    >
                        <Link className="black-text" to={"/parse"}>parse</Link>
                    </li>
                    <li
                        className={
                            this.props.history.location.pathname == "/login" ? "active" : ""
                        }
                    >
                        <Link className="black-text" to={"/login"}>login</Link>
                    </li>
                    <li
                        className={
                            this.props.history.location.pathname == "/register"
                                ? "active"
                                : ""
                        }
                    >
                        <Link className="black-text" to={"/register"}>register</Link>
                    </li>
                </ul>
            );
        }
        // debugger
        return (
            <div>

                {topbarRight}
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

const connectedNavMenuComponent = withRouter(connect(mapStateToProps)(NavMenuRight));
export { connectedNavMenuComponent as NavMenuRight };
