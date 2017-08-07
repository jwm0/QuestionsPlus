import * as redux from 'redux';
var {searchQuestionsReducer, filterReducer, questionsReducer} = require('reducers');
import thunk from 'redux-thunk';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    filter: filterReducer,
    searchText: searchQuestionsReducer,
    questions: questionsReducer
  })
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
