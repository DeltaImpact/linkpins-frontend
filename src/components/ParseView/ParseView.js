import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  ;
    this.props.addPin(
      this.state.previewTitle,
      this.state.previewDescription,
      this.state.previewImage,
      this.props.parsing.page.url,
      id
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.board !== nextProps.board ||
      this.props.parsing !== nextProps.parsing
    ){
      this.needsUpdate = true;
    }
  }
  componentDidUpdate() {
    if (this.needsUpdate) {
      this.needsUpdate = false;
      if (this.props.parsing.page) {
        this.state.previewImage = this.props.parsing.page.images[0];
        this.state.previewDescription = this.props.parsing.page.possibleDescriptions[0];
        this.state.previewTitle = this.props.parsing.page.header;
      }
    }
  }

  submitClasses() {
    return this.state.disabled == true
      ? "btn btn-medium waves-effect waves-light s12 disabled"
      : "btn btn-medium waves-effect waves-light s12";
  }

  renderImages() {
    if (this.state.previewImage == null)
      this.state.previewImage = this.props.parsing.page.images[0];
    return this.props.parsing.page.images.map((img, i) => {
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
          <img
            src={img}
            className={
              this.state.previewImage == img ? "square square-active" : "square"
            }
          />
        </li>
      );
    });
  }

  renderPossibleDescriptions() {
    if (this.state.previewDescription == null)
      this.state.previewDescription = this.props.parsing.page.possibleDescriptions[0];
    return this.props.parsing.page.possibleDescriptions.map((text, i) => {
      return (
        <div key={i}>
          <li
            key={i}
            className={
              this.state.previewDescription == text
                ? "description__container--active description__container"
                : "description__container"
            }
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
              ? this.props.parsing.page.images[0]
              : this.state.previewImage
          }
          title={
            this.state.previewTitle == null
              ? this.props.parsing.page.header
              : this.state.previewTitle
          }
          description={
            this.state.previewDescription == null
              ? this.props.parsing.page.possibleDescriptions[0]
              : this.state.previewDescription
          }
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

  renderParseForm() {
    return (
      <div className="col hg22 offset-hg1">
        <h2 className="center-align">Page parse</h2>
        {this.props.parsing.loading && (
          <div className="progress">
            <div className="indeterminate" />
          </div>
        )}
        <div className="row">
          <form className="col s12">
            {this.props.parsing.error && (
              <div className="row error--container">
                <div className="error error--text alert alert-info">
                  {this.props.parsing.error.errorMessage}
                </div>
              </div>
            )}
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="url"
                  type="text"
                  value={this.state.url}
                  onChange={e => this.changeValue(e, "url")}
                />
                <label
                  htmlFor="url"
                  className={this.state.url != null ? "active" : ""}
                >
                  Site url
                </label>
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
    );
  }

  renderBoardsNotFound() {
    return (
      <div className="col hg22 offset-hg1">
        <h4 className="center-align">Please, create any board, to start.</h4>
      </div>
    );
  }

  render() {
    // debugger
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col m4 offset-m4 z-depth-3 card-panel">
              {this.props.board.boards != null ? this.renderParseForm() : this.renderBoardsNotFound()}
            </div>
          </div>
        </div>

        {this.props.parsing.page && (
          <div className="container">
            <div className="row ">
              {this.state.mode == "preview" && this.renderRecordPreview()}
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

        <div className="container">
          <div className="row">
            {this.props.parsing.page && (
              <div className="col m5 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Choose image</h6>
                </div>
                <ul>{this.renderImages()}</ul>
              </div>
            )}

            {this.props.parsing.page && (
              <div className="col m6 offset-m1 z-depth-3 card-panel">
                <div className="card-content list__title">
                  <h6 className="left-align list__item">Choose description</h6>
                </div>
                <ul>{this.renderPossibleDescriptions()}</ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { parsing, board } = state;
  // debugger
  return {
    parsing,
    board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...dataActions, ...boardActions, ...pinActions },
    dispatch
  );
}

ParseView.propTypes = {};

const connectedRegisterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseView);
export { connectedRegisterPage as ParseView };
