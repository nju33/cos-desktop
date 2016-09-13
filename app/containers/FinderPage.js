import React, { Component } from 'react';
import Finder from '../components/Finder';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FinderActions from '../actions/finder';

function mapStateToProps(state) {
  return {
    finder: state.finder
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FinderActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Finder)
