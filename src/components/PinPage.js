import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../actions";
import { Card } from "./Card";
import {
  parseJSON,
  processErrorResponse,
  dateInWordsToNow,
  renderError
} from "../utils/misc";
class PinPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.match.params.id != null) {
      let pinId = this.props.match.params.id;
      this.props.getPin(pinId);
      this.props.getBoardsWherePinNotSaved(pinId);
      this.props.getBoardsWherePinSaved(pinId);
    }
  }

  renderBoards() {
    return this.props.pin.GetPinBoards.map((board, i) => {
      return (
        <Card
          key={board.id}
          item={board}
          updateBoard={this.props.updateBoard}
          deleteBoard={this.props.deleteBoard}
          loading={this.props.board.updateBoardLoading}
          error={this.props.board.updateBoardError}
          objectWithErrorId={this.props.board.updateBoardId}
          typeOfElement="board"
          unpinAction={this.props.deletePinFromBoard}
          pinId={this.props.pin.pin.id}
        />
      );
    });
  }

  renderBoardsToSave() {
    return this.props.pin.GetPinAvaliableBoards.map((board, i) => {
      return (
        <Card
          key={board.id}
          item={board}
          updateBoard={this.props.updateBoard}
          deleteBoard={this.props.deleteBoard}
          loading={this.props.board.updateBoardLoading}
          error={this.props.board.updateBoardError}
          objectWithErrorId={this.props.board.updateBoardId}
          typeOfElement="board"
          pinAction={this.props.addPinToBoard}
          pinId={this.props.pin.pin.id}
        />
      );
    });
  }

  render() {
  
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.getPinLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.GetPinBoardsError &&
                renderError(this.props.pin.GetPinBoardsError)}
              <ul className="collection">
                {this.props.pin.pin && (
                  <Card
                    item={this.props.pin.pin}
                    updatePin={this.props.updatePin}
                    deletePin={this.props.deletePin}
                    loading={this.props.pin.updatePinLoading}
                    error={this.props.pin.updatePinError}
                    typeOfElement="pin"
                    cardType="full"
                  />
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.DeletePinFromBoardError &&
                renderError(this.props.pin.DeletePinFromBoardError)}
              {this.props.pin.DeletePinFromBoardLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.pin &&
                this.props.pin.GetPinBoards && (
                  <div>
                    <h4 className="left-align">Saved to</h4>
                    <ul className="collection">{this.renderBoards()}</ul>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {this.props.pin.AddPinToBoardError &&
                renderError(this.props.pin.AddPinToBoardError)}
              {this.props.pin.DeletePinFromBoardLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}

              {this.props.pin.pin &&
                this.props.pin.GetPinAvaliableBoards && (
                  <div>
                    <h4 className="left-align">Save to</h4>
                    <ul className="collection">{this.renderBoardsToSave()}</ul>
                  </div>
                )}
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

const connectedPinPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinPage);
export { connectedPinPage as PinPage };
