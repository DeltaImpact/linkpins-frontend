import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { profileActions } from "../../actions";
import { chatActions } from "../../actions";
import "./../../static/styles/ProfilePage.css";
import { UserFields } from "./UserFields";
import { ChangePasswordForm } from "./ChangePasswordForm";

class DialogsPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      // mode: "profile"
      // mode: "changePassword"
    };
  }

  componentDidMount() {
    this.props.getDialogs();

  }

  renderDialogs() {
    const { chat } = this.props;
    // debugger
    return (
      // <div className="col s12 m8 l10 legacy-content">
        <div className="card-panel s12 pm__menu">
          <h4 className="left-align card-title card__title">Dialogs</h4>
          {chat.GetDialogsLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          {chat.GetDialogsError && (
            <div className="row error--container">
              <div className="error error--text alert alert-info">
                {chat.GetDialogsError.message}
              </div>
            </div>
          )}
        </div>
      // </div>
    );
  }

  renderDialog() {
    let userNickname = this.props.history.location.pathname.replace("/messages/", "");
    
    const { chat } = this.props;
    // debugger
    return (
      // <div className="col s12 m8 l10 legacy-content">
        <div className="card-panel s12 pm__menu">
          {/* <h4 className="left-align card-title card__title">Dialog</h4> */}
          <h4 className="left-align card-title card__title">{this.props.history.location.pathname.replace("/messages/", "")}</h4>
          {chat.GetDialogsLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          {chat.GetDialogsError && (
            <div className="row error--container">
              <div className="error error--text alert alert-info">
                {chat.GetDialogsError.message}
              </div>
            </div>
          )}
        </div>
      // </div>
    );
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col m4">
              {/* <div className="  col s12 m4 l2 card-panel legacy-sidebar menu__item__container">
                <div className="menu__item__container">
                  <div
                    className={
                      this.state.mode == "profile"
                        ? "menu__item s12 card-content list__title  menu__item--active "
                        : "menu__item s12 card-content list__title"
                    }
                    onClick={e => {
                      this.setState({
                        mode: "profile"
                      });
                    }}
                  >
                    <h6 className="s12 left-align list__item menu__item__text">
                      Profile
                    </h6>
                  </div>
                  <div
                    className={
                      this.state.mode == "changePassword"
                        ? "s12 card-content list__title menu__item menu__item--active"
                        : "s12 card-content list__title menu__item"
                    }
                    onClick={e => {
                      this.setState({
                        mode: "changePassword"
                      });
                    }}
                  >
                    <h6 className="left-align list__item menu__item__text">
                      Change Password
                    </h6>
                  </div>
                </div>
              </div> */}

              {this.renderDialogs()}
              {/* {this.state.mode == "changePassword" &&
                this.renderChangePassword()} */}
            </div>

            <div className="col m8">{this.renderDialog()}</div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { account, chat } = state;
  // debugger;
  return {
    account,
    chat
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(chatActions, dispatch);
}

const connectedDialogsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogsPage);
export { connectedDialogsPage as DialogsPage };
