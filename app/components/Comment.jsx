import React from 'react';
import Voting from 'Voting';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProfilePicture from 'ProfilePicture';
import AnimatedInput from 'AnimatedInput';

export class Comment extends React.Component {
  constructor() {
    super();
    this.toggleReplyBar = this.toggleReplyBar.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleSetAnswered = this.handleSetAnswered.bind(this);
    this.state = {open: false};
  }
  toggleReplyBar() {
    this.setState({open: !this.state.open});
  }
  handleSubmitComment() {
  //  this.props.dispatch(actions.addComment(this.props.questionID, this.props.author, this.refs.commentText.value));
  }
  handleSetAnswered() {
    this.props.dispatch(actions.setAnsweredComment(this.props.id, this.props.questionID));
  }
  render() {
    console.log(this.props);
    var {id, authorName, image, text, score, hasChild} = this.props;
    var reply = ()=>{
      if(hasChild){
        return(
          <div className="reply">
            <div className="reply-container">
              <div className="picture-wrapper"><ProfilePicture name="Andrew"/></div>
              <div className="comment-section">
                <div className="comment-top">
                  Andrew <span className="id1">COMMENTED IT &#9679;</span> <span className="id2">today</span>
                </div>
                <div className="comment-bottom">
                  <div className="comment-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque congue dolor a ultrices. Nulla facilisi. Donec commodo pretium leo, eu laoreet justo.
                  </div>
                  <div className="comment-right">
                    <Voting score={1}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    return(
      <div>
        <div className="large-8 medium-10 small-12 small-centered">
          <div className="comment-container">
            <div className="picture-wrapper"><ProfilePicture name={authorName} image={image}/></div>
            <div className="comment-section">
              <div className="comment-top">
                {authorName} <span className="id1">COMMENTED IT &#9679;</span> <span className="id2">yesterday</span>
              </div>
              <div className="comment-bottom">
                <div className="comment-left">
                  {text}
                </div>
                <div className="comment-right">
                  <button className="button tiny" onClick={this.handleSetAnswered}>ANSWERED</button>
                  <Voting id={id} score={score}/>
                </div>
              </div>
            </div>
          </div>
          {reply()}
          <AnimatedInput open={this.state.open}>
            <div className="large-8 medium-10 small-12 small-centered" style={{height: '100%'}}>
              <form onSubmit={this.handleSubmitComment}>
                <textarea ref="commentText" placeholder="Text"/>
                <button id="submit_btn" className="button expanded">Submit</button>
              </form>
            </div>
          </AnimatedInput>
        </div>
        <div className="button-label"><button className="button-custom" onClick={this.toggleReplyBar} style={{margin:0}}>COMMENT</button></div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      users: state.users
    }
  }
)(Comment);
