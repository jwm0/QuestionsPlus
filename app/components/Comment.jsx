import React from 'react';
import Voting from 'Voting';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProfilePicture from 'ProfilePicture';
import AnimatedInput from 'AnimatedInput';
import ChildComment from 'ChildComment';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class Comment extends React.Component {
  constructor() {
    super();
    this.toggleReplyBar = this.toggleReplyBar.bind(this);
    this.showAllComments = this.showAllComments.bind(this);
    this.handleSubmitChildComment = this.handleSubmitChildComment.bind(this);
    this.handleSetAnswered = this.handleSetAnswered.bind(this);
    this.updateTextfield = this.updateTextfield.bind(this);
    this.state = {
      open: false,
      childrenCount: 2,
      textField: ''
    };
  }
  toggleReplyBar() {
    this.setState({open: !this.state.open});
  }
  handleSubmitChildComment(e) {
    e.preventDefault();
    // use parent as poster - demo only
    if (this.state.textField.length > 0) {
      this.props.dispatch(actions.addChildComment(this.props.id, this.props.author, this.state.textField));
      this.setState({open: false, childrenCount: undefined, textField: ''});
    }
  }
  updateTextfield (e, text) {
    this.setState({textField: text});
  }
  handleSetAnswered() {
    this.props.dispatch(actions.setAnsweredComment(this.props.id, this.props.questionID));
  }
  showAllComments() {
    this.setState({childrenCount: undefined});
  }
  render() {
    var {id, authorName, image, text, score, hasChild, children, answered, comments, users} = this.props;
    const setAnsweredButton = answered ? 'button tiny' : 'button tiny hollow secondary disabled';

    var renderChildren = () => {
      if (children.length > 0) {
        for (var i=0; i<children.length; i++){ // should iterate
          var commentsRef = comments.byID[children[i]];
          try {
            commentsRef.image = users.byID[commentsRef.author].image;
            commentsRef.authorName = users.byID[commentsRef.author].name;
          } catch(e) {
            commentsRef.image = null;
            commentsRef.authorName = 'Anonymous';
          }
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
                  <button className={setAnsweredButton} onClick={this.handleSetAnswered}>ANSWERED</button>
                  <Voting id={id} score={score}/>
                </div>
              </div>
            </div>
          </div>
          <AnimatedInput open={this.state.open} height={250}>
            <div className="large-8 medium-10 small-12 small-centered reply-input" style={{height:250}}>
              <div style={{width:'100%'}}>
                <TextField value={this.state.textField} onChange={this.updateTextfield} hintText="Type in here" fullWidth={true} multiLine={true} rowsMax={5} rows={3} floatingLabelText="Add a comment!"/>
                <FloatingActionButton onClick={this.handleSubmitChildComment}>
                   <ContentAdd/>
                 </FloatingActionButton>
              </div>
            </div>
          </AnimatedInput>
          {renderChildren()}
          {renderAllComments()}
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
