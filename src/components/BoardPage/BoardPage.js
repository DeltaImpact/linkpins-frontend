import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { boardActions } from "../../actions";
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
    // debugger
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
                  {JSON.stringify(this.props.board.getBoard)}
                  {/* <p>{this.props.match.params.id}</p> */}
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
  const { board } = state;
  return {
    board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(boardActions, dispatch);
}

const connectedBoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardPage);
export { connectedBoardPage as BoardPage };
