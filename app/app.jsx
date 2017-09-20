import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';

import Main from 'Main';
import QuestionList from 'QuestionList';
import Post from 'Post';
var actions = require('actions');
var store = require('configureStore').configure();
var QuestionAPI = require('QuestionAPI');

store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
  QuestionAPI.setQuestions(state.questions);
  QuestionAPI.setComments(state.comments);
});

// ==== DEMO ONLY ====
// Check if a user database exists, otherwise create a fake one
if ($.isEmptyObject(QuestionAPI.getUsers())) {
  store.dispatch(actions.createUserDatabase(6));
  // save to local storage
  QuestionAPI.createUserDatabase(store.getState().users);
}
// ==== DEMO ONLY ====

var users = QuestionAPI.getUsers();
var comments = QuestionAPI.getComments();
var initialQuestions = QuestionAPI.getQuestions();

// load question and users from local storage
store.dispatch(actions.addUsers(users));
store.dispatch(actions.addComments(comments));
store.dispatch(actions.addQuestions(initialQuestions));







// load foundation
$(document).foundation();

// app css
require('!style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="comments/:questionid" component={Post}/>
        <IndexRoute component={QuestionList}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
