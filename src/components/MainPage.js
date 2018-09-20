import React from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class MainPage extends React.Component {
  componentDidMount() {
    // debugger;
    this.props.getBoards();
    // this.props.addBoard("name", "description", "img", false);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m8 offset-m2">
            <h4 className="left-align">Pins</h4>

            <ul className="collection">
              <li className="collection-item avatar pin-content">
                {/* <div className="col m2"> */}
                <i className="material-icons circle green">insert_chart</i>
                {/* </div> */}
                <div className="col m12">
                  <span className="title">Title</span>
                  <p className="">First Line</p>
                </div>
                {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
              </li>

              <li className="collection-item avatar pin-content">
                {/* <div className="col m2"> */}
                <i className="material-icons circle green">insert_chart</i>
                {/* </div> */}
                <div className="col m12">
                  <span className="title">Title</span>
                  <p className="">First Line</p>
                </div>
                {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
              </li>

              <li className="collection-item avatar pin-content">
                {/* <div className="col m2"> */}
                <i className="material-icons circle green">insert_chart</i>
                {/* </div> */}
                <div className="col m12">
                  <span className="title">Title</span>
                  <p className="">First Line</p>
                </div>
                {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      // <div>
      //     something

      // </div>
    );
  }
}

function mapStateToProps(state) {
  const { board } = state;
  return {
    board
  };
}

import { boardActions } from "../actions";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(boardActions, dispatch);
}

const connectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
export { connectedMainPage as MainPage };
