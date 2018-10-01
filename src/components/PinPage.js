import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../actions";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Board } from "./Board";
// import { authActions } from "../../actions";
// import "./../../static/styles/PinPage.css";
// import { UserFields } from "./UserFields";
class PinPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentDidMount() {
    this.props.getBoards();
  }

  componentWillMount() {
    // debugger;
    if (this.props.match.params.id != null) {
      let pinId = this.props.match.params.id;
      this.props.getPin(pinId);
    }

    // this.props.addPin("name", "description", "img", false);
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

  renderBoards() {
    // debugger
    return this.props.pin.pin.boards
      .map((board, i) => {
        // return this.renderBoard(board);
        return this.renderBoard(board);
      })
      .filter(n => n);
  }

  renderBoard(board) {
    return (
      <Board
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

  renderBoardsToSave() {
    return this.props.board.boards.map((board, i) => {
      return this.renderBoardToSave(board);
    });
  }

  renderBoardToSave(board) {
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

  render() {
    // debugger
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.loading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}

              {this.props.pin.pin && (
                <div className="card-panel s12">
                  <h4 className="left-align card-title card__title title__wrap">
                    {this.props.pin.pin.name}
                  </h4>
                  <h6 className="left-align card-title card__title">
                    {this.props.pin.pin.description}
                  </h6>

                  <div className="left-align board__misc">
                    <h6 className="left-align card-title card__title">
                      Modified:
                      {"  " + this.props.pin.pin.modified != null
                        ? this.dateInWordsToNow(this.props.pin.pin.modified)
                        : " never"}
                    </h6>
                    <h6 className="left-align card-title card__title">
                      Created:
                      {" " + this.dateInWordsToNow(this.props.pin.pin.created)}
                    </h6>
                  </div>

                  <a
                    className="left-align card-title card__title"
                    href={this.props.pin.pin.link}
                    className=""
                  >
                    <span className="board__misc board__card__text">
                      {this.props.pin.pin.link}
                    </span>
                  </a>

                  {/* {JSON.stringify(this.props.pin.pin)} */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.props.pin.pin && (
              <div className="col l8 offset-l2 m8 l9 legacy-content">
                <h4 className="left-align">Saved to</h4>
                <ul className="collection">{this.renderBoards()}</ul>
              </div>
            )}
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.props.board.boards && (
              <div className="col l8 offset-l2 m8 l9 legacy-content">
                <h4 className="left-align">Save to</h4>
                <ul className="collection">{this.renderBoardsToSave()}</ul>
              </div>
            )}
          </div>
        </div>

      </div>
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

const connectedPinPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinPage);
export { connectedPinPage as PinPage };
