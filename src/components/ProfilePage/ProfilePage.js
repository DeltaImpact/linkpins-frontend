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
      mode: "profile",
      // mode: "changePassword"
    };
  }

  componentDidMount() {
    // debugger
    this.props.dataAboutUser();
  }

  renderProfile() {
    const { profile } = this.props;
    // debugger
    return (
      <div className="col s12 m8 l10 legacy-content">
        <div className="container card-panel s12">
          <h4 className="left-align card-title card__title">Profile</h4>
          {profile.getProfileLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          {profile.getProfileError && (
            <div className="row error--container">
              <div className="error error--text alert alert-info">
                {profile.getProfileError.message}
              </div>
            </div>
          )}
          {profile.getProfileObject && (
            <UserFields values={profile.getProfileObject} editProfile={this.props.editProfile}/>
          )}
        </div>
      </div>
    );
  }

  renderChangePassword() {
    const { profile } = this.props;

    return (
      <div className="col s12 m8 l10 legacy-content">
        <div className="container card-panel s12">
          <h4 className="left-align card-title card__title">Change password</h4>
          {profile.passwordChangeLoading && (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          )}
          {profile.passwordChangeError && (
            <div className="row error--container">
              <div className="error error--text alert alert-info">
                {profile.passwordChangeError.message}
              </div>
            </div>
          )}

          {<ChangePasswordForm changePassword={this.props.changePassword}/>}
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
              <div className="col s12 m4 l2 card-panel legacy-sidebar">
                <div
                  className={
                    this.state.mode == "profile"
                      ? "s12 card-content list__title menu__item--active"
                      : "s12 card-content list__title"
                  }
                  onClick={e => {
                    this.setState({
                      mode: "profile"
                    });
                  }}
                >
                  <h6 className="s12 left-align list__item ">Profile</h6>
                </div>
                <div
                  className={
                    this.state.mode == "changePassword"
                      ? "s12 card-content list__title menu__item--active"
                      : "s12 card-content list__title"
                  }
                  onClick={e => {
                    this.setState({
                      mode: "changePassword"
                    });
                  }}
                >
                  <h6 className="left-align list__item">Change Password</h6>
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
  const { profile } = state;
  // debugger
  return {
    profile
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
