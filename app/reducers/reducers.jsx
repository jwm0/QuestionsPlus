var uuid = require('node-uuid');

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
        peers: 0,
        related: 0,
        conversations: 0
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
