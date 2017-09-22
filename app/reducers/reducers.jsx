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

export var questionsReducer = (state={ byID: {}, allIDs: [] }, action) => {
  switch(action.type){
    case 'ADD_QUESTION2':
      var id = uuid();
      return {
        byID: {
          ...state.byID,
          [action.id]: {
            id: action.id,
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
            comments: []
          }
        },
        allIDs: [
          ...state.allIDs,
          action.id
        ]
      }
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
          comments: action.comments,
          voteStatus: {upvoted:false,downvoted:false}
        }
      ];
    case 'ADD_QUESTIONS':
      return {
        ...action.questions
      }
    case 'ADD_COMMENT':
      return {
        byID: {
          ...state.byID,
          [action.questionid]: {
            ...state.byID[action.questionid],
            comments: [
              ...state.byID[action.questionid].comments,
              action.id
            ]
          }
        },
        allIDs: [...state.allIDs]
      }
    case 'TRIGGER_FOLLOW':
      return {
        byID: {
          ...state.byID,
          [action.id]: {
            ...state.byID[action.id],
            follow: !state.byID[action.id].follow
          }
        },
        allIDs: [...state.allIDs]
      }
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
    case 'VOTE4':
      return {
        byID: {
          ...state.byID,
          [action.id]: {
            ...state.byID[action.id],
            score: action.score
          }
        },
        allIDs: [...state.allIDs]
      }
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
      return {
        byID: {
          ...state.byID,
          [action.id]: {
            id: action.id,
            author: action.user,
            text: action.text,
            score: 1
          }
        },
        allIDs: [
          ...state.allIDs,
          action.id
        ]
      }
    case 'LOAD_COMMENTS':
      return {
        ...action.comments
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
