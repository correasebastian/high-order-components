import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { compose, renderComponent, branch, renderNothing, withProps, componentFromProp } from 'recompose' ;


const Link = compose(
  withProps(({ type='a', to='#' }) =>
    type === 'a'
      ? { type, href: to }
      : { type, onClick(e) { window.location=to }})
)(componentFromProp('type'));

const App = () =>
  <div className="App">
    <a href="#/page1">Anchor Link</a>
    <button onClick={ ()=> window.location="#/page2" }>Button Link</button>
    <Link to="#/page1">Anchor Link</Link>
    <Link type="button" to="#/page2">Button Link</Link>
  </div>
  
export default App;
