import React from 'react';
import Comment from 'Comment';

export default class CommentList extends React.Component {
  render() {
    var {users} = this.props;

    var renderComments = () => {
      return users.map((user)=>{
        return (<Comment key={user.id} {...user}/>)
      });
    }

    return (
      <div>
        {renderComments()}
      </div>
    )
  }
}
