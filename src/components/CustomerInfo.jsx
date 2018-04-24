import React, { Component } from 'react';

import { CustomerPropTypes } from 'utils/propTypes';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Jumbotron,
} from 'reactstrap';

import { CustomerForm } from 'components';

export default class CustomerInfo extends Component {
    static propTypes = {
        customer: CustomerPropTypes.isRequired,
    };

    state = {
        modal: false,
    };

    toggle = () => this.setState({
        modal: !this.state.modal,
    });

    render() {
        const { customer: { id, email, metadata: { fullName, formatted, coordinates } }} = this.props;

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Customer {fullName} editing
                    </ModalHeader>
                    <ModalBody>
                        <CusutomerForm
                            initialValues={{ email, fullName, address: { formatted, coordinates }  }}
                            id={id}
                            isEditing
                            callback={() => this.toggle()}
                        />
                    </ModalBody>
                </Modal>
                <Jumbotron>
                    <h1 className="display-3">{fullName}</h1>
                    <p className="lead"><b>Email:</b> {email}</p>
                    <hr className="my-2" />
                    <p><b>Address:</b> {formatted}</p>
                    <p className="lead">
                        <Button onClick={this.toggle}>
                            Edit
                        </Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
};