import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../actions";
import "./../../static/styles/ProfilePage.css";
import { UserFields } from "./UserFields";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentDidMount() {
    this.props.dispatch(userActions.data_about_user());
  }

  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m8 offset-m2">
            <div className="col s12 m4 l3 card-panel legacy-sidebar">
              <div className="card-content">
                <h6 className="left-align top-margin-0">Profile</h6>
              </div>
            </div>
            <div className="col s12 m8 l9 legacy-content">
              <div className="container card-panel s12">
                <h4 className="left-align">Profile</h4>
                {data.loading && (
                  <div className="progress">
                    <div className="indeterminate" />
                  </div>
                )}
                {data.error && (
                  <div className="row error-container">
                    <div className="error error-text alert alert-info">
                      {data.error.message}
                    </div>
                  </div>
                )}
                {data.userProfile && <UserFields values={data.userProfile} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    r;
  }
}

function mapStateToProps(state) {
  const { data, auth } = state;
  return {
    data,
    auth
  };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
