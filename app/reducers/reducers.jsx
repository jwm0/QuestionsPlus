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
          users: action.users
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
    case 'UPVOTE':
      return state.map((question)=>{
        question.users.map((user)=>{
          if (user.id == action.id) {
            return {
              ...user,
              voteStatus: action.voteStatus,
              score: ++user.score
            }
          }
        });
        if (question.id == action.id) {
          return {
            ...question,
            voteStatus: action.voteStatus,
            score: ((question.voteStatus.upvoted) ? ++question.score : --question.score)
          }
        }
        return question;
      });
    case 'DOWNVOTE':
      return state.map((question)=>{
        question.users.map((user)=>{
          if (user.id == action.id) {
            return {
              ...user,
              score: --user.score,
              voteStatus: action.voteStatus
            }
          }
        });
        if (question.id == action.id) {
          return {
            ...question,
            voteStatus: action.voteStatus,
            score: ((question.voteStatus.downvoted) ? --question.score : ++question.score)
          }
        }
        return question;
      });
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
