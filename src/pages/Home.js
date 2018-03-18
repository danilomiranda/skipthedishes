import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Helmet} from "react-helmet";
import {
  Container,
  Col,
  Row,
  Badge,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'

import {
  fetchAllProducts,
  check } from '../actions/ProductActions'
import App from '../containers/App';


class Home extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }
  select(product) {
    this.props.check(product)
  }
  render() {
    return (
    <App>
      <Helmet>
          <title>Skip the Dishes - Product list</title>
          <meta name="description" content="Nice description to SEO" />
      </Helmet>
      <Container>
        <Row>
          {this.props.products && this.props.products.map((product) => (
            <Col key={product.id}>
              <Card>
                <CardImg
                top
                width="100%"
                src="http://via.placeholder.com/318x180"
                alt="Card image cap" />
                <CardBody>
                  <CardTitle>{product.name}</CardTitle>
                  <CardSubtitle>${` ${product.price}`}</CardSubtitle>
                  <CardText>{product.description}</CardText>
                  <Button onClick={() => this.select(product)}>Select Product</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
          {this.props.error && <Badge color="danger">{this.props.error.stack}</Badge>}
        </Row>
      </Container>
    </App>
    )
  }
}

Home.defaultProps = {
  products: [],
  error: {}
};

Home.propTypes = {
  products: PropTypes.array,
  error: PropTypes.object
}

const mapStateToProps = ({product}) => {
  return {
    products: product.list ||  product.list,
    error: product.error || product.error
  }
}

export default connect(mapStateToProps, { fetchAllProducts, check })(Home)
