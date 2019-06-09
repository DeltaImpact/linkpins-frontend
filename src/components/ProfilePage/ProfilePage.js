import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { profileActions } from "../../actions";
import { boardActions } from "../../actions";
import "./../../static/styles/ProfilePage.css";
import { UserFields } from "./UserFields";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { Card } from "../Card/Card";
import { BoardsContainer } from "../BoardsContainer";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      mode: "profile"
      // mode: "changePassword"
    };
  }

  componentWillMount() {
    if (this.props.match.params.nickname != null) {
      let profileNickname = this.props.match.params.nickname;
      this.props.dataAboutUser(profileNickname);
      // debugger
      // this.props.getBoards(profileNickname);
      // this.props.getBoard(boardId);
    }
  }

  renderProfile(user) {
    return (
      <Card
        key={user.id}
        item={user}
        // updateBoard={this.props.updateBoard}
        // deleteBoard={this.props.deleteBoard}
        // loading={this.props.board.updateBoardLoading}
        // error={this.props.board.updateBoardError}
        // objectWithErrorId={this.props.board.updateBoardId}
        typeOfElement="UserCard"
      />
    );
  }

  render() {
    // debugger
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col m8 offset-m2">
              {this.props.account.profileGetLoading && (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              )}
              <ul className="collection">
                {this.props.account.profileGetObject &&
                  this.renderProfile(this.props.account.profileGetObject)}
              </ul>
            </div>
          </div>
        </div>
        {this.props.match.params.nickname && (
          <BoardsContainer UserNickname={this.props.match.params.nickname} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { account, board } = state;

  return {
    account,
    board
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...profileActions, ...boardActions }, dispatch);
}

const connectedProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
export { connectedProfilePage as ProfilePage };
