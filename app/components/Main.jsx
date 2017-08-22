import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import Nav from 'Nav';
import ProfileModal from 'ProfileModal';

export class Main extends React.Component {
  constructor () {
    super();
    this.handleHideModal= this.handleHideModal.bind(this);
  }
  handleHideModal () {
    this.props.dispatch(actions.hideModal());
  }
  render () {
    var isMain=false;
    if (this.props.location.pathname == "/") isMain=true;
    return(
      <div>
        <Nav isMain={isMain}/>
        <div>
            {this.props.children}
        </div>
        {this.props.modal.showModal ? <ProfileModal name={this.props.modal.user} image={this.props.modal.image} hideMe={this.handleHideModal}/> : null}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      modal: state.modal
    }
  }
)(Main);
