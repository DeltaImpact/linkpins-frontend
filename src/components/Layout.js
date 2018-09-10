import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

import './../static/styles/Layout.css';
// import { connect } from 'react-redux';

export class Layout extends Component {
  // displayName = Layout.name

  render() {
    return (
      <div>
        <div className="Header">
          <NavMenu />
        </div>
        <div className="page">
          {this.props.children}
        </div>
      </div>
    );
  }
}