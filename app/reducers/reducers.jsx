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

export var filterReducer = (state='all', action) =>{
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
          related: Math.floor((Math.random() * 10) + 1),
          peers: action.peers,
          conversations: Math.floor((Math.random() * 10) + 1),
          answered: action.answered,
          follow: false,
          submitted: moment().unix(),
          users: action.users,
          voteStatus: {upvoted:false,downvoted:false},
          [uuid()]: {
            test: 'something'
          }
        }
      ];
    case 'ADD_QUESTIONS':
      return [
        ...state,
        ...action.questions
      ];
    case 'TRIGGER_FOLLOW':
      return state.map((question)=>{
        if (question.id == action.id) {
          return {
            ...question,
            follow: !question.follow
          }
        }
        return question;
      });
    case 'VOTE':
      return state.map((question)=>{
        question.users = question.users.map((user)=>{
                if (user.id == action.id) {
                  return {
                      ...user,
                      voteStatus: action.voteStatus,
                      score: action.score
                    }
                  }
                  return user;
                }
        );
        if (question.id == action.id) {
          return {
                  ...question,
                  voteStatus: action.voteStatus,
                  score: action.score
                }
              }
              return question;
            });
    case 'VOTE2':
      var updated = false;
      for (var i = 0; i < state.length; i++) {
          if (state[i].id === action.id) {
              state[i].score = action.score;
              break;
          }
          for (var j = 0; j < state[i].users.length; j++) {
              if (state[i].users[j].id === action.id) {
                  state[i].users[j].score = action.score;
                  updated = true;
                  break;
              }
          }
          if (updated) { break; }
      }
      return state;
    case 'VOTE3':
      for (var i = 0; i< state.length; i++) {
        if (state[i].id === action.superID) {
          if (state[i].id === action.id) {
              state[i].score = action.score;
              break;
          }
          for (var j = 0; j < state[i].users.length; j++) {
              if (state[i].users[j].id === action.id) {
                  state[i].users[j].score = action.score;
                  updated = true;
                  break;
              }
          }
        }
        if (updated) { break; }
      }
      return state;
    default:
      return state;
  }
}

export var usersReducer = (state={ byID: {}, allIDs: [] }, action) => {
  switch(action.type) {
    case 'ADD_USER':
      var id = uuid();
      return {
        byID: {
          ...state.byID,
          [id]: {
            // DEMO VALUES
            id,
            image: action.image,
            name: action.name
          }
        },
        allIDs: [
          ...state.allIDs,
          id
        ]
      }
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
    case 'LOAD_USERS':
      return {
        ...action.users
      }
    default:
      return state;
  }
}

export var commentReducer = (state={ byID: {}, allIDs: [] }, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      var id = uuid();
      return {
        byID: {
          ...state.byID,
          [id]: {
            id,
            author: action.user,
            text: action.text
          }
        },
        allIDs: [
          ...state.allIDs,
          id
        ]
      }
    default:
      return state;
  }
}

export var modalReducer = (state={showModal:false, user: "Anonymous", image: "url"}, action) => {
  switch(action.type) {
    case 'OPEN_MODAL':
      return {
        showModal: true,
        user: action.user,
        image: action.image
      };
    case 'HIDE_MODAL':
      return {
        showModal: false
      };
    default:
      return state;
  }
}

export var questionIDReducer = (state = null, action)=>{
  switch(action.type) {
    case 'SET_CURRENT_QUESTION':
      return action.id;
    default:
      return state;
  }
}
