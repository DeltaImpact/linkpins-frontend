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

        {/* <div className="sidenav-overlay"></div>
        display: block; opacity: 1;
        display: none; opacity: 0; */}
        
        <div className="page">{this.props.children}</div>
      </div>
    );
  }
}
