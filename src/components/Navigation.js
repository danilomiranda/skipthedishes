import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge } from 'reactstrap';

import './Navigation.css'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="faded" light expand="md" fixed="top">
        <NavbarBrand href="/">skipTheDishes</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                caret={this.props.cart.length > 0 ? true : false}
              >
                {`Cart `} 
                <Badge color="info">{this.props.cart.length}</Badge>
              </DropdownToggle>
              <DropdownMenu >
                {this.props.cart.length > 0 ? this.props.cart.map((product) => (
                  <React.Fragment key={product.id}>
                    <DropdownItem>
                      {product.name}
                    </DropdownItem>
                    <DropdownItem divider />
                  </React.Fragment>
                )) : ''}
                  <DropdownItem>
                  <Link to="/cartResume" className="view-resume">
                    View Resume
                  </Link>
                  </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/signout">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Navigation.defaultProps = {
  products: [],
  error: {}
};

Navigation.propTypes = {
  products: PropTypes.array,
  error: PropTypes.object
}

const mapStateToProps = ({ product }) => {
    return {
    cart: product.cart
  }
}

export default connect(mapStateToProps)(Navigation)
