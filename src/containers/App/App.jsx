import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
import { alertActions } from '../../actions';
import { PrivateRoute } from '../../components/PrivateRoute';
import { SettingsPage } from '../../components/SettingsPage';
import { ProfilePage } from '../../components/ProfilePage';
import { BoardPage } from '../../components/BoardPage';
import { PinPage } from '../../components/PinPage';
import { ParseView } from '../../components/ParseView';

import { Layout } from '../../components/Layout';
import { BoardsContainer } from '../../components/BoardsContainer';
import { MainPage } from '../../components/MainPage';
import { RegisterView } from '../../components/RegisterView';
import { LoginView } from '../../components/LoginView';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import '../../static/styles/app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
    }

    render() {
        // const muiTheme = createMuiTheme({
        //     // palette: {
        //     //     primary1Color: '#21c14c',
        //     //     primary2Color: '#21c14c',
        //     //     primary3Color: '#21c14c',
        //     //     primary: {
        //     //         main: '#f4f4f6',
        //     //     },
        //     //     secondary: {
        //     //         main: '#f4f4f6',
        //     //     },
        //     // },
        // });

        const { alert } = this.props;
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        {/* <MuiThemeProvider theme={muiTheme}> */}
                            <Layout>
                                <PrivateRoute exact path="/" component={MainPage} />
                                <PrivateRoute path="/settings" component={SettingsPage} />
                                <PrivateRoute path="/parse" component={ParseView} />
                                <Route path="/profile/:nickname" component={ProfilePage} />
                                <Route path="/login" component={LoginView} />
                                <Route path="/register" component={RegisterView} />
                                <Route path="/board/:id" component={BoardPage} />
                                <Route path="/pin/:id" component={PinPage} />
                                {/* <Route component={MainPage} /> */}
                            </Layout>
                        {/* </MuiThemeProvider> */}
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 