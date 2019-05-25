import React, { PropTypes } from "react";

class ImageInList extends React.Component {
  render() {
    const { view, id, url, selected } = this.props;
    return (
      <li id={id}>
        <div>
          <img src={url} />
        </div>
      </li>
    );
  }
}

export default ImageInList;
