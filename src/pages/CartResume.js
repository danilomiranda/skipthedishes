import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Helmet} from "react-helmet";
import {
  Container,
  Row,
  ListGroup,
  ListGroupItem,
  Alert,
  Button } from 'reactstrap'

import { unCheck, sendOrder } from '../actions/ProductActions'
import App from '../containers/App';
import groupBy from '../util/groupBy'

class CartResume extends Component {
  total(cart) {
    let total = 0;
    if (cart.length > 0 ) {
      cart.map((product) => total += product.price)
    }
    return total
  }
  remove(product) {
    this.props.unCheck(product)
  }
  sendOrder = () => {
    let order = {
      date: new Date(),
      deliveryAddress: 'Mocked Address',
      contact: 'danilokassio@gmail.com',
      status: "WAITING", // WAITING / DELIVERED
      orderItems: []
    }
    let orders = [];
    const carts = groupBy(this.props.cart, 'storeId');
    for (var storeId in carts) {
      orders.push(
        {
          ...order,
          orderItems: carts[storeId].map((product) => {
            return {
              productId: product.id,
              quantity: 1
            }
          }),
          total: carts[storeId].lenghth,
          storeId: storeId,
        }
      )
    }
    
    orders.map((order) => this.props.sendOrder(order))
  }
  
  render() {
    return (
    <App>
      <Helmet>
          <title>Skip the Dishes - Cart Resume</title>
          <meta name="description" content="Cart resume, order, get your food" />
      </Helmet>
      <Container>
        <Row>
          {this.props.success ? (
            <Alert color="success">
              Order Registered
            </Alert>
          ): ''}
        </Row>
        <Row>
          <ListGroup>
          {this.props.cart && this.props.cart.map((product) => (
            <ListGroupItem key={product.id}>
              {product.name} - ${` ${product.price}`}
              <Button onClick={() => this.remove(product)}>X</Button>
            </ListGroupItem>
          ))}
            <ListGroupItem>
              {`TOTAL $ `}{this.total(this.props.cart)}
            </ListGroupItem>
          </ListGroup>
        </Row>
        <Row>
          <Button onClick={() => this.sendOrder()} >
            Send order
          </Button>
        </Row>
      </Container>
    </App>
    )
  }
}

CartResume.defaultProps = {
  cart: []
};

CartResume.propTypes = {
  cart: PropTypes.array
}

const mapStateToProps = ({ product }) => {
  return {
    cart: product.cart,
    success: product.success
  }
}

export default connect(mapStateToProps, { unCheck, sendOrder })(CartResume)
