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
    case 'ADD_QUESTION':
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
            comments: []
          }
        },
        allIDs: [
          ...state.allIDs,
          action.id
        ]
      }
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
    case 'SET_ANSWERED':
      return {
        byID: {
          ...state.byID,
          [action.questionID]: {
            ...state.byID[action.questionID],
            answered: action.commentID,
            comments: [
              ...new Set([action.commentID, ...state.byID[action.questionID].comments])
            ]
          }
        },
        allIDs: [...state.allIDs]
      }
    case 'VOTE':
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
      return {
        byID: {
          ...state.byID,
          [action.id]: {
            // DEMO VALUES
            id: action.id,
            image: action.image,
            name: action.name
          }
        },
        allIDs: [
          ...state.allIDs,
          action.id
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
            score: 1,
            answered: false,
            children: []
          }
        },
        allIDs: [
          ...state.allIDs,
          action.id
        ]
      }
    case 'ADD_CHILD_COMMENT':
      return {
          byID: {
            ...state.byID,
            [action.childID]: {
              id: action.childID,
              author: action.user,
              text: action.text,
              score: 1
            },
            [action.parentID]: {
              ...state.byID[action.parentID],
              children: [...state.byID[action.parentID].children, action.childID]
            }
          },
          allIDs: [...state.allIDs, action.childID]
        }
    case 'LOAD_COMMENTS':
      return {
        ...action.comments
      }
    default:
      return state;
  }
}

export var modalReducer = (state={showModal:false, user: "Anonymous", image: "../img/blank.png"}, action) => {
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

export var authReducer = (state={}, action) => {
 switch (action.type) {
   case 'LOGIN':
    return {
      uid: action.uid
    };
   case 'LOGOUT':
    return {};
   default:
    return state;
 }
}
