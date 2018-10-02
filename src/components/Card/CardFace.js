import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataActions, boardActions, pinActions } from "../../actions";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

export class CardFace extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      isHovered: false,
      editMode: false,
      editTitle: "",
      editDescription: "",
      editIsPrivateBoard: null,
      editTitle_error_text: null,
      disabled: false,
      contentType: null
      // editTitle_error_text: null,
    };
  }

  handleHover() {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }
  //   componentWillMount() {
  //     // debugger;
  //     if (this.props.match.params.id != null) {
  //       let boardId = this.props.match.params.id;
  //       this.props.getBoard(boardId);
  //     }
  //   }

  ConvertUTCTimeToLocalTime(UTCDateString) {
    var convertLocalTime = new Date(UTCDateString);

    var hourOffset = convertLocalTime.getTimezoneOffset() / 60;

    convertLocalTime.setHours(convertLocalTime.getHours() - hourOffset);

    return convertLocalTime;
  }

  dateInWordsToNow(date) {
    return distanceInWordsToNow(this.ConvertUTCTimeToLocalTime(date));
  }

  render() {
    const { values } = this.props;
    let link;
    if (this.props.type == "board") {
      link = "/board/" + values.id;
    }

    if (this.props.type == "pin") {
      link = "/pin/" + values.id;
    }

    // const { account } = this.props;
    return (
      <li
        key={values.id}
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
              {values.img == null ? (
                <i className="material-icons circle green">folder</i>
              ) : (
                <img src={values.img} alt="" className="circle" />
              )}
              <span className="title board__card__text">{values.name}</span>
              <p className="board__card__text">{values.description}</p>
              {/* <p className="">{board.description}</p> */}
            </Link>
            {values.link && (
              <a href={values.link} className="">
                <span className="board__misc board__card__text">
                  {values.link}
                </span>
              </a>
            )}

            <p className="board__misc">
              Last change
              {values.modified
                ? " " + this.dateInWordsToNow(values.modified)
                : " " + this.dateInWordsToNow(values.created)}
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
                debugger;
                this.props.isEditMode = true;
                // this.setState({
                //   editIsPrivateBoard: values.isPrivate,
                //   editTitle: values.name,
                //   editDescription: values.description,
                //   editTitle_error_text: null,
                //   disabled: false
                // });
                // this.setState({
                //   editMode: true
                // });
              }}
            >
              edit
            </i>
            <i
              className="material-icons board__card__button"
              onClick={e => {
                e.preventDefault;
                if (this.props.deleteBoard) this.props.deleteBoard(values.id);
                if (this.props.deletePin) this.props.deletePin(values.id);
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

// function mapStateToProps(state) {
//   const { board, pin } = state;
//   return {
//     board,
//     pin
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     { ...dataActions, ...boardActions, ...pinActions },
//     dispatch
//   );
// }

// const connectedBoardPage = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CardFace);
// export { connectedBoardPage as CardFace };
