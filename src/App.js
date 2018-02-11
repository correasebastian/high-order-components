import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withState } from "recompose";
import PropTypes from 'prop-types'


const StatusList = () => (
  <div className='StatusList'>
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>
);


const Status = withState('listShown', 'setListVisible', false)(
  ({ status,listShown, setListVisible  }) => (
    <div onClick={()=> setListVisible((x)=> !x)}>
      {status}
      {listShown && <StatusList />}
    </div>
  )
);

const Tooltip = withState('tooltipShown', 'setTooltipVisible', false)(
  ({ text, children, tooltipShown, setTooltipVisible }) => (
    <span>
      { tooltipShown && <div className='Tooltip'> {text} </div>}
      <span onMouseEnter={()=>setTooltipVisible(true)} onMouseLeave={()=>setTooltipVisible(false)}> 
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
