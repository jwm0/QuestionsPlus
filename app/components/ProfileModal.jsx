import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class ProfileModal extends React.Component {
  componentDidMount () {
    var elem = new Foundation.Reveal($('#profile-modal'));
    $('#profile-modal').on('closed.zf.reveal',()=>{this.props.dispatch(actions.hideModal())});
  }
  render () {
    var {modal} = this.props;
    if (modal.showModal) {
      $('#profile-modal').foundation('open');
    }
      return(
        <div>
          <div id="profile-modal" className="reveal large">
            <div className="modal-container">
              <div className="modal-picture"></div>
              <p>USERNAME</p>
              <div className="modal-one-third" style={{float:'left'}}><span className="modal-s2">MEMBER FOR</span> 5 months</div>
              <div className="modal-one-third"><span className="modal-s2">LAST SEEN</span> Saturday</div>
              <div className="modal-one-third" style={{float:'right'}}><span className="modal-s2">ACTIVITY LEVEL</span></div>
              <div style={{'borderTop':'1px solid black;margin-top:20px;padding-top:20px'}}>
                <h2>How it all started</h2>
                <h3>that's where we have been these 5 months ago</h3>
              </div>
              <div id="modal-squares">
                <div id="modal-square1">
                  <div id="modal-square-text1"><span style={{'fontSize':'30px;fontWeight:bold'}}>46</span><p style={{marginTop:'10px'}}>peers</p></div>
                </div>
                <div id="modal-square2">
                  <div id="modal-square-text2"><span style={{'fontSize':'30px;fontWeight:bold'}}>29</span><p style={{marginTop:'10px'}}>discussion</p></div>
                </div>
                <div id="modal-square3">
                  <div id="modal-square-text3"><span style={{'fontSize':'30px;fontWeight:bold'}}>19</span><p style={{marginTop:'10px'}}>findings</p></div>
                </div>
                <div id="modal-square4">
                  <div id="modal-square-text4"><span style={{'fontSize':'30px;fontWeight:bold'}}>10</span><p style={{marginTop:'10px'}}>questions</p></div>
                </div>
              </div>
              <div id="modal-next">
                <h3>who joined the platform that same period</h3>
                <div id="modal-profile-container">
                  <div className="modal-profile">
                    <div className="modal-picture"></div>
                  </div>
                  <div className="modal-profile">
                    <div className="modal-picture"></div>
                  </div>
                  <div className="modal-profile">
                    <div className="modal-picture"></div>
                  </div>
                </div>
                <h3 style={{clear:'both'}}>the hottest discussion these days</h3>
              </div>
            </div>
            <div id="modal-footer">
              <div id="modal-footer-text">
                <span className="modal-blue">Andrew</span> <span className="modal-s2">FOUND THE GUARDIAN ARTICLE</span>
                <p><span className="modal-blue" style={{fontWeight:'normal;font-style:italic'}}>Vegan diet to stop diabetes progress</span></p>
                <div className="modal-bar">6 peers involved</div>
                <div className="modal-bar">3 related discussion</div>
                <div className="modal-bar">3 conversations</div>
                <div className="modal-bar">19 upvotes</div>
              </div>
            </div>
            <button className="top-corner" data-close="">&#10006;</button>
          </div>
        </div>
      )

  }
};

export default connect(
  (state) => {
    return {
      modal: state.modal
    }
  }
)(ProfileModal);
