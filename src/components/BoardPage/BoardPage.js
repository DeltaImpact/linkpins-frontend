import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { BoardPin } from "./BoardPin";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentWillMount() {
    // debugger;
    if (this.props.match.params.id != null) {
      let boardId = this.props.match.params.id;
      this.props.getBoard(boardId);
    }
  }

  renderPins() {
    // debugger;
    return this.props.board.getBoard.pins.map((pin, i) => {
      return (
        <BoardPin
          key={pin.id}
          pin={pin}
          // updatePin={this.props.updatePin}
          deletePin={this.props.deletePin}
          // updatePinLoading={this.props.board.updatePinLoading}
        />
      );
    });
  }

  render() {
    // if (this.props.board.getBoard) {
    //   let asd = distanceInWordsToNow(this.props.board.getBoard.modified);
    //   debugger;
    // }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l10 offset-l2 m8 l9 legacy-content">
              {this.props.board.getBoard && (
                <div className="container card-panel s12">
                  <h4 className="left-align card-title card__title tooltip">
                    {this.props.board.getBoard.isPrivate ? (
                      <i className="material-icons">lock</i>
                    ) : null}
                    {this.props.board.getBoard.name}
                    {this.props.board.getBoard.isPrivate ? (
                      <p className="tooltiptext tooltip-bottom">
                        This is private board
                      </p>
                    ) : null}
                  </h4>
                  <h6 className="left-align card-title card__title">
                    {this.props.board.getBoard.description}
                  </h6>

                  <div className="left-align board__page__misc">
                    <h6 className="left-align card-title card__title">
                      Modified:
                      {"  " + this.props.board.getBoard.modified != null
                        ? distanceInWordsToNow(
                            this.props.board.getBoard.modified
                          )
                        : " never"}
                    </h6>
                    <h6 className="left-align card-title card__title">
                      Created:
                      {" " +
                        distanceInWordsToNow(this.props.board.getBoard.created)}
                    </h6>
                    {/* <h6 className="left-align card-title card__title">
                      isOwner:
                      {this.props.board.getBoard.isOwner + []}
                    </h6> */}
                    {/* {JSON.stringify(this.props.board.getBoard)} */}
                    {/* <p>{this.props.match.params.id}</p> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col l8 offset-l2 m8 l9 legacy-content">
              <ul className="collection">
                {this.props.board.getBoard && this.renderPins()}
              </ul>
              {/* {this.props.board.getBoard && (
                //  console.log(this.props.board.getBoard.pins)
                <BoardPins
                  pins={this.props.board.getBoard.pins}
                  deletePin={this.props.deletePin}
                />
              )} */}
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
