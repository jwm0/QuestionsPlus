import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Search extends React.Component {
  render () {
    var {searchText, dispatch} = this.props;
    return(
      <form className="form" onSubmit={(e) => {
          e.preventDefault();
          var searchText = this.refs.searchText.value;
          dispatch(actions.setSearchText(searchText));
        }}>
        <input type="text" ref="searchText" placeholder="Search questions"/>
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
