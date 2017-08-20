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
      return (<Question {...question} isPost={true}/>)
    }
    return (
      <div>
        {renderQuestion()}
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
