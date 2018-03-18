import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/AuthActions'

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser()
  }
  render() {
    return (
        <Redirect to={{
          pathname: '/signin',
          state: { from: this.props.location }
        }} />
    )
  }
}

Signout.propTypes = {
  signoutUser: PropTypes.func.isRequired,
}

export default connect(null, actions)(Signout)
