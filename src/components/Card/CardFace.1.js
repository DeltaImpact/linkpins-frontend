import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { BoardPin } from "./BoardPin";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Card } from "../Card";

class CardEdit extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

//   componentWillMount() {
//     // debugger;
//     if (this.props.match.params.id != null) {
//       let boardId = this.props.match.params.id;
//       this.props.getBoard(boardId);
//     }
//   }

  render() {
    let formTitle = "";
    let formImg = <i className="material-icons circle green">folder</i>;

    if (board) {
      if (board.img)
        formImg = <i className="material-icons circle green">folder</i>;
    }

    return (
      <li
        className="collection-item avatar pin-content board__card"
        onMouseEnter={() =>
          this.setState({
            isHovered: true
          })
        }
        onMouseLeave={() =>
          this.setState({
            isHovered: false
          })
        }
      >
        {formImg}
        {/* {board.img == null ? (
          <i className="material-icons circle green">folder</i>
        ) : (
          <img src={board.img} alt="" className="circle" />
        )} */}
        <div className="col m10">
          {this.props.error && this.renderEditCardError()}
          {/* <span className="title">{this.props.loading + []}</span> */}

          {this.props.loading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          <div className="input-field col s12">
            <input
              id="editTitle"
              type="text"
              value={this.state.editTitle != null ? this.state.editTitle : ""}
              className={this.state.editTitle_is_valid != null ? "invalid" : ""}
              onChange={e => this.changeValue(e, "editTitle")}
            />
            <label
              htmlFor="editTitle"
              className={this.state.editTitle != null ? "active" : ""}
            >
              Title
            </label>
            {this.renderCharacterCounter(this.state.editTitle, 3, 80)}
            {this.state.editTitle_error_text && (
              <div className="error--text">
                {this.state.editTitle_error_text}
              </div>
            )}
          </div>
          <div className="input-field col s12">
            <input
              id="boardDescription"
              type="text"
              value={
                this.state.editDescription != null
                  ? this.state.editDescription
                  : ""
              }
              className={
                this.state.boardDescription_is_valid != null ? "invalid" : ""
              }
              onChange={e => this.changeValue(e, "editDescription")}
            />
            <label
              htmlFor="boardDescription"
              className={this.state.editDescription != null ? "active" : ""}
            >
              Description
            </label>
            {this.renderCharacterCounter(this.state.editDescription, 0, 500)}
            {this.state.boardDescription_error_text && (
              <div className="error--text">
                {this.state.boardDescription_error_text}
              </div>
            )}
          </div>
          {this.props.typeOfElement == "board" && (
            <p>
              <label className="input-field col s12">
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={this.state.editIsPrivateBoard ? "checked" : ""}
                  onChange={e => {
                    this.setState({
                      editIsPrivateBoard: e.target.checked
                    });
                  }}
                />
                <span>Private desk</span>
              </label>
            </p>
          )}
          {/* <span className="title">{board.name}</span>
            <p className="">{board.description}</p>
            <p className="">
              Last change{" "}
              {board.modified
                ? distanceInWordsToNow(board.modified)
                : distanceInWordsToNow(board.created)}
            </p> */}
        </div>
        {/* </Link> */}
        {
          <div
            // to="#!"
            className="secondary-content"
          >
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                this.setState({
                  editMode: false
                });
              }}
            >
              close
            </i>
            <i
              className={
                this.state.disabled
                  ? "material-icons board__card__button grey-text"
                  : "material-icons board__card__button"
              }
              // className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                // let asd = this.state;
                if (!this.state.isDisabled) {
                  // debugger;
                  if (this.props.updateBoard) {
                    this.props.updateBoard(
                      board.id,
                      this.state.editTitle,
                      this.state.editDescription,
                      this.state.editIsPrivateBoard
                    );
                  }

                  if (this.props.updatePin) {
                    this.props.updatePin(
                      board.id,
                      this.state.editTitle,
                      this.state.editDescription
                    );
                  }

                  if (this.props.addBoard)
                    this.props.addBoard(
                      this.state.editTitle,
                      this.state.editDescription,
                      null,
                      this.state.editIsPrivateBoard
                    );
                }
              }}
            >
              check
            </i>
          </div>
        }
      </li>
    );
  }
}

function mapStateToProps(state) {
  const { board, pin } = state;
  return {
    board,
    pin
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...dataActions, ...boardActions, ...pinActions },
    dispatch
  );
}

const connectedBoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPage);
export { connectedBoardPage as BoardPage };
