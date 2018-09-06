import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './NavMenu.css';

import './../styles/NavMenu.css';
import { connect } from 'react-redux';
import { userActions } from '../actions';

<<<<<<< HEAD
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

=======
import * as actionCreators from '../actions/user.actions';
import { bindActionCreators } from 'redux';

function mapDispatchToProps(dispatch) {
    let asd = dispatch;
    // debugger
    return bindActionCreators(actionCreators, dispatch);
    // return bindActionCreators(actionCreators, dispatch);
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     return bindActionCreators(actionCreators, dispatch);
//   }, dispatch)
>>>>>>> origin/master

class NavMenu extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        this.handleLogout = this.handleLogout.bind(this);
    }
    // displayName = NavMenu.name
    componentDidMount() {
        // this.props.dispatch(userActions.data_about_user());
    }

    handleLogout(e) {
        e.preventDefault();

        // let sd = this.props;
        // sd = React.PropTypes.func;

        // debugger
        this.props.dispatch(userActions.logout());
        // this.props.userActions.logout();
    }

<<<<<<< HEAD


    render() {
        const { user } = this.props;
=======
    render() {
        // debugger;
        const user = this.props.auth.user;
        // debugger
>>>>>>> origin/master
        let topbarRight;
        if (user) {
            topbarRight = <div>
                <Link to={'/profile'} className="topbar_element">
                    {/* profile */}
                    {/* {user.username} */}
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
<<<<<<< HEAD


        // console.log(this.props);

=======
        console.log(this.props);
        // debugger
>>>>>>> origin/master
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
    // registerStatusText: React.PropTypes.string,
};

function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

<<<<<<< HEAD
// NavMenu.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };

const connectedNavMenuComponent = connect(mapStateToProps)(NavMenu);
=======
const connectedNavMenuComponent = connect(
    mapStateToProps,
    // mapDispatchToProps
)(NavMenu);
>>>>>>> origin/master
export { connectedNavMenuComponent as NavMenu };