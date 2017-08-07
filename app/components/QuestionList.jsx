import React from 'react';
import Question from 'Question';
import QuestionAPI from 'QuestionAPI';
import {connect} from 'react-redux';

export class QuestionList extends React.Component {
  render () {
    var {questions, filter, searchText} = this.props;
    var renderQuestions = () => {
      if (questions.length == 0) {
        return (
          <p className="container__message">No questions</p>
        );
      }

      return QuestionAPI.filterQuestions(questions, searchText).map((question) => {
        return (
          <Question key={question.id} {...question}/>
        );
      });
    };

    return (
      <div>
        {renderQuestions()}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(QuestionList);
