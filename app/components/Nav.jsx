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
    dispatch(actions.setSearchText(""));
    var author = ((name="Anonymous") => {
      // fetch username from database
      return name;
    })();
    var title = this.refs.questionTitle.value;
    var text = this.refs.questionText.value;
    var peerCount = this.refs.peerCount.value;
    var answered = this.refs.answered.checked;

    if(title.length > 0){
      dispatch(actions.newQuestion(title, text, peerCount, answered));
      //dispatch(actions.addQuestion(author, title, text));
      $('#addQuestionModal').foundation('close');
    }
  }
  onSortChange () {
    var {dispatch} = this.props;
    dispatch(actions.setSort('hot'));
  }
  render () {
    var {sortBy} = this.props;

    var renderAddQuestion = () => {
      return (
        <div className="reveal" id="addQuestionModal" data-reveal>
          <h1>Ask a question!</h1>
          <form>
            <input type="text" ref="questionTitle" placeholder="Title"/>
            <input type="text" ref="questionText" placeholder="Text"/>
            <div className="demo-container">
              <p>Peers involved:</p>
              <input className="peerCount" type="number" min="0" defaultValue="0" ref="peerCount"/>
              <p>Answered?</p>
              <div className="switch">
                <input className="switch-input" ref="answered" id="answered" type="checkbox"/>
                <label className="switch-paddle" htmlFor="answered">
                  <span className="switch-active" aria-hidden="true">Yes</span>
                  <span className="switch-inactive" aria-hidden="true">No</span>
                </label>
              </div>
            </div>
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
          <div className="small-centered small-10 large-8 centered header">
            <div className="top-bar">
              <div>
                <div className="top-bar-left"><Link to="/"><span id="logo-text">QUESTIONS</span></Link><div id="logo" data-open="addQuestionModal">+</div></div>
                <div className="nav-bar">
                  <div><input style={{width:'auto;margin:0'}} name="questions-filter" type="radio" id="my_shelf" required/><label htmlFor="my_shelf">My shelf</label></div>
                  <div><input style={{width:'auto;margin:0'}} name="questions-filter" type="radio" id="all_questions"/><label style={{marginRight:0}} htmlFor="all_questions">All questions</label></div>
                  <span style={{'wordSpacing':'2px'}}>Sort by: <i style={{'textDecoration':'underline;cursor:pointer'}}>recent</i> or <span style={{color:'#2199E8;cursor:pointer'}} onClick={this.onSortChange.bind(this)}><b>hot</b></span></span>
                </div>
              </div>
            </div>
            <Search/>
          </div>
        {renderAddQuestion()}
      </div>
    )
  }
}

export default connect()(Nav);
