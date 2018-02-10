import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const neverRender = (BaseComponent) =>
  class extends Component {

    shouldComponentUpdate() {
      return false
    }
    render() {
      return (<BaseComponent {...this.props} />)
    }
  }


const User = ({name}) =>(
  <div className='User'>
    {name}
  </div>
)


const User2 = neverRender(User)

const App = () =>(
  <div>
    <User name='Tim'/>
    <User2 name='Joe'/>
  </div>
)

export default App;
