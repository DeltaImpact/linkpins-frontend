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
            <div>

                {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">Navbar</a>

                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav> */}

                <div className="topbar_inner">
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
                </div>
            </div>
        );
    }
}

<<<<<<< HEAD
NavMenu.propTypes = {
    // // logout: React.PropTypes.func,
    // statusText: React.PropTypes.string,
};

=======
>>>>>>> dev
function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

const connectedNavMenuComponent = connect(mapStateToProps)(NavMenu);
export { connectedNavMenuComponent as NavMenu };