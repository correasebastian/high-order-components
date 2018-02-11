import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { compose, flattenProp, withProps, lifecycle, branch, renderComponent } from 'recompose' ;


const User = ({ name, status }) =>
  <div className="User">{ name }—{ status }</div>;

const withUserData = lifecycle({
  componentDidMount() {
    fetchData().then(
      (users) => this.setState({ users }),
      (error) => this.setState({ error })
    );
  }
});

const UNAUTHENTICATED = 401;
const UNAUTHORIZED = 403;
const errorMsgs = {
  [UNAUTHENTICATED]: 'Not Authenticated!',
  [UNAUTHORIZED]: 'Not Authorized!',
};

const AuthError = ({ error }) =>
    <div className="Error">{ errorMsgs[error.statusCode] }</div>;

const NoUsersMessage = () =>
  <div>There are no users to display</div>;

const hasErrorCode = ({ error }) => error && error.statusCode;
const hasNoUsers = ({ users }) => users && users.length === 0;

const nonOptimalStates = (states) =>
  compose(...states.map(state =>
    branch(state.when, renderComponent(state.render))));

const enhance = compose(
  withUserData,
  nonOptimalStates([
    { when: hasErrorCode, render: AuthError },
    { when: hasNoUsers, render: NoUsersMessage }
  ])
);

const UserList = enhance(({ users, error }) =>
  <div className="UserList">
    { users && users.map((user, index) => <User key={index} {...user} />) }
  </div>
);

const App = () =>
  <div className="App">
    <UserList />
  </div>;


// Mock Service
const noUsers = [];
const users = [
  { name: "Tim", status: "active" },
  { name: "Bob", status: "active" },
  { name: "Joe", status: "inactive" },
  { name: "Jim", status: "pending" },
];
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject({ statusCode: UNAUTHENTICATED });
      // reject({ statusCode: UNAUTHORIZED })
      // resolve(noUsers);
      resolve(users);
    }, 100);
  });
}


export default App;
