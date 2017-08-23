import React from 'react';
import CommentList from 'CommentList';
import Question from 'Question';
import Nav from 'Nav';
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
        <Nav isMain={false}/>
        <div className="medium-centered large-11 medium-12" style={{backgroundColor:'#fafafa;min-height:80vh'}}>
          {renderQuestion()}
          <div className="text-center" style={{marginBottom:'1rem'}}>{question.users.length} peer already answered {question.author}</div>
          <CommentList users={question.users}/>
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
