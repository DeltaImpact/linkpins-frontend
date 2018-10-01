import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import { BoardPin } from "./BoardPin";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { Card } from "../Card";

class CardFace extends React.Component {
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

    return (
        <li
          key={board.id}
          className="collection-item avatar pin-content board__card"
          onMouseEnter={() =>
            this.setState({
              isHovered: true
            })
          }
          onMouseLeave={() =>
            this.setState({
              isHovered: false
            })
          }
        >
          <div className="board__card__content">
            <div className="col m12">
              <Link to={link}>
                {board.img == null ? (
                  <i className="material-icons circle green">folder</i>
                ) : (
                  <img src={board.img} alt="" className="circle" />
                )}
                <span className="title board__card__text">{board.name}</span>
                <p className="board__card__text">{board.description}</p>
                {/* <p className="">{board.description}</p> */}
              </Link>
              {board.link && (
                <a href={board.link} className="">
                  <span className="board__misc board__card__text">
                    {board.link}
                  </span>
                </a>
              )}
  
              <p className="board__misc">
                Last change
                {board.modified
                  ? " " + this.dateInWordsToNow(board.modified)
                  : " " + this.dateInWordsToNow(board.created)}
              </p>
            </div>
          </div>
  
          {this.state.isHovered && (
            <div
              // to="#!"
              className="secondary-content"
            >
              <i
                className="material-icons board__card__button"
                onClick={e => {
                  e.preventDefault;
                  // debugger
                  this.setState({
                    editIsPrivateBoard: board.isPrivate,
                    editTitle: board.name,
                    editDescription: board.description,
                    editTitle_error_text: null,
                    disabled: false
                  });
                  this.setState({
                    editMode: true
                  });
                }}
              >
                edit
              </i>
              <i
                className="material-icons board__card__button"
                onClick={e => {
                  e.preventDefault;
                  if (this.props.deleteBoard) this.props.deleteBoard(board.id);
                  if (this.props.deletePin) this.props.deletePin(board.id);
                }}
              >
                delete
              </i>
            </div>
          )}
        </li>
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
