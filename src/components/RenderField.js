import React, { Component } from 'react'
import PropTypes from  'prop-types'
import InputMask from 'react-input-mask'
import NotificationError from './NotificationError'

class RenderField extends Component {
  renderInput() {
    const { input, label, type, mask, maxLength } = this.props
    if (mask) {
      return (
        <InputMask
          {...input}
          placeholder={label}
          type={type}
          className="form-control input-sm"
          maxLength={maxLength}
          mask={mask}
        />
      )
    } else {
      return (
        <input
          {...input}
          placeholder={label}
          type={type}
          className="form-control input-sm"
          maxLength={maxLength}
        />
      )
    }
  }
  render() {
    const { label, sublabel, meta: { touched, error } } = this.props
    return (
      <fieldset className="form-group">
        <label>{label}</label><span style={{fontSize: '12px'}}> {sublabel}</span>
        {this.renderInput()}
        {touched && error && (
          <div>
            <span className="text-danger">{error}</span>
            <NotificationError />
          </div>
        )}
      </fieldset>
    )
  }
}

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  mask: PropTypes.string,
  meta: PropTypes.object.isRequired,
  maxLength: PropTypes.number
}

export default RenderField
