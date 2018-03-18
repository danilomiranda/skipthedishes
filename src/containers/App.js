import React, { Component } from 'react'
import PropTypes from  'prop-types'
import Navigation from '../components/Navigation'

import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        {this.props.children}
      </React.Fragment>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
