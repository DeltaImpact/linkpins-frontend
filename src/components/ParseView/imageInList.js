import React, { PropTypes } from "react";

// const propTypes = {
//   view: PropTypes.string.isRequired,
//   id: PropTypes.string,
//   name: PropTypes.string,
//   avatar: PropTypes.string,
//   sprite1: PropTypes.string,
//   weapon: PropTypes.string,
//   weakness: PropTypes.string
// };

class ImageInList extends React.Component {
  render() {
    const { view, id, url, selected } = this.props;
    // const { view, id, name, avatar, sprite1, weapon, weakness } = this.props;
    // const listClass = `list-item card ${view}`;
    // const style = { zIndex: 100 - this.props.index };
    // debugger;
    return (
      <li
        id={id}
        // className={listClass}
        //   style={style}
      >
        <div
        // onClick={this.props.clickHandler}
        >
          <img src={url} />
        </div>
      </li>
    );
  }
}

// imageInList.PropTypes = propTypes;

export default ImageInList;
