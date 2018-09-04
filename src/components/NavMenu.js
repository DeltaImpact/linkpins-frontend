import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './NavMenu.css';

import './../styles/NavMenu.css';
import { connect } from 'react-redux';
import { userActions } from '../actions';

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

    render() {
        // debugger;
        const user = this.props.auth.user;
        // debugger
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
        console.log(this.props);
        // debugger
        return (
            <div>
                <div className="topbar_inner">
                    {/* <div className="topbar_left">
                        {state}
                    </div> */}
                    <div className="topbar_right">
                        <Link to={'/'} className="topbar_element">
                            main
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

const connectedNavMenuComponent = connect(
    mapStateToProps,
    // mapDispatchToProps
)(NavMenu);
export { connectedNavMenuComponent as NavMenu };