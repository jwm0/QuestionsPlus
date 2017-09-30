import React from 'react';
import {Link, IndexLink} from 'react-router';
import Search from 'Search';
import {clearSearchText} from 'Search';
import {connect} from 'react-redux';
import * as actions from 'actions';
import AnimatedInput from 'AnimatedInput';
import Snackbar from 'material-ui/Snackbar';

export class Nav extends React.Component {
  constructor() {
    super();
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onNewQuestionSubmit = this.onNewQuestionSubmit.bind(this);
    this.onHomeClick = this.onHomeClick.bind(this);
    this.onNewQuestionClick = this.onNewQuestionClick.bind(this);
    this.hideSnackbar = this.hideSnackbar.bind(this);
    this.state = {
      text: "",
      open: false,
      showSnackbar: false
    }
  }
  componentDidMount () {
    // Initialize radio button default value
    var {filter} = this.props;
    if (filter == 'all') $('#all_questions').prop('checked', true);
    else if (filter == 'my_shelf') $('#my_shelf').prop('checked', true);
  }
  handleTextChange (text) {
    this.setState({
      text
    });
  }
  onHomeClick () {
    window.location.reload();
  }
  onNewQuestionClick () {
    this.setState({open: !this.state.open});
  }
  hideSnackbar () {
    this.setState({showSnackbar: false});
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

    // Check if title is present
    if(title.length > 0){
      // Reset search field
      dispatch(actions.newQuestion(title, text, peerCount, answered));
      dispatch(actions.setSearchText(""));
      this.setState({text:"", showSnackbar: true});
      this.onNewQuestionClick();
    }
  }
  render () {
    var {text} = this.state;
    var {sortBy, dispatch} = this.props;

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
                    <div className="top-bar-left"><Link to="/" onClick={this.onHomeClick}><span className="logo-text">QUESTIONS</span></Link><div className="logo" onClick={this.onNewQuestionClick}>+</div></div>
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
                <AnimatedInput open={this.state.open}>
                  <div style={{height: '100%'}}>
                    <h1>Ask a question!</h1>
                    <form onSubmit={this.onNewQuestionSubmit}>
                      <input type="text" ref="questionTitle" placeholder="Title"/>
                      <textarea ref="questionText" placeholder="Text"/>
                          <fieldset className="demo-container">
                            <legend>FOR DEMO PURPOSES</legend>
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
                          </fieldset>

                      <button id="submit_btn" className="button expanded">Submit</button>
                    </form>
                  </div>
                </AnimatedInput>
                <Search text={text} onTextChange={this.handleTextChange}/>
              </div>
          </div>
          <Snackbar
            open={this.state.showSnackbar}
            onRequestClose={this.hideSnackbar}
            message="Question submitted"
            autoHideDuration={4000}
          />
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
