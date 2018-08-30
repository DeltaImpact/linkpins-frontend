import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userActions } from '../actions';

export const Logout = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        userActions.logout()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)