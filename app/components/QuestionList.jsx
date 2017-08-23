import React from 'react';
import Question from 'Question';
import QuestionAPI from 'QuestionAPI';
import Nav from 'Nav';
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
    questions = QuestionAPI.filterQuestions(questions, searchText, sortBy, filter);

    var renderQuestions = () => {
      if (questions.length == 0) {
        return (
          <span className="text-center" style={{display:'block;padding-top:5rem'}}>
            <h1>whoops... nothing here</h1>
            <p><b>add or follow a question</b></p>
          </span>
        );
      }
      return questions.slice(0, size).map((question) => {
        return (
          <Question key={question.id} {...question}/>
        );
      });
    };
    var renderMoreQuestionsButton = () => {
      if(size<questions.length){
      return (
        <div className="large-8 medium-10 small-12 small-centered footerContainer" onClick={this.handleClick.bind(this)}>
          <h3>load more questions</h3>
        </div>
      )
    }
    }

    return (
      <div>
        <Nav isMain={true}/>
        <div className="medium-centered large-11 medium-12" style={{backgroundColor:'#fafafa;min-height:80vh'}}>
          {renderQuestions()}
          {renderMoreQuestionsButton()}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(QuestionList);
