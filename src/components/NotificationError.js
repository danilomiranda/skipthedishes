import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFormSubmited } from '../actions/FormActions'

class NotificationError extends Component {
  componentDidMount() {
    this.props.setFormSubmited()    
  }

  render() {
    return (
      <div>        
      </div>
    )
  }
}

export default connect(null, { setFormSubmited })(NotificationError)
