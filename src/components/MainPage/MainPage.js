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
    // debugger
    this.props.getMainPage(
      this.props.match.params.offset || 0,
      this.props.pin.getMainPageTake
    );
    // if (this.props.match.params.id != null) {
    //   let boardId = this.props.match.params.id;
    //   this.props.getBoard(boardId);
    // }
  }

  renderPins() {
    return this.props.pin.getMainPage.items.map((pin, i) => {
      return this.renderPin(pin);
    });
  }

  renderPaginatorText() {
    let currentOffset = +this.props.match.params.offset || 0;

    // let hasPrew = currentOffset - this.props.pin.getMainPageTake > 0;
    let hasPrew = currentOffset !== 0;
    let hasNext =
      currentOffset + this.props.pin.getMainPageTake <
        this.props.pin.getMainPage.count &&
      currentOffset + this.props.pin.getMainPageTake !==
        this.props.pin.getMainPage.count;

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
      currentOffset - this.props.pin.getMainPageTake > 0
        ? currentOffset - this.props.pin.getMainPageTake
        : 0;
    let rightOffset =
      currentOffset + this.props.pin.getMainPageTake >=
      this.props.pin.getMainPage.count
        ? this.props.pin.getMainPage.count
        : currentOffset + this.props.pin.getMainPageTake;

    return (
      <div className="pagination">
        <i
          className={leftButtonsClasses}
          onClick={e => {
            e.preventDefault;

            if (hasPrew) {
              this.props.history.push("/" + leftOffset);

              this.props.getMainPage(
                leftOffset,
                this.props.pin.getMainPageTake
              );
            }
          }}
        >
          chevron_left
        </i>
        <span>
          {Math.ceil(
            this.props.match.params.offset / this.props.pin.getMainPageTake
          ) + 1}
          {" from "}
          {this.props.pin.getMainPage &&
            Math.ceil(
              this.props.pin.getMainPage.count / this.props.pin.getMainPageTake
            )}
        </span>
        <i
          className={rightButtonsClasses}
          onClick={e => {
            e.preventDefault;

            if (hasNext) {
              this.props.history.push("/" + rightOffset);

              this.props.getMainPage(
                rightOffset,
                this.props.pin.getMainPageTake
              );
            }
          }}
        >
          chevron_right
        </i>
      </div>
    );
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
        editable="false"
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
              {this.props.pin.getMainPageLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              {this.props.pin.getMainPageError && (
                <div className="row error--container">
                  <div className="error error--text alert alert-info">
                    {this.props.pin.getMainPageError.message}
                  </div>
                </div>
              )}
              <ul className="collection">
                {this.props.pin.getMainPage && this.renderPins()}
              </ul>
              {this.props.pin.getMainPage && this.renderPaginatorText()}
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
