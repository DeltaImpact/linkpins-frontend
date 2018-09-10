import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './NavMenu.css';

import './../static/styles/NavMenu.css';
import { connect } from 'react-redux';
import { userActions } from '../actions';

// import AppBar from 'material-ui/AppBar';
// import Toolbar from 'material-ui/Toolbar';
// import Button from 'material-ui/Button';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sideNav: {
        left: -250
    }
};


class NavMenu extends Component {
    constructor(props) {
        super(props);
        // debugger
        const { dispatch } = this.props;
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout(e) {
        e.preventDefault();
        // debugger
        this.props.dispatch(userActions.logout());
    }



    render() {
        let { user } = this.props.auth;
        let topbarRight;
        if (user) {
            topbarRight = <div>
                <Link to={'/profile'} className="topbar_element">
                    {user.username}
                </Link>

                <button onClick={this.handleLogout} className="topbar_element">
                    logout
                        </button>
            </div>;
        }
        else {
            topbarRight = <div>
                <Link to={'/login'} className="topbar_element">
                    login
                        </Link>
                <Link to={'/register'} className="topbar_element">
                    register
                        </Link>
            </div>
        }


        // console.log(this.props);

        return (
            <div className="navbar-fixed">
                <nav className="white"
                    // role="navigation"
                >
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#!" className="left brand-logo">
                                {/* <a href="https://adbeus.com">
                                    <img width="40" className="brown icon hide-on-med-and-down" src="images/icons/favicons/favicon.ico" alt=""></img>
                                </a> */}
                                <i className="material-icons">broken_image
                                </i>
                                Linkpins
                            </a>
                            <ul className="right hide-on-med-and-down">
                                <li  className="active"><a href="sass.html">login</a></li>
                                <li><a href="badges.html">register</a></li>
                                {/* <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                                <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                                <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
                                <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li> */}
                            </ul>


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

const connectedNavMenuComponent = connect(mapStateToProps)(NavMenu);
export { connectedNavMenuComponent as NavMenu };