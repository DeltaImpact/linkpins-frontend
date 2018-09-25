import React from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowNewBoardForm: false,
      // ShowNewBoardForm: true,
      // boardTitle: null,
      boardTitle: "123",
      boardDescription: null,
      // boardTitle: "Title",
      // boardDescription: "Description",
      isBoardPrivate: false,
      boardTitle_error_text: null,
      boardDescription_error_text: null,
      disabled: true
    };
  }
  componentDidMount() {
    this.props.getBoards();
    // this.props.addBoard("name", "description", "img", false);
  }

  renderPublicBoards() {
    // debugger
    return this.props.board.boards.map((board, i) => {
      return this.renderBoard(board);
    });
  }

  renderBoard(board) {
    // debugger
    return (
      <Link key={board.id} to={"/board/" + board.id}>
        <li key={board.id} className="collection-item avatar pin-content">
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

          <div
            to="#!"
            className="secondary-content"
            onClick={e => {
              e.preventDefault;
              // let tmp = board.name;
              // debugger;
              this.props.deleteBoard(board.id);
            }}
          >
            <i className="material-icons">delete</i>
          </div>
        </li>
      </Link>
    );
  }

  renderPrivateBoards() {
    let array = this.props.board.boards
      .map((board, i) => {
        if (board.isPrivate == true) return this.renderBoard(board);
      })
      .filter(n => n);

    if (array.length) {
      return (
        <div className="col m8 offset-m2">
          <h4 className="left-align">Private boards</h4>
          <ul className="collection">{array}</ul>
        </div>
      );
    } else return null;
  }

  renderCreateNewBoardForm() {
    return (
      <li className="collection-item avatar pin-content">
        {this.state.ShowNewBoardForm
          ? this.renderCreateNewBoardFormEdit()
          : this.renderCreateNewBoardFormPreview()}
      </li>
    );
  }

  switchCreateNewBoardForm() {}

  renderCreateNewBoardFormPreview() {
    return (
      <div>
        {/* <div className="col m2"> */}
        <i
          className="material-icons circle green"
          onClick={() =>
            this.setState({ ShowNewBoardForm: !this.state.ShowNewBoardForm })
          }
        >
          add
        </i>
        {/* </div> */}
        <div className="col m12">
          <span className="title">Create a board</span>
          {/* <p className="">Create a board</p> */}
        </div>
      </div>
    );
  }

  renderCreateNewBoardFormEdit() {
    return (
      <div>
        <i
          className={
            this.state.disabled
              ? "material-icons circle grey"
              : "material-icons circle green"
          }
          // onClick={() =>
          //   this.setState({ ShowNewBoardForm: !this.state.ShowNewBoardForm })
          // }
          onClick={e => this.createNewBoard(e)}
        >
          {!this.props.board.AddBoardLoading &&
            !this.props.board.AddBoardError &&
            "send"}
          {this.props.board.AddBoardError &&
            !this.props.board.AddBoardLoading &&
            "autorenew"}
          {this.props.board.AddBoardLoading && "hourglass_empty"}
          {/* clear */}
        </i>
        <div className="col m12">
          <span className="title">Create a board</span>
          {/* <p className="">Create a board</p> */}
        </div>
        <div className="row">
          {/* {this.props.board.AddBoardLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )} */}
          {this.props.board.AddBoardError && (
            <div className="error--container">
              <div className="error error--text alert alert-info">
                {this.props.board.AddBoardError.message}
              </div>
            </div>
          )}
          <div className="input-field col s12">
            <input
              id="boardTitle"
              type="text"
              value={this.state.boardTitle}
              className={
                this.state.boardTitle_is_valid != null ? "invalid" : ""
              }
              onChange={e => this.changeValue(e, "boardTitle")}
            />
            <label
              htmlFor="boardTitle"
              className={this.state.boardTitle != null ? "active" : ""}
            >
              Title
            </label>
            {this.state.boardTitle_error_text && (
              <div className="error--text">
                {this.state.boardTitle_error_text}
              </div>
            )}
          </div>
          <div className="input-field col s12">
            <input
              id="boardDescription"
              type="text"
              value={this.state.boardDescription}
              className={
                this.state.boardDescription_is_valid != null ? "invalid" : ""
              }
              onChange={e => this.changeValue(e, "boardDescription")}
            />
            <label
              htmlFor="boardDescription"
              className={this.state.boardDescription != null ? "active" : ""}
            >
              Description
            </label>
            {this.state.boardDescription_error_text && (
              <div className="error--text">
                {this.state.boardDescription_error_text}
              </div>
            )}
          </div>
          <p>
            <label>
              <input
                type="checkbox"
                className="filled-in"
                // checked={this.state.isBoardPrivate == "on" ? "checked" : ""}
                // checked="checked"
                // checked={null}
                onChange={e => {
                  this.setState({
                    isBoardPrivate: e.target.checked
                  });
                }}
                // onChange={e => alert()}
                // onClick={e => this.changeValue(e, "isBoardPrivate")}
                // onClick={e => this.changeValue(e, "isBoardPrivate")}
              />
              <span>
                Private desk
                {/* {this.state.isBoardPrivate + []} */}
              </span>
            </label>
          </p>
        </div>
      </div>
    );
  }

  createNewBoard(e) {
    e.preventDefault();
    // debugger
    if (!this.state.disabled)
      this.props.addBoard(
        this.state.boardTitle,
        this.state.boardDescription,
        null,
        this.state.isBoardPrivate
      );
  }

  isDisabled() {
    let boardTitle_is_valid = false;
    let boardDescription_is_valid = false;
    // boardTitle
    // boardDescription
    if (this.state.boardTitle === "" || this.state.boardTitle === null) {
      this.setState({
        boardTitle_error_text: null
      });
    } else if (
      this.state.boardTitle.length > 3 &&
      this.state.boardTitle.length < 256
    ) {
      boardTitle_is_valid = true;
      this.setState({
        boardTitle_error_text: null
      });
    } else {
      boardTitle_is_valid = false;
      this.setState({
        boardTitle_error_text: "Title length should be between 3 and 256."
      });
    }

    // if (
    //   this.state.boardDescription === "" ||
    //   this.state.boardDescription === null
    // ) {
    //   this.setState({
    //     boardDescription_error_text: null
    //   });
    // } else if (
    //   this.state.boardDescription.length > 3 &&
    //   this.state.boardDescription.length < 256
    // ) {
    //   boardDescription_is_valid = true;
    //   this.setState({
    //     boardDescription_error_text: null
    //   });
    // } else {
    //   boardDescription_is_valid = false;
    //   this.setState({
    //     boardDescription_error_text: "Title length should be between 3 and 256."
    //   });
    // }

    if (
      boardTitle_is_valid
      // && boardDescription_is_valid
    ) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;

    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  render() {
    // debugger
    return (
      <div className="container">
        <div className="row">
          <div className="col m8 offset-m2">
            {/* <h4 className="left-align">Pins</h4> */}
            <h4 className="left-align">Boards</h4>
            {this.props.board.getAllBoardsLoading && (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            )}
            {/* board */}
            {this.props.board.getAllBoardsError && (
              <div className="row error--container">
                <div className="error error--text alert alert-info">
                  {this.props.board.getAllBoardsError.message}
                </div>
              </div>
            )}

            <ul className="collection">
              {this.renderCreateNewBoardForm()}
              {this.props.board.boards && this.renderPublicBoards()}
            </ul>
          </div>
          {this.props.board.boards && this.renderPrivateBoards()}
        </div>
      </div>
      // <div>
      //     something

      // </div>
    );
  }
}

function mapStateToProps(state) {
  const { board } = state;
  return {
    board
  };
}

import { boardActions } from "../actions";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(boardActions, dispatch);
}

const connectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
export { connectedMainPage as MainPage };
