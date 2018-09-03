import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './NavMenu.css';

import './../styles/NavMenu.css';
import { connect } from 'react-redux';
import { userActions } from '../actions';


// export 
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
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { user, data } = this.props;

        let state = "not logged";
        if (user) {
            state = user.username;

        }
        let topbarRight;
        if (user) {
            topbarRight = <div>
                <Link to={'/profile'} className="topbar_element">
                    {/* profile */}
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

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

const connectedNavMenuComponent = connect(mapStateToProps)(NavMenu);
export { connectedNavMenuComponent as NavMenu };