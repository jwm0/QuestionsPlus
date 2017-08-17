import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Search extends React.Component {
  constructor () {
  super();
  this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange () {
    this.props.onTextChange(this.refs.searchText.value);
  }
  render () {
    var {searchText, dispatch, text, onTextChange} = this.props;
    return(
      <form className="form" onSubmit={(e) => {
          e.preventDefault();
          var searchText = this.refs.searchText.value.toLowerCase();
          dispatch(actions.setSearchText(searchText));
        }}>
        <input type="text" ref="searchText" placeholder="Search questions" onChange={this.handleTextChange} value={text}/>
        <input type="submit" className="button" value="SEARCH"/>
      </form>
    )
  }
}

export default connect(
  (state) => {
    return {
      searchText: state.searchText
    }
  }
)(Search);
