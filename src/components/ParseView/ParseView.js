import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Paper from '@material-ui/core/Paper';
import { dataActions, boardActions, pinActions } from "../../actions";
import { PinCard } from "../PinCard";
// import * as actionCreators from '../actions/data';

import { validateEmail } from "../../utils/misc";

import { ImageInList } from "./imageInList";

import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

// @connect(mapStateToProps, mapDispatchToProps)
class ParseView extends React.Component {
  constructor(props) {
    super(props);
    const redirectRoute = "/";
    this.state = {
      //   url: "http://casperjs.org/",
      // url: "http://joyreactor.cc/",
      url: "https://habr.com",
      url_error_text: null,
      redirectTo: redirectRoute,
      disabled: false,
      previewImage: null,
      previewTitle: null,
      previewDescription: null,
      previewBoardId: null,
      previewBoardName: null,
      mode: "preview"
    };
  }

  componentDidMount() {
    this.state.previewImage = null;
    this.state.previewTitle = null;
    this.state.previewDescription = null;

    this.props.getBoards();
    this.props.parse(this.state.url, this.state.redirectTo);
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

    this.state.previewImage = null;
    this.state.previewTitle = null;
    this.state.previewDescription = null;

    this.props.parse(this.state.url, this.state.redirectTo);
  }

  savePin(id, name) {
    // this.state.previewBoardId = id;
    // this.state.previewBoardName = name;
    // debugger;
    this.props.addPin(
      this.state.previewTitle,
      this.state.previewDescription,
      this.state.previewImage,
      this.props.parse.page.url,
      id
    );
    // this.props.add(this.state.url, this.state.redirectTo);

    // this.state.previewImage = null;
    // this.state.previewTitle = null;
    // this.state.previewDescription = null;

    // this.props.parse(this.state.url, this.state.redirectTo);
  }

  // componentDidReceiveProps() {
  //   if (this.props.parse.page) {
  //     this.state.previewImage = this.props.parse.page.images[0];
  //     this.state.previewTitle = this.props.parse.page.possibleDescriptions[0];
  //     this.state.previewDescription = this.props.parse.page.header;
  //     debugger
  //   } else {
  //     this.state.previewImage = null;
  //     this.state.previewTitle = null;
  //     this.state.previewDescription = null;
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    // debugger
    if (
      this.props.board !== nextProps.board ||
      this.props.parse !== nextProps.parse
    )
      this.needsUpdate = true;
  }
  componentDidUpdate() {
    if (this.needsUpdate) {
      this.needsUpdate = false;
      // debugger;
      // let sda = this.props;
      if (this.props.parse.page) {
        this.state.previewImage = this.props.parse.page.images[0];
        this.state.previewDescription = this.props.parse.page.possibleDescriptions[0];
        this.state.previewTitle = this.props.parse.page.header;
      }
      // alert(JSON.stringify(this.props))
    }
  }

  componentWillUpdate() {
    // if (this.props.parse.page) {
    //   this.state.previewImage = this.props.parse.page.images[0];
    //   this.state.previewTitle = this.props.parse.page.possibleDescriptions[0];
    //   this.state.previewDescription = this.props.parse.page.header;
    // } else {
    //   this.state.previewImage = null;
    //   this.state.previewTitle = null;
    //   this.state.previewDescription = null;
    // }
  }

  submitClasses() {
    return this.state.disabled == true
      ? "btn btn-medium waves-effect waves-light s12 disabled"
      : "btn btn-medium waves-effect waves-light s12";
  }

  renderImages() {
    if (this.state.previewImage == null)
      this.state.previewImage = this.props.parse.page.images[0];
    // if (this.state.previewTitle==null) this.state.previewTitle = this.props.parse.page.possibleDescriptions[0];
    // if (this.state.previewDescription==null) this.state.previewDescription = this.props.parse.page.header;
    return this.props.parse.page.images.map((img, i) => {
      return (
        <li
          key={i}
          className={
            this.state.previewImage == img
              ? "square-container square-container-active"
              : "square-container"
          }
          onClick={() => this.chooseImage(img)}
        >
          {/* <img src={img} className="circle" /> */}
          <img
            src={img}
            //  className="square"
            className={
              this.state.previewImage == img ? "square square-active" : "square"
            }
          />
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
    // this.state.previewImage = this.props.parse.page.images[0];
    // this.state.previewTitle = this.props.parse.page.possibleDescriptions[0];
    // this.state.previewDescription = this.props.parse.page.header;
    if (this.state.previewDescription == null)
      this.state.previewDescription = this.props.parse.page.possibleDescriptions[0];
    return this.props.parse.page.possibleDescriptions.map((text, i) => {
      return (
        <div key={i}>
          <li
            key={i}
            className={
              this.state.previewDescription == text
                ? "description-container-active description-container"
                : "description-container"
            }
            // className="collection-item avatar pin-content"
            onClick={() => this.choosePossibleDescription(text)}
          >
            <div className={this.state.previewDescription == text ? "" : ""}>
              {text}
            </div>
          </li>
          <div className="divider" />
        </div>
      );
    });
  }

  renderBoards() {
    return this.props.board.boards.map((board, i) => {
      return this.renderBoard(board);
    });
  }

  renderBoard(board) {
    return (
      <li
        key={board.id}
        className="collection-item avatar pin-content"
        onClick={() => this.savePin(board.id, board.name)}
      >
        {board.img == null ? (
          <i className="material-icons circle green">folder</i>
        ) : (
          <img src={board.img} alt="" className="circle" />
        )}
        <div className="col m12">
          <span className="title">{board.name}</span>
          <p className="">{board.description}</p>
          <p className="">
            Last change{" "}
            {board.modified
              ? distanceInWordsToNow(board.modified)
              : distanceInWordsToNow(board.created)}
          </p>
        </div>
      </li>
    );
  }

  renderRecordPreview() {
    return (
      <div className="card-panel">
        <div className="card-content list__title">
          <h6 className="left-align list__item">Preview</h6>
        </div>

        <PinCard
          url={
            this.state.previewImage == null
              ? this.props.parse.page.images[0]
              : this.state.previewImage
          }
          title={
            this.state.previewTitle == null
              ? this.props.parse.page.header
              : this.state.previewTitle
          }
          description={
            this.state.previewDescription == null
              ? this.props.parse.page.possibleDescriptions[0]
              : this.state.previewDescription
          }
          // item={this.props.parse.page}
        />
      </div>
    );
  }

  chooseImage(index) {
    this.setState({
      previewImage: index
    });
  }

  choosePossibleDescription(index) {
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
                {this.props.parse.loading && (
                  <div className="progress">
                    <div className="indeterminate" />
                  </div>
                )}
                <div className="row">
                  <form className="col s12">
                    {this.props.parse.error && (
                      <div className="row error--container">
                        <div className="error error--text alert alert-info">
                          {this.props.parse.error.errorMessage}
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

        {this.props.parse.page && (
          <div className="container">
            <div className="row ">
              {/* <ul className="tabs z-depth-1">
                <li className="tab">
                  <a
                    // href=""
                    onClick={e =>
                      this.setState({
                        mode: "preview"
                      })
                    }
                    className={
                      this.state.mode == "preview"
                        ? "tab__container tab__container--active black-text"
                        : "tab__container black-text"
                    }
                  >
                    Preview
                  </a>
                </li>
                <li
                  className="tab"
                  onClick={e =>
                    this.setState({
                      mode: "edit"
                    })
                  }
                >
                  <a
                    className={
                      this.state.mode == "edit"
                        ? "tab__container tab__container--active black-text"
                        : "tab__container black-text"
                    }
                  >
                    Manual editing
                  </a>
                </li>
              </ul> */}

              {this.state.mode == "preview" && this.renderRecordPreview()}
              {/* {this.state.mode == "edit" && this.renderManualEdit()} */}
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="card-panel">
              <h6 className="left-align">Boards</h6>
              {this.props.board.getAllBoardsLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              <ul className="collection">
                {this.props.board.boards && this.renderBoards()}
              </ul>
            </div>
          </div>
        </div>

        {/* {this.props.parse.page && (
          <div className="container">
            <div className="row">
              <div className="card-panel">
                <button
                  className={this.submitClasses()}
                  type="button"
                  name="action"
                  // onClick={e => this.parse(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )} */}

        {/* <div className="col m4 offset-m4 z-depth-3 card-panel"></div> */}

        <div className="container">
          <div className="row">
            {this.props.parse.page && (
              <div className="col m5 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Choose image</h6>
                </div>
                <ul>{this.renderImages()}</ul>
              </div>
            )}

            {this.props.parse.page && (
              <div className="col m6 offset-m1 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Choose description</h6>
                </div>
                <ul>{this.renderPossibleDescriptions()}</ul>
              </div>
            )}
          </div>
        </div>
        {/* <ul>{this.props.parse.page && this.renderImages()}</ul> */}
        {/* <div className="z-depth-3">
          {this.props.parse.page && JSON.stringify(this.props.parse.page.images)}
        </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { parse, board } = state;
  //   debugger
  return {
    parse,
    board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...dataActions, ...boardActions, ...pinActions },
    dispatch
  );
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
