import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { pinActions } from "../actions";
// import { userActions } from "../../actions";
// import "./../../static/styles/PinPage.css";
// import { UserFields } from "./UserFields";
class PinPage extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  componentWillMount() {
    // debugger;
    if (this.props.match.params.id != null) {
      let pinId = this.props.match.params.id;
      this.props.getPin(pinId);
    }

    // this.props.addPin("name", "description", "img", false);
  }

  render() {
    // debugger
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s8 offset-m2 m8 l9 legacy-content">
              {this.props.pin.pin && (
                <div className="container card-panel s12">
                  <h4 className="left-align card-title card__title">
                    {this.props.pin.pin.name}
                  </h4>
                  {JSON.stringify(this.props.pin.pin)}
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
  const { pin } = state;
  return {
    pin
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(pinActions, dispatch);
}

const connectedPinPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinPage);
export { connectedPinPage as PinPage };
