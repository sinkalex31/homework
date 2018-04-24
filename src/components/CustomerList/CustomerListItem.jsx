import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import { CustomerPropTypes } from 'utils/propTypes';

export default class CustomerListItem extends Component {
    static propTypes = {
        customer: CustomerPropTypes.isRequired,
    };

    state = {
        toggle: false,
    };

    toggle = () => this.setState({
        modal: !this.state.modal,
    });

    render () {
        const { customer: { id, email, metadata: { fullName } }, removeCustomer } = this.props;

        return (
            <ListGroupItem
                action
            >
                <Link to={`/customer/${id}`}>
                    <ListGroupItemHeading>{fullName}</ListGroupItemHeading>
                    <ListGroupItemText>{email}</ListGroupItemText>
                </Link>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Remove customer {fullName}?
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to remove this customer information?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            removeCustomer(id);
                            this.toggle();
                        }}>
                            Yes
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button onClick={this.toggle}>Remove</Button>
            </ListGroupItem>
        );
    }
};