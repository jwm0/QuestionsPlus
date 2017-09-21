import React from 'react';
import Comment from 'Comment';

export default class CommentList extends React.Component {
  render() {
    var {comments} = this.props;

    var renderComments = () => {
      var hasChild = true;
      return comments.map((comment, i)=>{
        if (i>0) hasChild=false;
        return (
          <div key={comment.id}>
            <Comment {...comment} hasChild={hasChild}/>
            <div className="button-label"><button className="button-custom" style={{margin:0}}>COMMENT</button></div>
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
