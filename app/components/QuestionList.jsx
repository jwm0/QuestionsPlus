import React from 'react';
import Question from 'Question';
import QuestionAPI from 'QuestionAPI';
import {connect} from 'react-redux';

// global variables
//var size = 3; // size of components to be displayed inside the list

export class QuestionList extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 3
    }
  }
  handleClick(){
    if (this.state.size<this.props.questions.length) {
      this.setState({
        size: this.state.size+3
      });
    }
  }
  render () {
    var {questions, filter, searchText, sortBy} = this.props;
    var {size} = this.state;

    var renderQuestions = () => {
      if (questions.length == 0) {
        return (
          <p className="center">No questions</p>
        );
      }
      return QuestionAPI.filterQuestions(questions, searchText, sortBy).slice(0, size).map((question) => {
        return (
          <Question key={question.id} {...question}/>
        );
      });
    };
    var renderMoreQuestionsButton = () => {
      if(size<questions.length){
      return (
        <div className="small-4 callout centered" onClick={this.handleClick.bind(this)}>
          <h2>Click for more</h2>
        </div>
      )
    }
    }

    return (
      <div>
        {renderQuestions()}
        {renderMoreQuestionsButton()}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(QuestionList);
