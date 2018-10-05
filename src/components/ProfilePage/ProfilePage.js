import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { profileActions } from "../../actions";
import "./../../static/styles/ProfilePage.css";
import { UserFields } from "./UserFields";
import { ChangePasswordForm } from "./ChangePasswordForm";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      mode: "profile"
      // mode: "changePassword"
    };
  }

  componentDidMount() {
  
    this.props.dataAboutUser();
  }

  renderProfile() {
    const { account } = this.props;
  
    return (
      <div className="col s12 m8 l10 legacy-content">
        <div className="container card-panel s12">
          <h4 className="left-align card-title card__title">Profile</h4>
          {account.profileGetLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          {account.profileGetError && (
            <div className="row error--container">
              <div className="error error--text alert alert-info">
                {account.profileGetError.message}
              </div>
            </div>
          )}
          {account.profileGetObject && (
            <UserFields
              values={account.profileGetObject}
              editProfile={this.props.editProfile}
              loading={account.profileChangeLoading}
              error={account.profileChangeError}
            />
          )}
        </div>
      </div>
    );
  }

  renderChangePassword() {
    const { account } = this.props;

    return (
      <div className="col s12 m8 l10 legacy-content">
        <div className="container card-panel s12">
          <h4 className="left-align card-title card__title">Change password</h4>
          {account.passwordChangeLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          {account.passwordChangeError && (
            <div className="row error--container">
              <div className="error error--text alert alert-info">
                {account.passwordChangeError.message}
              </div>
            </div>
          )}
          {account.passwordChangeStatusText && (
            <div className="row ">
              <div className="">{account.passwordChangeStatusText}</div>
            </div>
          )}

          {
            <ChangePasswordForm
              changePassword={this.props.changePassword}
              loading={account.passwordChangeLoading}
              error={account.passwordChangeError}
              // successMessage={account.passwordChangeStatusText}
            />
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col m8 offset-m2">
              <div className="  col s12 m4 l2 card-panel legacy-sidebar menu__item__container">
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
              </div>

              {this.state.mode == "profile" && this.renderProfile()}
              {this.state.mode == "changePassword" &&
                this.renderChangePassword()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { account } = state;

  return {
    account
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(profileActions, dispatch);
}

const connectedProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
export { connectedProfilePage as ProfilePage };
