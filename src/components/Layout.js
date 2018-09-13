import React, { Component } from "react";
import { NavMenu } from "./NavMenu";
import { RightSidebar } from "./RightSidebar";

import "./../static/styles/Layout.css";

export class Layout extends Component {
  render() {
    return (
      <div>
        <NavMenu />
        <RightSidebar />
        <div className="page">{this.props.children}</div>
      </div>
    );
  }
}
