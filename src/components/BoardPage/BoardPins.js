import React from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

export class BoardPins extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPins(pins) {
    // debugger
    return pins.map((pin, i) => {
      return this.renderPin(pin);
    });
  }

  renderPin(pin) {
    // debugger
    return (
      <li key={pin.id} className="collection-item avatar pin-content">
        <Link key={pin.id} to={"/pin/" + pin.id}>
          {pin.img == null ? (
            <i className="material-icons circle green">folder</i>
          ) : (
            <img src={pin.img} alt="" className="circle" />
          )}
          <div className="col m12">
            <span className="title">{pin.name}</span>
            {/* <p className="">{pin.description}</p> */}
            {/* <p className="">{pin.link}</p> */}
            <p className="">
              Last change{" "}
              {pin.modified
                ? distanceInWordsToNow(pin.modified)
                : distanceInWordsToNow(pin.created)}
            </p>
          </div>
        </Link>
        <div
          to="#!"
          className="secondary-content"
          onClick={e => {
            e.preventDefault;
            // debugger
            this.props.deletePin(pin.id);
          }}
        >
          <i className="material-icons">delete</i>
        </div>
      </li>
    );
  }

  render() {
    // debugger
    let { pins } = this.props;
    return <ul className="collection">{this.renderPins(pins)}</ul>;
  }
}
