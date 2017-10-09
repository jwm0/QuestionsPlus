import React from 'react';
import CommentList from 'CommentList';
import Question from 'Question';
import Nav from 'Nav';
import {connect} from 'react-redux';

export class Post extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }
  render() {
    var {questions, users, comments} = this.props;
    // Get question id from url
    var path = window.location.href.split("/");
    path = path[path.length - 2];

    // Check if questions exists
    var questionID = questions.allIDs.find((question)=>{
      return question == path;
    });
    if (questionID === undefined) {
      return (
        <div>
          <h1>404: QUESTION NOT FOUND</h1>
        </div>
      )
    }

    var commentIDs = questions.byID[questionID].comments;
    var commentObjects = [];
    for (var i=0; i<commentIDs.length; i++){
      commentObjects.push(comments.byID[commentIDs[i]]);
      try {
        commentObjects[i].image = users.byID[commentObjects[i].author].image;
        commentObjects[i].authorName = users.byID[commentObjects[i].author].name;
      } catch (e) {
        commentObjects[i].image = null;
        commentObjects[i].authorName = 'Anonymous';
      }
    }

    var peer = (()=>{if(questions.byID[questionID].comments.length==1) return "peer"
    else return "peers"})();

    var renderQuestion = () => {
      return (
        <div>
          <Question {...questions.byID[questionID]} isPost={true}/>
        </div>
      )
    }
    return (
      <div>
        <Nav isMain={false}/>
        <div className="medium-centered large-11 medium-12" style={{backgroundColor:'#fafafa;min-height:80vh'}}>
          {renderQuestion()}
          <div className="text-center" style={{marginBottom:'1rem'}}>{questions.byID[questionID].comments.length} {peer} already answered {questions.byID[questionID].author}</div>
          <CommentList questionID={questionID} answeredComment={questions.byID[questionID].answered} comments={commentObjects}/>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Post);
