import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withState, withHandlers, compose } from "recompose";
import PropTypes from 'prop-types'


const StatusList = () => (
  <div className='StatusList'>
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>
);

const withToggle = compose(
  withState('toggleOn', 'toggle', false),
  withHandlers({
    show: ({ toggle /* from props */ }) => (e) => toggle(true),
    hide: ({ toggle /* from props */ }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle(current => !current)
  })
)


const Status = withToggle(
  ({ status,toggleOn, toggle  }) => (
    <div onClick={toggle}>
      {status}
      {toggleOn && <StatusList />}
    </div>
  )
);

const Tooltip = withToggle(
  ({ text, children, toggleOn, show, hide }) => (
    <span>
      { toggleOn && <div className='Tooltip'> {text} </div>}
      <span onMouseEnter={show} onMouseLeave={hide}> 
        {children} 
      </span>
    </span>
  )
)
 


const User = ({ name, status }) =>
  <div className="User">
    <Tooltip text="Cool Dude!">{ name }</Tooltip>—
    <Status status={ status }  />
  </div>;


const App = () =>(
  <div>
    <User name='Tim' status="active"/>
  </div>
)

export default App;
