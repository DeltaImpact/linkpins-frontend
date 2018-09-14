/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Paper from '@material-ui/core/Paper';
import { dataActions } from "../actions";
import { PinCard } from "./PinCard";
// import * as actionCreators from '../actions/data';

import { validateEmail } from "../utils/misc";

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block"
};

// @connect(mapStateToProps, mapDispatchToProps)
class ParseView extends React.Component {
  constructor(props) {
    super(props);
    const redirectRoute = "/";
    this.state = {
    //   url: "http://casperjs.org/",
      url: "http://joyreactor.cc/",
      url_error_text: null,
      redirectTo: redirectRoute,
      disabled: false
    };
    // debugger
  }

  isDisabled() {
    let url_is_valid = false;
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
    if (e.key === "Enter") {
      if (!this.state.disabled) {
        this.parse(e);
      }
    }
  }

  parse(e) {
    e.preventDefault();
    // debugger
    this.props.parse(this.state.url, this.state.redirectTo);
  }

  submitClasses() {
    return this.state.disabled == true
      ? "btn btn-medium waves-effect waves-light s12 disabled"
      : "btn btn-medium waves-effect waves-light s12";
  }

  render() {
    // debugger
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col m4 offset-m4 z-depth-3 card-panel">
              <div className="col hg22 offset-hg1">
                <h2 className="center-align">Page parse</h2>
                {this.props.data.loading && (
                  <div className="progress">
                    <div className="indeterminate" />
                  </div>
                )}

                <div className="row">
                  <form className="col s12">
                    {this.props.data.error && (
                      <div className="row error--container">
                        <div className="error error--text alert alert-info">
                          {this.props.data.error.errorMessage}
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="url"
                          type="text"
                          value={this.state.url}
                          // className={this.emailClasses()}
                          onChange={e => this.changeValue(e, "url")}
                        />
                        <label
                          htmlFor="url"
                          className={this.state.url != null ? "active" : ""}
                        >
                          Site url
                        </label>
                        {/* {
                                            this.state.email_error_text &&
                                            <div className="error--text">
                                                {this.state.email_error_text}
                                            </div>
                                        } */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col m12">
                        <div className="col s10  offset-s1">
                          <button
                            className={this.submitClasses()}
                            type="button"
                            name="action"
                            onClick={e => this.parse(e)}
                          >
                            Parse
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m8 offset-m2 ">
            {this.props.data.page && <PinCard item={this.props.data.page} />}
          </div>
        </div>

        {/* <div className="container">
          <div className="row">
            <div className="col m8 offset-m2">
              <div className="col s12 m4 l3 card-panel legacy-sidebar">
                <div className="card-content list">
                  <h6 className="left-align list__item">Profile</h6>
                </div>
              </div>
              <div className="col s12 m8 l9 legacy-content">
                <div className="container card-panel s12">
                  <h4 className="left-align card-title card__title">Profile</h4>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // debugger
  const { data } = state;
//   debugger
  return {
    data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dataActions, dispatch);
}

ParseView.propTypes = {
  // register: React.PropTypes.func,
  // registerStatusText: React.PropTypes.string,
};

// const connectedRegisterPage = connect(mapStateToProps)(ParseView);
const connectedRegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseView);
export { connectedRegisterPage as ParseView };
