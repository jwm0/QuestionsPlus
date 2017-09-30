import React from 'react';
import Comment from 'Comment';

export default class CommentList extends React.Component {
  render() {
    var {comments, questionID} = this.props;

    var renderComments = () => {
      var hasChild = true;
      return comments.map((comment, i)=>{
        if (i>0) hasChild=false;
        return (
          <div key={comment.id}>
            <Comment {...comment} questionID={questionID} hasChild={hasChild}/>
          </div>
        )
      });
    }

    return (
      <div>
        {renderComments()}
      </div>
    )
  }
}
