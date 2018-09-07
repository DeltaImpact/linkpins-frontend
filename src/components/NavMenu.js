import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './NavMenu.css';

import './../styles/NavMenu.css';
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

                {/* <AppBar position="static" color="inherit">
                    <Toolbar color="inherit">
                        <Typography variant="title" color="inherit">
                            Linkpins
          </Typography>
                        <div className="topbar_right">
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Register</Button>
                        </div>
                    </Toolbar>
                </AppBar> */}

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
                        {/* {user && <p>asd</p>} */}
                    </div>
                </div>
            </div>
        );
    }
}

NavMenu.propTypes = {
    // // logout: React.PropTypes.func,
    // statusText: React.PropTypes.string,
};

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

// NavMenu.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };

const connectedNavMenuComponent = connect(mapStateToProps)(NavMenu);
export { connectedNavMenuComponent as NavMenu };