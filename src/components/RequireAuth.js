import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class Authentication extends Component {
    render() {
      return this.props.auth.authenticated ? <ComposedComponent {...this.props}/>
      : <Redirect to={{ pathname: '/signin', state: { from: this.props.location }  }}/>
    }
  }

  Authentication.propTypes = {
    router: PropTypes.object,
    authenticated: PropTypes.bool,
    location: PropTypes.object
  }

  function mapStateToProps(state) {
    return state
  }

  return connect(mapStateToProps)(Authentication)
}
