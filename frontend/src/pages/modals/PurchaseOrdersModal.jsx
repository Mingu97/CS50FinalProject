// PurchaseOrderModal.jsx
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const PurchaseOrderModal = ({ show, handleClose, purchaseOrderItems }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Purchase Order Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Supplier Product Code</th>
                            <th>Brand</th>
                            <th>Description</th>
                            <th>Item Code</th>
                            <th>Item Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrderItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.supplierProductCode}</td>
                                <td>{item.brand}</td>
                                <td>{item.description}</td>
                                <td>{item.itemCode}</td>
                                <td>{item.itemQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default PurchaseOrderModal;
