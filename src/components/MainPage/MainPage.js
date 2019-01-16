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

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentWillMount() {
    this.props.getMainPage();
    // if (this.props.match.params.id != null) {
    //   let boardId = this.props.match.params.id;
    //   this.props.getBoard(boardId);
    // }
  }

  renderPins() {
    return this.props.pin.getMainPage.map((pin, i) => {
      return this.renderPin(pin);
    });
  }

  renderPin(pin) {
    return (
      <Card
        key={pin.id}
        item={pin}
        // updatePin={this.props.updatePin}
        // deletePin={this.props.deletePin}
        // deletePin={this.props.deletePin}
        // loading={this.props.pin.updatePinLoading}
        // error={this.props.pin.updatePinError}
        typeOfElement="pin"
        editable = "false"
      />
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              {/* <h4 className="left-align">Pins on board</h4> */}
              <ul className="collection">
                {this.props.pin.getMainPage && this.renderPins()}
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
)(MainPage);
export { connectedBoardPage as MainPage };
