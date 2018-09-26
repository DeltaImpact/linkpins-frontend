import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { BoardPins } from "./BoardPins";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
// import { userActions } from "../../actions";
// import "./../../static/styles/BoardPage.css";
// import { UserFields } from "./UserFields";
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

    // this.props.addBoard("name", "description", "img", false);
  }

  render() {
     
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s8 offset-m2 m8 l9 legacy-content">
              {this.props.board.getBoard && (
                <div className="container card-panel s12">
                  <h4 className="left-align card-title card__title">
                    {this.props.board.getBoard.name}
                  </h4>
                  <h6 className="left-align card-title card__title">
                    {this.props.board.getBoard.description}
                  </h6>
                  <h6 className="left-align card-title card__title">
                    modified:
                    {distanceInWordsToNow(this.props.board.getBoard.modified)}
                  </h6>
                  <h6 className="left-align card-title card__title">
                    created:
                    {distanceInWordsToNow(this.props.board.getBoard.created)}
                  </h6>
                  <h6 className="left-align card-title card__title">
                    isOwner:
                    {this.props.board.getBoard.isOwner + []}
                  </h6>
                  <h6 className="left-align card-title card__title">
                    isPrivate:
                    {this.props.board.getBoard.isPrivate + []}
                  </h6>
                  {/* {JSON.stringify(this.props.board.getBoard)} */}
                  {/* <p>{this.props.match.params.id}</p> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.props.board.getBoard && (
              //  console.log(this.props.board.getBoard.pins)
              <BoardPins
                pins={this.props.board.getBoard.pins}
                deletePin={this.props.deletePin}
              />
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

const connectedBoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPage);
export { connectedBoardPage as BoardPage };
