import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import Paper from 'material-ui/Paper';
import { dataActions } from '../actions';


const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

class ParseView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/';
        this.state = {
            url: 'https://www.pinterest.com/Morricore/',
            // url: 'http://image.com/',
            // url: 'http://casperjs.org/',
            url_error_text: null,
            redirectTo: redirectRoute,
            disabled: false,
        };
        // debugger
    }

    isDisabled() {
        let url_is_valid = false;

        // if (this.state.email === '') {
        //     this.setState({
        //         email_error_text: null,
        //     });
        // } else if (validateEmail(this.state.email)) {
        //     email_is_valid = true;
        //     this.setState({
        //         email_error_text: null,
        //     });

        // } else {
        //     this.setState({
        //         email_error_text: 'Sorry, this is not a valid email',
        //     });
        // }

        // if (this.state.password === '' || !this.state.password) {
        //     this.setState({
        //         password_error_text: null,
        //     });
        // } else if (this.state.password.length >= 6) {
        //     password_is_valid = true;
        //     this.setState({
        //         password_error_text: null,
        //     });
        // } else {
        //     this.setState({
        //         password_error_text: 'Your password must be at least 6 characters',
        //     });

        // }

        // if (email_is_valid && password_is_valid) {
        //     this.setState({
        //         disabled: false,
        //     });
        // }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.parse(e);
            }
        }
    }

    parse(e) {
        e.preventDefault();
        // debugger
        this.props.parse(this.state.url, this.state.redirectTo);
        // this.props.login(this.state.url, this.state.redirectTo);
    }

    render() {
        // debugger
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <div style={style}>
                    <div className="text-center">
                        <h2>Page parse</h2>

                          <div className="col-md-12">
                          {
                            this.props.data.statusText  &&
                            <div className="alert alert-info">
                                {this.props.data.statusText}
                            </div>
                        }
                        </div>

                        <div className="col-md-12">
                            <TextField
                                value={this.state.url}
                                hintText="Site url"
                                floatingLabelText="url"
                                type="text"
                                errorText={this.state.email_error_text}
                                onChange={(e) => this.changeValue(e, 'url')}
                            />
                        </div>
                        
                        <RaisedButton
                            disabled={this.state.disabled}
                            style={{ marginTop: 50 }}
                            label="Submit"
                            onClick={(e) => this.parse(e)}
                        />
                        {this.props.data.loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }

                    </div>
                </div>

            </div>
        );

    }
}

function mapStateToProps(state) {
    const { data } = state;
    // debugger
    // console.log("mapStateToProps(state)");
    // console.log(state);
    return {
        data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dataActions, dispatch);
}

ParseView.propTypes = {
    // register: React.PropTypes.func,
    // statusText: React.PropTypes.string,
};

// const connectedRegisterPage = connect(mapStateToProps)(ParseView);
const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(ParseView);
export { connectedRegisterPage as ParseView }; 