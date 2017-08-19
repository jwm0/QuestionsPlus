import * as redux from 'redux';
var {searchQuestionsReducer, filterReducer, questionsReducer, sortReducer, usersReducer, modalReducer, questionIDReducer} = require('reducers');
import thunk from 'redux-thunk';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    filter: filterReducer,
    searchText: searchQuestionsReducer,
    sortBy: sortReducer,
    questions: questionsReducer,
    users: usersReducer,
    modal: modalReducer,
    questionID: questionIDReducer
  })
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
