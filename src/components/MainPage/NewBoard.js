import React from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

export class NewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      editMode: false,
      editTitle: null,
      editDescription: null,
      editIsPrivateBoard: null,
      editTitle_error_text: null,
      disabled: false
      // editTitle_error_text: null,
    };
  }

  handleHover() {
    // debugger
    // let asd = this.state;
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  renderCard(board) {
    return (
      <li
        key={board.id}
        className="collection-item avatar pin-content board__card"
      >
        <Link to={"/board/" + board.id}>
          {board.img == null ? (
            <i className="material-icons circle green">folder</i>
          ) : (
            <img src={board.img} alt="" className="circle" />
          )}
          <div className="col m12">
            <span className="title">{board.name}</span>
            <p className="">{board.description}</p>
            <p className="">
              Last change
              {board.modified
                ? " " + distanceInWordsToNow(board.modified)
                : " " + distanceInWordsToNow(board.created)}
            </p>
          </div>
        </Link>
        {this.state.isHovered && (
          <div
            // to="#!"
            className="secondary-content"
          >
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                // debugger
                this.setState({
                  editIsPrivateBoard: board.isPrivate,
                  editTitle: board.name,
                  editDescription: board.description,
                  editTitle_error_text: null,
                  disabled: false
                });
                this.setState({
                  editMode: true
                });
              }}
            >
              edit
            </i>
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                // let tmp = board.name;
                // debugger;
                this.props.deleteBoard(board.id);
              }}
            >
              delete
            </i>
          </div>
        )}
      </li>
    );
  }

  changeValue(e, type) {
    const value = e.target.value;
    const next_state = {};
    next_state[type] = value;

    this.setState(next_state, () => {
      this.isDisabled();
    });
  }

  isDisabled() {
    let editTitle_is_valid = false;
    let boardDescription_is_valid = false;
    if (this.state.editTitle === "" || this.state.editTitle === null) {
      // debugger;
      this.setState({
        editTitle_error_text: null
      });
    } else if (
      this.state.editTitle.length > 3 &&
      this.state.editTitle.length < 256
    ) {
      editTitle_is_valid = true;
      this.setState({
        editTitle_error_text: null
      });
    } else {
      editTitle_is_valid = false;
      this.setState({
        editTitle_error_text: "Title length should be between 3 and 256."
      });
    }

    if (editTitle_is_valid) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  renderEditCard(board) {
    // debugger
    return (
      <li
        key={board.id}
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
        {/* <Link to={"/board/" + board.id}> */}
        {board.img == null ? (
          <i className="material-icons circle green">folder</i>
        ) : (
          <img src={board.img} alt="" className="circle" />
        )}
        <div className="col m11">
          {/* <span className="title">{this.props.updateBoardLoading + []}</span> */}

          {this.props.updateBoardLoading && (
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
        {this.state.isHovered && (
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
                debugger;
                // if (this.state.isDisabled)
                //   this.props.updateBoard(
                //     board.id,
                //     this.state.editTitle,
                //     this.state.editDescription,
                //     this.state.editIsPrivateBoard
                //   );
              }}
            >
              check
            </i>
          </div>
        )}
      </li>
    );
  }

  render() {
    let { board } = this.props;
    return this.state.editMode == false
      ? this.renderCard(board)
      : this.renderEditCard(board);
  }
}
