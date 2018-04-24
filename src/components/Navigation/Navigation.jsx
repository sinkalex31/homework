import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    Container,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class Navigation extends Component {
    state = {
        isOpen: false,
    };

    toggle = () => this.setState({
        isOpen: !this.state.isOpen
    });

    render() {
        return (
            <Navbar dark fixed="top" expand="sm" className="bg-primary">
                <Container>
                    <Link className="navbar-brand" to="/">Customers</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="/create">Add new</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}