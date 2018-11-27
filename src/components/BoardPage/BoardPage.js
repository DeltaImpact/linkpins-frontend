import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { BoardPin } from "./BoardPin";
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
      let boardId = this.props.match.params.id;
      this.props.getBoard(boardId);
    }
  }

  renderPins() {
    return this.props.board.getBoard.pins.map((pin, i) => {
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
              <ul className="collection">
                {this.props.board.getBoard && this.renderPins()}
              </ul>
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
