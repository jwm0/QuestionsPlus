import React from 'react';
import {Link, IndexLink} from 'react-router';
import Search from 'Search';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Nav extends React.Component {
  componentDidMount () {
    var addQuestionModal = new Foundation.Reveal($('#addQuestionModal'));
    var that = this;
    $(document).on("click", "#submit_btn", function(event){
    that.onNewQuestionSubmit();
    });
  }
  onNewQuestionSubmit () {
    var {dispatch} = this.props;
    var author = ((name="Anonymous") => {
      // fetch username from database
      return name;
    })();
    var title = this.refs.questionTitle.value;
    var text = this.refs.questionText.value;

    if(title.length > 0){
      dispatch(actions.addQuestion(author, title, text));
      $('#addQuestionModal').foundation('close');
    }
  }
  render () {
    var that = this;
    var renderAddQuestion = () => {
      return (
        <div className="reveal" id="addQuestionModal" data-reveal>
          <h1>Ask a question!</h1>
          <form>
            <input type="text" ref="questionTitle" placeholder="Title"/>
            <input type="text" ref="questionText" placeholder="Text"/>
            <button id="submit_btn" className="button expanded">Submit</button>
          </form>
          <button className="close-button" data-close="" aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )
    }
    return(
      <div className="nav-container">
        <div className="row">
          <div className="small-centered small-10 columns centered header">
            <div className="top-bar">
              <div>
                <div className="top-bar-left"><Link to="/"><span id="logo-text">QUESTION</span> <div id="logo">+</div></Link></div>
                <p><button className="button" data-open="addQuestionModal">Click me for a modal</button></p>
                <div className="nav-bar">
                  <div><input style={{width:'auto;margin:0'}} name="questions-filter" type="radio" id="my_shelf" required/><label htmlFor="my_shelf">My shelf</label></div>
                  <div><input style={{width:'auto;margin:0'}} name="questions-filter" type="radio" id="all_questions"/><label style={{marginRight:0}} htmlFor="all_questions">All questions</label></div>
                  <span style={{'wordSpacing':'2px'}}>Sort by: <i style={{'textDecoration':'underline;cursor:pointer'}}>recent</i> or <span style={{color:'#2199E8;cursor:pointer'}}><b>hot</b></span></span>
                </div>
              </div>
            </div>
            <Search/>
          </div>
        </div>
        {renderAddQuestion()}
      </div>
    )
  }
}

export default connect()(Nav);
