import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
import { alertActions } from '../../actions';
import { PrivateRoute } from '../../components/PrivateRoute';
import { ProfilePage } from '../../components/ProfilePage';
import { LoginPage } from '../../components/LoginPage';
import { Layout } from '../../components/Layout';
import { MainPage } from '../../components/MainPage';
import { RegisterPage } from '../../components/RegisterPage';
import { RegisterView } from '../../components/RegisterView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '../../styles/app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     dispatch(alertActions.clear());
        // });
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
                        <MuiThemeProvider muiTheme={getMuiTheme()}>
                            <Layout>
                                <Route exact path="/" component={MainPage} />
                                <PrivateRoute path="/profile" component={ProfilePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterView} />
                                {/* <Route path="/register" component={RegisterPage} /> */}
                                {/* <Route path="/logout" component={Logout} /> */}
                            </Layout>
                        </MuiThemeProvider>
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