import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { BoardPin } from "./BoardPin";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Card } from "../Card";

class CardDelete extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

//   componentWillMount() {
//     // debugger;
//     if (this.props.match.params.id != null) {
//       let boardId = this.props.match.params.id;
//       this.props.getBoard(boardId);
//     }
//   }

  render() {
    let link;
    if (this.state.type == "board") {
      link = "/board/" + board.id;
    }

    if (this.state.type == "pin") {
      link = "/pin/" + board.id;
    }

    render <div/>;
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
