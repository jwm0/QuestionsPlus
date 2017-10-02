import React from 'react';
import Voting from 'Voting';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProfilePicture from 'ProfilePicture';
import AnimatedInput from 'AnimatedInput';
import ChildComment from 'ChildComment';

export class Comment extends React.Component {
  constructor() {
    super();
    this.toggleReplyBar = this.toggleReplyBar.bind(this);
    this.showAllComments = this.showAllComments.bind(this);
    this.handleSubmitChildComment = this.handleSubmitChildComment.bind(this);
    this.handleSetAnswered = this.handleSetAnswered.bind(this);
    this.state = {
      open: false,
      childrenCount: 2
    };
  }
  toggleReplyBar() {
    this.setState({open: !this.state.open});
  }
  handleSubmitChildComment() {
    // use parent as poster - demo only
    this.props.dispatch(actions.addChildComment(this.props.id, this.props.author, this.refs.commentText.value));
  }
  handleSetAnswered() {
    this.props.dispatch(actions.setAnsweredComment(this.props.id, this.props.questionID));
  }
  showAllComments() {
    this.setState({childrenCount: undefined});
  }
  render() {
    var {id, authorName, image, text, score, hasChild, children, comments, users} = this.props;

    var renderChildren = () => {
      if (children.length > 0) {
        for (var i=0; i<children.length; i++){ // should iterate
          var commentsRef = comments.byID[children[i]];
          commentsRef.image = users.byID[commentsRef.author].image;
          commentsRef.authorName = users.byID[commentsRef.author].name;
        }
        return children.slice(0, this.state.childrenCount).map((child)=>{
          const name = comments.byID[child].authorName;
          const text = comments.byID[child].text;
          const score = comments.byID[child].score;
          const image = comments.byID[child].image;
          return(
            <ChildComment key={child} name={name} text={text} score={score} image={image}/>
          );
        });
      }
    }

    var renderAllComments = () => {
      if (children.length > this.state.childrenCount) {
        return (
          <div>
            <button className="button" style={{display:'flex;justify-content:center'}} onClick={this.showAllComments}>Show more</button>
          </div>
        )
      }
    }

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
          {renderChildren()}
          {renderAllComments()}
          <AnimatedInput open={this.state.open}>
            <div className="large-8 medium-10 small-12 small-centered" style={{height: '100%'}}>
              <form onSubmit={this.handleSubmitChildComment}>
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
      comments: state.comments,
      users: state.users
    }
  }
)(Comment);
