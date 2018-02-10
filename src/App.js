import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const hoc = (overrideProps) =>
  (BaseComponent) =>
    (props)=>( <BaseComponent {...props} {...overrideProps}/> )

const User = ({name}) =>(
  <div className='User'>
    {name}
  </div>
)


const User2 = hoc({name:'BOB'})(User)

const App = () =>(
  <div>
    <User name='Tim'/>
    <User2 name='Joe'/>
  </div>
)

export default App;
