import React from 'react';
import Nav from 'Nav';
import ProfileModal from 'ProfileModal';

export class Main extends React.Component {
  render () {
    return(
      <div>
        <Nav/>
        <div>
            {this.props.children}
        </div>
        <ProfileModal/>
      </div>
    );
  }
}

export default Main;
