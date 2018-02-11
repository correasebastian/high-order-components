import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withReducer, withHandlers, compose } from "recompose";
import PropTypes from 'prop-types'



export const SHOW = 'SHOW';
export const HIDE = 'HIDE';
export const TOGGLE = 'TOGGLE';

export const showAction = () => ({
  type: SHOW,
})

export const hideAction = () => ({
  type: HIDE,
})
export const toggleAction = () => ({
  type: TOGGLE,
})


const StatusList = () => (
  <div className='StatusList'>
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>
);

const withToggle = compose(
  withReducer( 'toggleOn', 'dispatch', (state, action) => {
      switch (action.type) {
        case SHOW:
          return true
        case HIDE:
          return false
        case TOGGLE:
          return !state
        default:
          return state;
      }
    },
    false),
  withHandlers({
    show: ({
      dispatch /* from props */
    }) => (e) => dispatch(showAction()),
    hide: ({
      dispatch /* from props */
    }) => (e) => dispatch(hideAction()),
    toggle: ({
      dispatch
    }) => (e) => dispatch(toggleAction())
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
