import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { withRouter } from 'react-router'

import './../static/styles/NavMenu.css';
// import { Dropdown, NavItem, Button } from 'react-materialize';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'



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
        const options = [
            'one', 'two', 'three'
        ]
        const defaultOption = options[0]
        let { user } = this.props.auth;
        let topbarRight;
        if (user) {
            topbarRight =
                <div>
                    {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}


                    <ul className="right hide-on-med-and-down">

                        <li>
                            <Link to={'/profile'} className="inline-icon">
                                <i className="large material-icons">perm_identity</i>{user.username}
                            </Link>
                        </li>
                        <li>
                            <a onClick={this.handleLogout}>
                                logout
                            </a>
                        </li>
                    </ul>
                </div>
        }
        else {
            topbarRight =
                <ul className="right hide-on-med-and-down">
                    <li className={this.props.history.location.pathname == "/parse" ? "active" : ""}>
                        <Link to={'/parse'}>
                            parse
                        </Link>
                    </li>
                    <li className={this.props.history.location.pathname == "/login" ? "active" : ""}>
                        <Link to={'/login'}>
                            login
                        </Link>
                    </li>
                    <li className={this.props.history.location.pathname == "/register" ? "active" : ""}>
                        <Link to={'/register'}>
                            register
                        </Link>
                    </li>
                </ul>
        }
        // debugger

        // console.log(this.props);
        // debugger
        return (
            <div className="navbar-fixed">
                <nav className="white"
                // role="navigation"
                >
                    <div className="container">
                        <div className="nav-wrapper">
                            <Link to={'/'} className="left brand-logo">
                                {/* <a href="https://adbeus.com">
                                    <img width="40" className="brown icon hide-on-med-and-down" src="images/icons/favicons/favicon.ico" alt=""></img>
                                </a> */}
                                <i className="material-icons">broken_image</i>
                                Linkpins
                                </Link>

                            {topbarRight}
                            {/* <li className="active"><a href="sass.html">login</a></li>
                                <li><a href="badges.html">register</a></li> */}
                            {/* <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                                <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                                <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
                                <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li> */}



                            {/* <div id="left logo-container">
                                <a href="https://adbeus.com" className="green left brand-logo">adbeus</a>
                                <a href="https://adbeus.com">
                                    <img width="40" className="brown icon hide-on-med-and-down" src="images/icons/favicons/favicon.ico" alt=""></img>
                                </a>
                            </div>
                            <div className="right">
                                <ul id="slide-out" className="side-nav"><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2025"><a href="https://adbeus.com/about-adbeus-best-coffee-montreal/">About</a></li>
                                    <li className="black menu-item menu-item-type-post_type menu-item-object-page menu-item-5057"><a href="https://adbeus.com/blog/">Blog</a></li>
                                    <li className="green menu-item menu-item-type-post_type menu-item-object-page menu-item-5639"><a href="https://adbeus.com/owner-dashboard/">Owner Dashboard</a></li>
                                    <li className="purple menu-item menu-item-type-post_type menu-item-object-page menu-item-5638"><a href="https://adbeus.com/join-adbeus/">Join Adbeus</a></li>
                                    <li className="yellow menu-item menu-item-type-post_type menu-item-object-page menu-item-5637"><a href="https://adbeus.com/suggest/">Add Shop</a></li>
                                </ul>
                            </div> */}

                        </div>
                    </div>
                </nav>
            </div>





        );
    }
}

// <div>
{/* <div className="topbar_inner">
                    <div className="topbar_right">
                        <Link to={'/'} className="topbar_element">
                            main
                        </Link>
                        <Link to={'/parse'} className="topbar_element">
                            add
                        </Link>

                        <div className="topbar_optionsdivider">

                        </div>

                        {topbarRight}
                    </div>
                </div> */}
{/* </div> */ }

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

// NavMenu.propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
//   }

//   const ShowTheLocationWithRouter = withRouter(NavMenu)

const connectedNavMenuComponent = withRouter(connect(mapStateToProps)(NavMenu));
export { connectedNavMenuComponent as NavMenu };