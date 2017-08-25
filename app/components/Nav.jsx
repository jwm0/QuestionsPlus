import React from 'react';
import {Link, IndexLink} from 'react-router';
import Search from 'Search';
import {clearSearchText} from 'Search';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Nav extends React.Component {
  constructor() {
    super();
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onNewQuestionSubmit = this.onNewQuestionSubmit.bind(this);
    this.state = {
      text: ""
    }
  }
  componentDidMount () {
    // Initialize radio button default value
    var {filter} = this.props;
    if (filter == 'all') $('#all_questions').prop('checked', true);
    else if (filter == 'my_shelf') $('#my_shelf').prop('checked', true);

    // Create modal for adding questions -- FOR DEMO PURPOSES
    var addQuestionModal = new Foundation.Reveal($('#addQuestionModal'));
    var that = this;
    $(document).on("click", "#submit_btn", function(event){
      event.preventDefault();
      that.onNewQuestionSubmit();
    });
  }
  handleTextChange (text) {
    this.setState({
      text
    });
  }
  onNewQuestionSubmit () {
    var {dispatch} = this.props;
    // Get values from input fields
    var title = this.refs.questionTitle.value;
    var text = this.refs.questionText.value;
    var peerCount = this.refs.peerCount.value;
    var answered = this.refs.answered.checked;
    var author = ((name="Anonymous") => {
      // fetch username from database
      return name;
    })();

    // Reset search field
    dispatch(actions.setSearchText(""));
    this.setState({text:""});
    // Check if title is present
    if(title.length > 0){
      dispatch(actions.newQuestion(title, text, peerCount, answered));
      $('#addQuestionModal').foundation('close');
    }
  }
  render () {
    var {text} = this.state;
    var {sortBy, dispatch} = this.props;
    var renderAddQuestion = () => {
      return (
        <div className="reveal" id="addQuestionModal" data-reveal>
          <h1>Ask a question!</h1>
          <form>
            <input type="text" ref="questionTitle" placeholder="Title"/>
            <textarea ref="questionText" placeholder="Text"/>
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

    const NavPost = ()=>{
      return(
        <div className="nav-container">
          <div className="medium-centered large-11 medium-12">
            <div className="large-8 medium-10 small-12 small-centered">
              <div className="top-bar" style={{backgroundColor:'#fff;padding-top:2rem;padding-bottom:2rem'}}>
                <div className="top-bar-left"><Link to="/"><span className="logo-text">QUESTIONS</span><div className="logo">+</div></Link></div>
                <div className="top-bar-right">Last time discussed  1  day ago</div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const NavMain = ()=>{
      return(
        <div className="nav-container">
          <div className="medium-centered large-11 medium-12">
              <div className="large-8 medium-10 small-12 small-centered">
                <div className="top-bar" style={{backgroundColor:'#fff'}}>
                  <div className="bar">
                    <div className="top-bar-left"><Link to="/"><span className="logo-text">QUESTIONS</span></Link><div className="logo" data-open="addQuestionModal">+</div></div>
                    <div className="nav-bar">
                      <div><input style={{width:'auto;margin:0'}} name="questions-filter" type="radio" id="my_shelf" onChange={()=>{dispatch(actions.setFilter('my_shelf'))}}/><label htmlFor="my_shelf">My shelf</label></div>
                      <div><input style={{width:'auto;margin:0'}} name="questions-filter" type="radio" id="all_questions" onChange={()=>{dispatch(actions.setFilter('all'))}}/><label style={{marginRight:0}} htmlFor="all_questions">All questions</label></div>
                      <div style={{width:'33%;padding-left:1rem'}}>
                        <span style={{'wordSpacing':'2px'}}>Sort by: <span style={{'textDecoration':'underline;cursor:pointer'}} onClick={()=>{dispatch(actions.setSort('recent'))}}><i>recent</i></span> or
                        <span style={{color:'#2199E8;cursor:pointer'}} onClick={()=>{dispatch(actions.setSort('hot'))}}><b> hot</b></span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <Search text={text} onTextChange={this.handleTextChange}/>
              </div>
            {renderAddQuestion()}
          </div>
        </div>
      )
    }

    if (this.props.isMain) return(NavMain());
    else return (NavPost());
  }
}

export default connect(
  (state) => {
    return {
      filter: state.filter
    }
  }
)(Nav);
