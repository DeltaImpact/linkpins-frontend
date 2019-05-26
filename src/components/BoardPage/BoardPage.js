import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Card } from "../Card";
import {
  parseJSON,
  processErrorResponse,
  dateInWordsToNow,
  renderError
} from "../../utils/misc";

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentWillMount() {
    if (this.props.match.params.id != null) {
      let boardId = +this.props.match.params.id;
      this.props.getBoard(boardId);
      let currentOffset = +this.props.match.params.offset || 0;
      this.props.getBoardPins(
        boardId,
        currentOffset,
        this.props.board.getBoardPinsTake
      );
    }
  }

  renderPins() {
    return this.props.board.getBoardPins.items.map((pin, i) => {
      return this.renderPin(pin);
    });
  }

  renderPin(pin) {
    return (
      <Card
        key={pin.id}
        item={pin}
        updatePin={this.props.updatePin}
        deletePin={this.props.deletePin}
        deletePin={this.props.deletePin}
        loading={this.props.pin.updatePinLoading}
        error={this.props.pin.updatePinError}
        typeOfElement="pin"
      />
    );
  }

  renderPaginatorText() {
    let currentOffset = +this.props.match.params.offset || 0;
    // let hasPrew = currentOffset - this.props.pin.getBoardPinsTake > 0;
    let hasPrew = currentOffset !== 0;
    let hasNext =
      currentOffset + this.props.board.getBoardPinsTake <
        this.props.board.getBoardPins.count &&
      currentOffset + this.props.board.getBoardPinsTake !==
        this.props.board.getBoardPins.count;

    let leftButtonsClasses =
      "material-icons circle green pagination__button waves-effect waves-light";
    if (!hasPrew) {
      leftButtonsClasses += " pagination__button--disabled";
    }

    let rightButtonsClasses =
      "material-icons circle green pagination__button waves-effect waves-light";
    if (!hasNext) {
      rightButtonsClasses += " pagination__button--disabled";
    }

    let leftOffset =
      currentOffset - this.props.board.getBoardPinsTake > 0
        ? currentOffset - this.props.board.getBoardPinsTake
        : 0;
    let rightOffset =
      currentOffset + this.props.board.getBoardPinsTake >=
      this.props.board.getBoardPins.count
        ? this.props.board.getBoardPins.count
        : currentOffset + this.props.board.getBoardPinsTake;

    return (
      <div className="pagination">
        <i
          className={leftButtonsClasses}
          onClick={e => {
            e.preventDefault;

            if (hasPrew) {
              this.props.history.push(
                "/board/" + this.props.match.params.id + "/" + leftOffset
              );

              let boardId = +this.props.match.params.id;

              this.props.getBoardPins(
                boardId,
                leftOffset,
                this.props.board.getBoardPinsTake
              );
            }
          }}
        >
          chevron_left
        </i>
        <span>
          {Math.ceil(currentOffset / this.props.board.getBoardPinsTake) + 1}
          {" from "}
          {this.props.board.getBoardPins &&
            Math.ceil(
              this.props.board.getBoardPins.count /
                this.props.board.getBoardPinsTake
            )}
        </span>
        <i
          className={rightButtonsClasses}
          onClick={e => {
            e.preventDefault;

            if (hasNext) {
              this.props.history.push(
                "/board/" + this.props.match.params.id + "/" + rightOffset
              );

              let boardId = +this.props.match.params.id;

              this.props.getBoardPins(
                boardId,
                rightOffset,
                this.props.board.getBoardPinsTake
              );
            }
          }}
        >
          chevron_right
        </i>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              <h4 className="left-align">Board</h4>
              {this.props.board.getBoardLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )} 
              {this.props.board.getBoard && (
                <ul className="collection">
                  <Card
                    item={this.props.board.getBoard}
                    updateBoard={this.props.updateBoard}
                    deleteBoard={this.props.deleteBoard}
                    loading={this.props.board.updateBoardLoading}
                    error={this.props.board.updateBoardError}
                    typeOfElement="board"
                    cardType="full"
                  />
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              <h4 className="left-align">Pins on board</h4>
              {this.props.board.getBoardPinsLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              <ul className="collection">
                {this.props.board.getBoardPins && this.renderPins()}
              </ul>
              {this.props.board.getBoardPins && this.renderPaginatorText()}
            </div>
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

const connectedBoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPage);
export { connectedBoardPage as BoardPage };
