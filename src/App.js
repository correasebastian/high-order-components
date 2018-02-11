import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { compose, flattenProp, withProps } from 'recompose' ;
const { connect } = ReactRedux();

const mapStateToProps = (state) => ({ user: state.user });

const enhance = compose(
  connect(mapStateToProps),
  flattenProp('user')
);

const User = enhance(({ name, status }) =>
  <div className="User"> { name } - { status } </div>
);

const App = () =>
  <div className="App">
    <User />
  </div>;



// Mock Implemenation of ReactRedux connect
function ReactRedux() {
  const state = {
    user: { name: 'Tim', status: 'active' }
  };

  return {
    connect: (map) => withProps(map(state))
  }
}
export default App;
