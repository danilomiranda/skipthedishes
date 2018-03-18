import React, { Component } from 'react'
import PropTypes from  'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Alert } from 'reactstrap'
import * as actions from '../actions/AuthActions'
import RenderField from '../components/RenderField'
import { PulseLoader } from 'react-spinners'
import validate from '../validators/validateSignUp'

class Signup extends Component {

  componentWillMount() {
    this.props.clearState()
  }

  handleFormSubmit(values) {
    this.props.signupUser(values)
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (<div className="alert alert-danger">
        <strong>Oops! </strong>
        {this.props.errorMessage}
      </div>)
    }
  }

  render() {
    const { handleSubmit } = this.props
    const form = (
      <Row>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" type="text" component={RenderField} label="Email" />
          <Field name="name" type="text" component={RenderField} label="Name" />
          <Field name="address" type="text" component={RenderField} label="Address" />
          <Field name="password" type="password" component={RenderField} label="Senha" sublabel="[At least 4 characters]" />
          <Field name="confirmPassword" type="password" component={RenderField} label="Confirm password" />
          {this.renderAlert()}
          <div className="row">
            <div className="col-lg-12 col-md-12 ">
              <button
                action="submit"
                className="btn btn-success btn-block px-2"
                style={{ marginBottom: '15px' }}>
                Signup
            </button>
            </div>
            <div className="col-lg-12 col-md-12  text-center">
              <Link to="/signin">
                Already a member? Sign in
              </Link>
            </div>
          </div>
        </form>
      </Row>
    )
    const success = (
      <React.Fragment>
        <Alert color="success">
          User Registered 
        </Alert>
        <Link to="/">
          Go to Products
        </Link>
      </React.Fragment>
    )
    return (
      <Container>
        <Row>
          <h2>SignUp</h2>
        </Row>
        {this.props.success}
        {!this.props.authenticated ? (this.props.success ? success :
          (this.props.loading ? <PulseLoader /> : form)) :
          <Redirect to={{
            pathname: '/',
            state: { from: this.props.location }
          }} />}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    success: state.auth.success,
    loading: state.auth.loading
  }
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
  signupUser: PropTypes.func,
  clearState: PropTypes.func,
  authenticated: PropTypes.bool,
  success: PropTypes.bool,
  location: PropTypes.object
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup)

export default connect(mapStateToProps, actions)(Signup)
