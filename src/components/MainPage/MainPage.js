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
  }

  componentWillMount() {
    this.props.getMainPage(
      this.currentOffset(),
      this.props.pin.getMainPageTake
    );
  }

  renderPins() {
    return this.props.pin.getMainPage.items.map(pin => {
      return this.renderPin(pin);
    });
  }

  currentOffset() {
    return +this.props.match.params.offset || 0;
  }

  hasPrew() {
    return this.currentOffset() !== 0;
  }

  hasNext() {
    return (
      this.currentOffset() + this.props.pin.getMainPageTake <
        this.props.pin.getMainPage.count &&
      this.currentOffset() + this.props.pin.getMainPageTake !==
        this.props.pin.getMainPage.count
    );
  }

  leftOffset() {
    return this.currentOffset() - this.props.pin.getMainPageTake > 0
      ? this.currentOffset() - this.props.pin.getMainPageTake
      : 0;
  }

  rightOffset() {
    return this.currentOffset() + this.props.pin.getMainPageTake >=
      this.props.pin.getMainPage.count
      ? this.props.pin.getMainPage.count
      : this.currentOffset() + this.props.pin.getMainPageTake;
  }

  leftButtonsClasses() {
    let leftButtonsClasses =
      "material-icons circle green pagination__button waves-effect waves-light";
    if (!this.hasPrew()) {
      leftButtonsClasses += " pagination__button--disabled";
    }

    return leftButtonsClasses;
  }

  rightButtonsClasses() {
    let rightButtonsClasses =
      "material-icons circle green pagination__button waves-effect waves-light";
    if (!this.hasNext()) {
      rightButtonsClasses += " pagination__button--disabled";
    }

    return rightButtonsClasses;
  }

  paginatorText() {
    return (
      Math.ceil(this.currentOffset() / this.props.pin.getMainPageTake) +
      1 +
      " from " +
      Math.ceil(
        this.props.pin.getMainPage.count / this.props.pin.getMainPageTake
      )
    );
  }

  renderPaginator() {
    return (
      <div className="pagination">
        <i
          className={this.leftButtonsClasses()}
          onClick={e => {
            e.preventDefault;

            if (this.hasPrew()) {
              this.props.history.push("/" + this.leftOffset());

              this.props.getMainPage(
                this.leftOffset(),
                this.props.pin.getMainPageTake
              );
            }
          }}
        >
          chevron_left
        </i>
        <span>{this.props.pin.getMainPage && this.paginatorText()}</span>
        <i
          className={this.rightButtonsClasses()}
          onClick={e => {
            e.preventDefault;

            if (this.hasNext()) {
              this.props.history.push("/" + this.rightOffset());

              this.props.getMainPage(
                this.rightOffset(),
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
      <Card key={pin.id} item={pin} typeOfElement="pin" editable="false" />
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
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
              {this.props.pin.getMainPage && this.renderPaginator()}
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
