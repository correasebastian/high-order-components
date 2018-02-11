import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { compose, renderComponent, branch, renderNothing } from 'recompose' ;


const User = ({ name, status }) =>
  <div className="User">{ name }—{ status }</div>;

const userIsNotActive = ({ status }) => status !== 'active';
const hideIfNotActive = branch(userIsNotActive, renderNothing);

const FeaturedUser = hideIfNotActive(({ name, status }) =>
  <div>
    <h3>Today's Featured User</h3>
    <User name={ name } status={ status } />
    <hr />
  </div>
);

const UserList = ({ users }) =>
  <div className="UserList">
    <h3>All Users</h3>
    { users && users.map((user, idx) => <User key={idx} {...user} />) }
  </div>;

const users = [
  { name: "Tim", status: "active" },
  { name: "Bob", status: "active" },
  { name: "Joe", status: "inactive" },
  { name: "Jim", status: "pending" },
];

const featured = users[getRandomInt(0, 3)];

const App = () =>
  <div className="App">
    <h2>User Management</h2>
    <hr />
    <FeaturedUser name={ featured.name } status={ featured.status } />
    <UserList users={ users } />
  </div>;



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default App;
