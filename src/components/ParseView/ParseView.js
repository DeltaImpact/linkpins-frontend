/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Paper from '@material-ui/core/Paper';
import { dataActions } from "../../actions";
import { PinCard } from "../PinCard";
// import * as actionCreators from '../actions/data';

import { validateEmail } from "../../utils/misc";

import { ImageInList } from "./imageInList";

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
      disabled: false,
      previewImage: null,
      previewTitle: null,
      previewDescription: null
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

  renderImages() {
    return this.props.data.page.images.map((img, i) => {
      // debugger
      return (
        <li
          key={i}
          // className="collection-item avatar pin-content"
          // className="avatar pin-content"
          // className="avatar"
          className="square-container"
          onClick={() => this.chooseImage(img)}
        >
          {/* <img src={img} className="circle" /> */}
          <img src={img} className="square" />
        </li>
        // <ImageInList
        //   id={i}
        //   url={img}
        //   clickHandler={() => this.chooseImage(img)}
        //   {...img}
        // />
      );
    });
  }

  renderPossibleDescriptions() {
    return this.props.data.page.possibleDescriptions.map((text, i) => {
      // debugger
      return (
        <div>
          <li
            key={i}
            // className="collection-item avatar pin-content"
            onClick={() => this.choosePossibleDescription(text)}
          >
            {text}
          </li>
          <div className="divider" />
        </div>
      );
    });
  }

  chooseImage(index) {
    // debugger
    this.setState({
      previewImage: index
    });
  }

  choosePossibleDescription(index) {
    // debugger
    this.setState({
      previewDescription: index
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col m4 offset-m4 z-depth-3 card-panel">
              <div className="col hg22 offset-hg1">
                <h2 className="center-align">Page parse</h2>
                {/* <h2 className="center-align">{this.state.previewImage}</h2> */}
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
            {this.props.data.page && (
              <PinCard
                url={
                  this.state.previewImage == null
                    ? this.props.data.page.images[0]
                    : this.state.previewImage
                }
                title={
                  this.state.previewTitle == null
                    ? this.props.data.page.header
                    : this.state.previewTitle
                }
                description={
                  this.state.previewDescription == null
                    ? this.props.data.page.possibleDescriptions[0]
                    : this.state.previewDescription
                }
                // item={this.props.data.page}
              />
            )}
          </div>
        </div>

        {/* <div className="col m4 offset-m4 z-depth-3 card-panel"></div> */}

        <div className="container">
          <div className="row">
            <div className="col m6 z-depth-3 card-panel">
              <ul
              //  className="collection"
               >
                {this.props.data.page && this.renderImages()}
              </ul>
            </div>
            <div className="col m6 z-depth-3 card-panel">
              <ul>
                {this.props.data.page && this.renderPossibleDescriptions()}
              </ul>
            </div>
          </div>
        </div>
        {/* <ul>{this.props.data.page && this.renderImages()}</ul> */}
        {/* <div className="z-depth-3">
          {this.props.data.page && JSON.stringify(this.props.data.page.images)}
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
