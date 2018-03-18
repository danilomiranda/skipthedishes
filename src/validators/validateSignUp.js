const validate = values => {
  const errors = {}
  
  if (!values.email) {
    errors.email = 'Type your email'
  }
  if (!values.name) {
    errors.name = 'Type your name'
  }
  if (!values.address) {
    errors.address = 'Type your address'
  }
  if (!values.password) {
    errors.password = 'Type your password'
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Confirm the password'
  }
  if ((values.password !== values.confirmPassword) && values.confirmPassword !== undefined) {
    errors.password = 'Passwords didnt match'
  }
  return errors
}

export default validate
