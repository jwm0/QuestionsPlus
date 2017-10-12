import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'actions';
import ProfilePicture from 'ProfilePicture';
import AnimatedInput from 'AnimatedInput';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Peer from 'Peer';
import Voting from 'Voting';

export class Question extends React.Component {
  constructor (props) {
    super(props);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmitNewComment = this.handleSubmitNewComment.bind(this);
    this.updateTextfield = this.updateTextfield.bind(this);

    this.state = {
      open: false,
      textField: ''
    }
  }
  handleFollow () {
    this.props.dispatch(actions.followQuestion(this.props.id));
  }
  handleComment () {
    this.setState({open: !this.state.open});
  }
  updateTextfield (e, text) {
    this.setState({textField: text});
  }
  handleSubmitNewComment(e) {
    e.preventDefault();
    // use parent as poster - demo only
    if (this.state.textField.length > 0) {
      this.props.dispatch(actions.addComment(this.props.id, this.props.author, this.state.textField));
      this.setState({open: false, textField: ''});
    }
  }
  render () {
    var {id, author, title, text, score, peers, related, conversations, answered, isPost, follow, comments, users} = this.props;
    const followButton = follow ? "unfollow" : "follow";
    const link = `/comments/${id}/`;
    const authorName = users.byID[author] ? users.byID[author].name : 'Anonymous';


    var renderPeers = () => {
      return comments.slice(0,4).map((comment, i) => {
        if(i === 0){
          return (<Peer key={comment} id={comment} answered={answered}/>);
        }
        else{
          return (<Peer key={comment} id={comment}/>);
        }
      });
    };



    const QuestionDefault = () => {
      return(
        <div className="large-8 medium-10 small-12 small-centered question">
          <div className="question-left">
            <div className="question-top">
              <div className="picture-wrapper"><ProfilePicture id={author}/></div>
              <div className="header-wrapper">
                <h3>{authorName} <span className="span-style">IS ASKING:</span></h3>
                <Link to={link} onClick={this.handleRedirect}><h3 style={{'margin':'0;font-style:italic'}}>{title}</h3></Link>
              </div>
            </div>
            <div className="question-bottom">
              <div className="question-side text-center">
                <div className="text-footer">ASKED</div>
              </div>
              <div className="question-fill">
                <div style={{width:'20%'}}>
                  <div className="question-blank">
                    <span className="blank-number">{related}</span>
                    <div className="peer-footer">
                      <div className="text-center" style={{fontStyle:'italic'}}>more<br/>activities</div>
                      <span className="profile-dot"></span>
                    </div>
                  </div>
                </div>
                {renderPeers()}
                <div className="question-right-medium">
                  <h4>{related} related discussion</h4>
                  <h4>{peers} peers involved</h4>
                  <h4>{conversations} conversations</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="question-right">
            <h4>{related} related discussion</h4>
            <h4>{peers} peers involved</h4>
            <h4>{conversations} conversations</h4>
          </div>
        </div>
      );
    }

    const QuestionPost = () => {
      return (
        <div>
          <div className="large-8 medium-10 small-12 small-centered question" style={{padding:'0;border:none;flex-direction:column'}}>
            <div style={{width:'100%'}}>
              <div className="question-top">
                <div className="picture-wrapper"><ProfilePicture id={author}/></div>
                <div className="header-wrapper">
                  <h3>{authorName} <span className="span-style">IS ASKING:</span></h3>
                  <Link to="/comments" onClick={this.handleRedirect}><h3 style={{'margin':'0;font-style:italic'}}>{title}</h3></Link>
                </div>
                <div className="follow-button"><button onClick={this.handleFollow}>{followButton}</button></div>
              </div>
              <div className="question-bottom">
                <div className="question-side"></div>
                <div className="question-text">
                  <div className="comment-left">
                    <p>{text}</p>
                  </div>
                  <div className="comment-right"><Voting score={score} id={id} voteStatus={this.props.voteStatus}/></div>
                </div>
              </div>
            </div>
            <AnimatedInput open={this.state.open} height={230}>
              <div className="large-8 medium-10 small-12 small-centered reply-input" style={{height:230}}>
                <div style={{width:'100%;height:100%'}}>
                  <TextField value={this.state.textField} onChange={this.updateTextfield} hintText="Type in here" fullWidth={true} multiLine={true} rowsMax={5} rows={5} floatingLabelText="Add a comment!"/>
                  <FloatingActionButton mini={true} onClick={this.handleSubmitNewComment}>
                    <ContentAdd/>
                  </FloatingActionButton>
                </div>
              </div>
            </AnimatedInput>
          </div>
          <div className="button-label"><button className="button-custom" onClick={this.handleComment} style={{margin:0}}>GIVE new answer</button></div>
        </div>
      )
    }
    if (isPost) return(QuestionPost());
    return(QuestionDefault());
  }
}

export default connect(
  (state) => {
    return {
      users: state.users
    }
  }
)(Question);
