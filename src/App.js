import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setPropTypes, setDisplayName, compose } from "recompose";
import PropTypes from 'prop-types'


const enhancer = compose(
  setDisplayName('UserX'),
  setPropTypes({
    name:PropTypes.string.isRequired
  })
)




const User = ({name}) =>(
  <div className='User'>
    {name}
  </div>
)


const User2 = enhancer(User)

const App = () =>(
  <div>
    <User name='Tim'/>
    <User2 name='Joe'/>
  </div>
)

export default App;
