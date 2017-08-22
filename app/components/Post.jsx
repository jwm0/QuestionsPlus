import React from 'react';
import CommentList from 'CommentList';
import Question from 'Question';
import {connect} from 'react-redux';

export class Post extends React.Component {
  render() {
    var {questions, questionID} = this.props;
    var question = questions.find((question)=>{
      return questionID == question.id;
    });

    var renderQuestion = () => {
      return (
        <div>
          <Question {...question} isPost={true}/>
          <div className="button-label"><button className="button-custom" style={{margin:0}}>GIVE new answer</button></div>
        </div>
      )
    }
    return (
      <div>
        {renderQuestion()}
        <div className="text-center">{question.users.length} peers already answered {question.author}</div>
        <CommentList users={question.users}/>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Post);
