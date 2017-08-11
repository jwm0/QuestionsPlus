var uuid = require('node-uuid');
import moment from 'moment';

export var searchQuestionsReducer = (state='', action) =>{
  switch(action.type){
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
}

export var filterReducer = (state='my_shelf', action) =>{
  switch(action.type){
    case 'CHANGE_FILTER':
      return action.filter;
    default:
      return state;
  }
}

export var sortReducer = (state='recent', action) => {
  switch(action.type) {
    case 'SET_SORT':
      return action.sortBy;
    default:
      return state;
  }
}

export var questionsReducer = (state=[], action) => {
  switch(action.type){
    case 'ADD_QUESTION':
    return [
      ...state,
      {
        id: uuid(),
        author: action.author,
        title: action.title,
        text: action.text,
        score: 1,
        related: 0,
        peers: action.peers,
        conversations: 0,
        answered: action.answered,
        submitted: moment().unix(),
        users: action.users
      }
    ];
    case 'ADD_QUESTIONS':
      return [
        ...state,
        ...action.questions
      ];
    default:
      return state;
  }
}

export var usersReducer = (state=[], action) => {
  switch(action.type) {
    case 'NEW_USER':
      return [
        ...state,
        {
          // DEMO VALUES
          id: uuid(), // FETCH USER ID FROM DATABASE
          image: action.image, // FETCH PROFILE IMAGE FROM DATABASE
          name: action.name // FETCH USERNAME FROM DATABASE
        }
      ]
    default:
      return state;
  }
}
