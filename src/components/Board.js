import React from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    // debugger;
    this.state = {
      isHovered: false,
      editMode: false,
      editTitle: "",
      editDescription: "",
      editIsPrivateBoard: null,
      editTitle_error_text: null,
      disabled: false,
      contentType: null
      // editTitle_error_text: null,
    };
  }

  componentWillMount() {
    this.isDisabled();
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  renderNewCard() {
    return (
      <li
        className="collection-item avatar pin-content board__card"
        onClick={() => {
          // debugger;
          this.setState({
            editIsPrivateBoard: false,
            editTitle: "12345",
            editDescription: "",
            disabled: true
          });
          this.setState({ editMode: true });
        }}
      >
        <i className="material-icons circle green">add</i>
        <div className="col m12 board__card__content">
          <span className="title">Create a board</span>
        </div>
      </li>
    );
  }

  ConvertUTCTimeToLocalTime(UTCDateString) {
    var convertdLocalTime = new Date(UTCDateString);

    var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

    convertdLocalTime.setHours(convertdLocalTime.getHours() - hourOffset);

    return convertdLocalTime;
  }

  dateInWordsToNow(date) {
    return distanceInWordsToNow(this.ConvertUTCTimeToLocalTime(date));
  }

  renderCard(board) {
    let link;
    if (this.state.contentType == "board") {
      link = "/board/" + board.id;
    }

    if (this.state.contentType == "pin") {
      link = "/pin/" + board.id;
    }
    // debugger;
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
        <div className="board__card__content">
          <div className="col m12">
            <Link to={link}>
              {board.img == null ? (
                <i className="material-icons circle green">folder</i>
              ) : (
                <img src={board.img} alt="" className="circle" />
              )}
              <span className="title board__card__text">{board.name}</span>
              <p className="board__card__text">{board.description}</p>
              {/* <p className="">{board.description}</p> */}
            </Link>
            {board.link && (
              <a href={board.link} className="">
                <span className="board__misc board__card__text">
                  {board.link}
                </span>
              </a>
            )}

            <p className="board__misc">
              Last change
              {board.modified
                ? " " + this.dateInWordsToNow(board.modified)
                : " " + this.dateInWordsToNow(board.created)}
            </p>
          </div>
        </div>

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
                if (this.props.deleteBoard) this.props.deleteBoard(board.id);
                if (this.props.deletePin) this.props.deletePin(board.id);
                // debugger;
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
      // this.setState({
      //   editTitle_error_text: null
      // });
    } else if (
      this.state.editTitle.length > 3 &&
      this.state.editTitle.length < 256
    ) {
      editTitle_is_valid = true;
      // this.setState({
      //   editTitle_error_text: null
      // });
    } else {
      editTitle_is_valid = false;
      // this.setState({
      //   editTitle_error_text: "Title length should be between 3 and 256."
      // });
    }

    if (
      this.state.editDescription == "" ||
      this.state.editDescription.length <= 500
    ) {
      boardDescription_is_valid = true;
    } else {
      boardDescription_is_valid = false;
    }
    if (editTitle_is_valid && boardDescription_is_valid) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  }

  renderCharacterCounter(string, minLength, maxLength) {
    let length = string != null ? string.length : 0;
    // debugger
    return (
      <span className="character-counter">
        <span className={length < minLength ? "error--text" : ""}>
          {minLength}/
        </span>
        {length}
        <span className={length > maxLength ? "error--text" : ""}>
          /{maxLength}
        </span>
      </span>
    );
  }

  renderEditCardError() {
    let array = [];
    if (this.props.error.messages) {
      if (this.props.error.messages.Name) {
        array.push(this.props.error.messages.Name);
      }
      if (this.props.error.messages.Description) {
        array.push(this.props.error.messages.Description);
      }
    }

    if (this.props.error.message) {
      array.push(this.props.error.message);
    }
    // debugger;
    return (
      <div className="error--container">
        {array
          .map((error, i) => {
            return (
              <div className="error error--text alert alert-info">{error}</div>
            );
          })
          .filter(n => n)}
      </div>
    );

    // if (this.props.error.messages) {
    //   return Object.values(this.props.error.messages).forEach(value => {
    //     return (
    //       <div className="error--container">
    //         <div className="error error--text alert alert-info">{value}</div>
    //       </div>
    //     );
    //     //use value here
    //   });

    // return this.props.error.messages.map((error, i) => {
    //   return (
    //     <div className="error--container">
    //       <div className="error error--text alert alert-info">{error}</div>
    //     </div>
    //   );
    // });

    //   <div className="error--container">
    //   <div className="error error--text alert alert-info">
    //     {this.props.error.message}
    //   </div>
    // </div>
    // }

    // return (
    //   this.props.error && (
    //     <div className="error--container">
    //       <div className="error error--text alert alert-info">
    //         {this.props.error.message}
    //       </div>
    //     </div>
    //   )
    // );
  }

  renderEditCard(board) {
    let formTitle = "";
    let formImg = <i className="material-icons circle green">folder</i>;

    if (board) {
      if (board.img)
        formImg = <i className="material-icons circle green">folder</i>;
    }
// debugger
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
          {this.props.typeOfElement == "board"  && (
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

  render() {
    let { board, pin } = this.props;
    // debugger;
    if (pin) {
      this.state.contentType = "pin";
      return this.state.editMode == false
        ? this.renderCard(pin)
        : this.renderEditCard(pin);
    }

    if (board) {
      this.state.contentType = "board";
      return this.state.editMode == false
        ? this.renderCard(board)
        : this.renderEditCard(board);
    }

    return this.state.editMode == false
      ? this.renderNewCard()
      : this.renderEditCard();
  }
}
