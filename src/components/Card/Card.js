import React from "react";
import { Link } from "react-router-dom";
import {
  dateInWordsToNow,
  renderError
} from "../../utils/misc";
export class Card extends React.Component {
  constructor(props) {
    super(props);
  ;
    this.state = {
      isHovered: false,
      mode: "preview",
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
    ;
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

  ;
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

  renderCardImage(item, typeOfElement) {
    if (typeOfElement == "AddBoard") {
      return <i className="material-icons circle green">add</i>;
    }
  
    if (item.img == null)
      return <i className="material-icons circle green">folder</i>;
    return <img src={item.img} alt="" className="circle" />;
  }

  renderEditCard(item, typeOfElement) {
  
    return (
      <div>
        {this.renderCardImage(item, typeOfElement)}
        <div className="col m10">
          {/* {this.props.error && this.renderEditCardError()} */}
          {this.props.error && renderError(this.props.error)}
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
      </div>
    );
  }

  renderRegularCard(item, typeOfElement) {
  
    if (typeOfElement == "AddBoard")
      return (
        <div
          onClick={() => {
          ;
            this.setState({
              editIsPrivateBoard: false,
              // editTitle: "12345",
              // editDescription: "",
              disabled: true
            });
            // this.setState({ editMode: true });
            this.setState({ mode: "edit" });
          }}
        >
          {this.renderCardImage(item, typeOfElement)}
          <span className="title board__card__text--short">Create a board</span>
        </div>
      );
    return (
      <div>
        <Link to={"/" + typeOfElement + "/" + item.id}>
          {this.renderCardImage(item, typeOfElement)}
          <div
            className={
              this.props.cardType == "full"
                ? "title "
                : "title board__card__text--short"
            }
          >
            {item.name}
          </div>

          <p
            className={
              this.props.cardType == "full" ? "" : "board__card__text--short"
            }
          >
            {item.description}
          </p>
        </Link>
        {item.link && (
          <a href={item.link} className="">
            <span className="board__misc board__card__text--short">
              {item.link}
            </span>
          </a>
        )}

        {this.renderMiscOfCard(item, typeOfElement)}
      </div>
    );
  }

  renderMiscOfCard(item, typeOfElement) {
    if (this.props.cardType == "full") {
      return (
        <div className="board__misc">
          <span className="board__misc__item--time">
            Last change {dateInWordsToNow(item.modified)}
          </span>

          <span className="board__misc__item--time">
            Created {dateInWordsToNow(item.created)}
          </span>
          {item.isPrivate ? (
            <span className="board__misc__item--lock">Private board</span>
          ) : null}
        </div>
      );
    }
    return (
      <div className="board__misc">
        <span className="board__misc__item--time">
          {`Last change ${
            item.modified
              ? dateInWordsToNow(item.modified)
              : dateInWordsToNow(item.created)
          }` //`
          }
        </span>
        {item.isPrivate ? (
          <span className="board__misc__item--lock">Private board</span>
        ) : null}
      </div>
    );
  }

  renderConfirmDelete(item, typeOfElement) {
    let deleteCompletelyButton;
    if (this.props.deleteBoard || this.props.deletePin) {
      deleteCompletelyButton = (
        <a
          onClick={e => {
            e.preventDefault;
          ;
            if (this.props.deleteBoard) this.props.deleteBoard(item.id);
            if (this.props.deletePin) this.props.deletePin(item.id);
          }}
          className="waves-effect waves-light btn"
        >
          Delete {typeOfElement} completely
        </a>
      );
    }

    return (
      <div>
        {this.renderCardImage(item, typeOfElement)}
        {`Please confirm, that you want to delete ${typeOfElement} ${
          item.name
        }.` //`
        }

        <div className="card-action">{deleteCompletelyButton}</div>
      </div>
    );
  }

  renderCardActions(item, typeOfElement, isHovered) {
    if (this.state.mode == "edit")
      return (
        <div
          // to="#!"
          className="secondary-content"
        >
          <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;

              this.setState({
                mode: "preview"
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
            onClick={e => {
              e.preventDefault;
              if (!this.state.disabled) {
                if (this.props.updateBoard) {
                  this.props.updateBoard(
                    item.id,
                    this.state.editTitle,
                    this.state.editDescription,
                    this.state.editIsPrivateBoard
                  );
                }

                if (this.props.updatePin) {
                  this.props.updatePin(
                    item.id,
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
      );

    if (this.state.mode == "confirmDelete")
      return (
        <div className="secondary-content">
          <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;

              this.setState({
                mode: "preview"
              });
            }}
          >
            close
          </i>
        </div>
      );

    if (isHovered && typeOfElement != "AddBoard")
      return (
        <div className="secondary-content">
          <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;
              this.setState({
                editTitle: item ? item.name : "",
                editDescription: item ? item.description : "",
                editIsPrivateBoard:
                  item && item.isPrivate ? item.isPrivate : null,
                editTitle_error_text: null,
                disabled: false
              });
              this.setState({
                mode: "edit"
              });
            }}
          >
            edit
          </i>
          <i
            className="material-icons board__card__button"
            onClick={e => {
              e.preventDefault;
              this.setState({
                mode: "confirmDelete"
              });
            }}
          >
            delete
          </i>
          {this.props.pinAction && (
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                this.props.pinAction(this.props.pinId, this.props.item.id);
              }}
            >
              playlist_add
            </i>
          )}
          {this.props.unpinAction && (
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                this.props.unpinAction(this.props.pinId, this.props.item.id);
              }}
            >
              playlist_add_check
            </i>
          )}
        </div>
      );
  }

  render() {
    const { item, typeOfElement } = this.props;
    this.state.contentType = typeOfElement;
  ;
    let cardContent;
    switch (this.state.mode) {
      case "preview":
        cardContent = this.renderRegularCard(item, typeOfElement);
        break;
      case "edit":
        cardContent = this.renderEditCard(item, typeOfElement);
        break;
      case "confirmDelete":
        cardContent = this.renderConfirmDelete(item, typeOfElement);
        break;
      default:
        return null;
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
        <div className="board__card__content col m12">
          {cardContent}
          {/* {if (this.state.mode == "preview") this.renderRegularCard(item, typeOfElement) else null}
        {if (this.state.mode == "edit") this.renderEditCard(item, typeOfElement)}
        {if (this.state.mode == "confirmDelete") this.renderConfirmDelete(item, typeOfElement)} */}

          {/* {this.state.editMode == false
            ? this.renderRegularCard(item, typeOfElement)
            : this.renderEditCard(item, typeOfElement)} */}
        </div>
        {this.renderCardActions(item, typeOfElement, this.state.isHovered)}
      </li>
    );
  }
}
