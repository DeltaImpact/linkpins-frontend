import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
import { PrivateRoute } from '../../components/PrivateRoute';
import { SettingsPage } from '../../components/SettingsPage';
import { DialogsPage } from '../../components/DialogsPage';
import { ProfilePage } from '../../components/ProfilePage';
import { BoardPage } from '../../components/BoardPage';
import { PinPage } from '../../components/PinPage';
import { ParseView } from '../../components/ParseView';

import { Layout } from '../../components/Layout';
import { MainPage } from '../../components/MainPage';
import { RegisterView } from '../../components/RegisterView';
import { LoginView } from '../../components/LoginView';

import '../../static/styles/app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                                <PrivateRoute exact path="/:offset?" component={MainPage} />
                                <PrivateRoute path="/parse" component={ParseView} />
                                <PrivateRoute path="/settings" component={SettingsPage} />
                                <PrivateRoute path="/messages" component={DialogsPage} />
                                <Route path="/login" component={LoginView} />
                                <Route path="/register" component={RegisterView} />
                                <Route path="/profile/:nickname" component={ProfilePage} />
                                <Route path="/board/:id/:offset?" component={BoardPage} />
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