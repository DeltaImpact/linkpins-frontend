import React from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { boardActions } from "../../actions";
import { Card } from "../Card/Card";

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
  }

  renderPublicBoards() {
    // debugger
    return this.props.board.boards
      .map((board, i) => {
        // return this.renderBoard(board);
        if (board.isPrivate == false) return this.renderBoard(board);
      })
      .filter(n => n);
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

  renderBoard(board) {
    return (
      <Card
        key={board.id}
        board={board}
        updateBoard={this.props.updateBoard}
        deleteBoard={this.props.deleteBoard}
        loading={this.props.board.updateBoardLoading}
        error={this.props.board.updateBoardError}
        objectWithErrorId={this.props.board.updateBoardId}
        typeOfElement="board"
      />
    );
  }

  renderCreateNewBoardForm() {
    // debugger
    return (
      // <ul className="collection-item avatar pin-content">
      <Card
        addBoard={this.props.addBoard}
        loading={this.props.board.AddBoardLoading}
        error={this.props.board.AddBoardError}
        typeOfElement="board"
      />
    );
    {
      /* {this.state.ShowNewBoardForm
          ? this.renderCreateNewBoardFormEdit()
          : this.renderCreateNewBoardFormPreview()} */
    }
    {
      /* </ul> */
    }
  }

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
        <div className="col m12">
          <span className="title">Create a board</span>
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
          onClick={e => this.createNewBoard(e)}
        >
          {!this.props.board.AddBoardLoading &&
            !this.props.board.AddBoardError &&
            "send"}
          {this.props.board.AddBoardError &&
            !this.props.board.AddBoardLoading &&
            "autorenew"}
          {this.props.board.AddBoardLoading && "hourglass_empty"}
        </i>
        <div className="col m12">
          <span className="title">Create a board</span>
          {/* <p className="">Create a board</p> */}
        </div>
        <div className="row">
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
              value={this.state.boardTitle != null ? this.state.boardTitle : ""}
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
              value={
                this.state.boardDescription != null
                  ? this.state.boardDescription
                  : ""
              }
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
                onChange={e => {
                  this.setState({
                    isBoardPrivate: e.target.checked
                  });
                }}
              />
              <span>Private desk</span>
            </label>
          </p>
        </div>
      </div>
    );
  }

  createNewBoard(e) {
    e.preventDefault();
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
    if (this.state.boardTitle === "" || this.state.boardTitle === null) {
      // this.setState({
      //   boardTitle_error_text: null
      // });
    } else if (
      this.state.boardTitle.length > 3 &&
      this.state.boardTitle.length < 500
    ) {
      debugger;

      boardTitle_is_valid = true;
      // this.setState({
      //   boardTitle_error_text: null
      // });
    } else {
      boardTitle_is_valid = false;
      // this.setState({
      //   boardTitle_error_text: "Title length should be between 3 and 256."
      // });
    }

    if (
      this.state.boardDescription === "" ||
      this.state.boardDescription === null
    ) {
      debugger;
      // this.setState({
      //   boardTitle_error_text: null
      // });
    } else if (
      this.state.boardDescription.length > 0 &&
      this.state.boardDescription.length < 500
    ) {
      boardDescription_is_valid = true;
      // this.setState({
      //   boardTitle_error_text: null
      // });
    } else {
      boardDescription_is_valid = false;
      // this.setState({
      //   boardTitle_error_text: "Title length should be between 3 and 256."
      // });
    }

    if (boardTitle_is_valid) {
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
            <h4 className="left-align">Boards</h4>
            {this.props.board.getAllBoardsLoading && (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            )}
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
    );
  }
}

function mapStateToProps(state) {
  const { board } = state;
  return {
    board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(boardActions, dispatch);
}

const connectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
export { connectedMainPage as MainPage };
