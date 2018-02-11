import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withReducer, withHandlers, compose, lifecycle } from "recompose";
import PropTypes from 'prop-types'


const configPromise = fetchConfiguration();

const withConfig = lifecycle({
  state: { config: {} },
  componentDidMount() {
    configPromise.then(config =>
      this.setState({ config }));
  }
});

const User = withConfig(({ name, status, config }) =>
  <div className="User">
    { name }
    { config.showStatus && '—' + status }
    { config.canDeleteUsers && <button>X</button> }
  </div>
);

const App = () =>
  <div>
    <User name="Tim" status="active" />
  </div>;


// Mock Configuration

const config = {
  showStatus: true,
  canDeleteUsers: true
}

function fetchConfiguration() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 300);
  });
}

export default App;
