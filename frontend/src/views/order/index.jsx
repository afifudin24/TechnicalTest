import React, { useEffect, useState } from 'react';

import { Row, Col, Card, Table, Tabs, Tab, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import apiServices from 'services/api';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
const DashDefault = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newOrder, setNewOrder] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  function generateRandomId() {
    const prefix = 'ORD';
    const timestamp = Date.now() % 100000;
    return `${prefix}${timestamp}`; // Combine prefix with timestamp
  }
  // show toast
  const showToast = (type, message) => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    };

    if (type === 'success') {
      toast.success(message, toastOptions);
    } else if (type === 'error') {
      toast.error(message, toastOptions);
    }
  };
  const getOrders = async () => {
    try {
      const response = await apiServices.getOrders();
      setDataOrder(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getProducts = async () => {
    try {
      const response = await apiServices.getProducts();
      console.log('product', response);
      setDataProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowModal = (modalType, or) => {
    // Menutup semua modal sebelum membuka yang baru
    setAddModal(false);
    setDetailModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setSelectedData(or);
    console.log('or', or);
    // Menentukan modal mana yang akan ditampilkan
    switch (modalType) {
      case 'add':
        setAddModal(true);
        break;
      case 'detail':
        setDetailModal(true);
        break;
      case 'edit':
        setEditModal(true);
        break;
      case 'delete':
        setDeleteModal(true);
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    setSelectedData(null);
    setNewOrder(null);
    setAddModal(false);
    setDetailModal(false);
    setEditModal(false);
    setDeleteModal(false);
  };
  const handleEditChange = (e, editType) => {
    const { name, value } = e.target;
    switch (editType) {
      case 'add':
        setNewOrder((prevData) => ({
          ...prevData,
          [name]: value // Handle checkbox separately
        }));
        break;
      case 'edit':
        setSelectedData((prevData) => ({
          ...prevData,
          [name]: value // Handle checkbox separately
        }));
        break;
      default:
        break;
    }
  };

  // CRUD
  // Add
  const handleAddSubmit = async () => {
    console.log(newOrder);
    const newOrderWithId = {
      or_id: generateRandomId(), // Call the function to generate the ID
      or_pd_id: newOrder.or_pd_id,
      or_amount: newOrder.or_amount
    };

    try {
      const response = await apiServices.postOrder(newOrderWithId);
      console.log(response);
      if (response.status === 201) {
        showToast('success', 'Success Add Order');
        setDataOrder([]);
        getOrders();
        handleClose();
      } else {
        showToast('error', 'Failed Add Order');
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Delete
  const handleDelete = async () => {
    try {
      const response = await apiServices.deleteOrder(selectedData._id);
      console.log(response);
      if (response.status === 200) {
        setDataOrder([]);
        getOrders();
        showToast('success', 'Product deleted successfully');
        handleClose(); // Close the modal
      } else {
        showToast('error', 'Product deleted failed');
        handleClose(); // Close the modal
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Edit
  const handleEditSubmit = async () => {
    console.log(selectedData);
    try {
      const response = await apiServices.updateOrder(selectedData._id, selectedData);
      console.log('res', response);
      if (response.status === 200) {
        setDataOrder([]);
        getOrders();
        showToast('success', 'Product updated successfully');
        handleClose();
      } else {
        showToast('error', 'Product updated failed');
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrders();
    getProducts();
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Button onClick={() => handleShowModal('add')} size="sm">
                Add Order
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Order Amount</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataOrder.length > 0 ? (
                    dataOrder.map((or, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{or.or_id}</td>
                        <td>{or.or_pd_id.pd_name}</td>
                        <td>{or.or_pd_id.pd_price}</td>
                        <td>{or.or_amount}</td>
                        <td>{or.or_pd_id.pd_price * or.or_amount}</td>
                        <td>
                          <Button size="sm" onClick={() => handleShowModal('detail', or)} variant="success">
                            Detail
                          </Button>
                          <Button size="sm" onClick={() => handleShowModal('edit', or)} variant="warning">
                            Edit
                          </Button>
                          <Button onClick={() => handleShowModal('delete', or)} variant="danger" size="sm">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Tidak Ada Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={detailModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.2rem' }}>Detail Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          {selectedData ? (
            <div>
              <p>
                <strong>Order ID :</strong> {selectedData.or_id}
              </p>
              <p>
                <strong>Product Name :</strong> {selectedData.or_pd_id.pd_name}
              </p>
              <p>
                <strong>Product Price :</strong> {selectedData.or_pd_id.pd_price}
              </p>
              <p>
                <strong>Order Amount :</strong> {selectedData.or_amount}
              </p>
              <p>
                <strong>Total :</strong> {selectedData.or_pd_id.pd_price * selectedData.or_amount}
              </p>
            </div>
          ) : (
            <p>Nothing Data</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" size="sm" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={editModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.2rem' }}>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCategoryId">
              <Form.Label>Product</Form.Label>
              <Form.Select
                name="or_pd_id"
                value={selectedData ? selectedData.or_pd_id._id : ''}
                onChange={(e) => handleEditChange(e, 'edit')}
              >
                <option>Select Product</option>
                {dataProduct.length > 0
                  ? dataProduct.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.pd_name}
                      </option>
                    ))
                  : ''}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Amount Order</Form.Label>
              <Form.Control
                type="number"
                name="or_amount"
                value={selectedData ? selectedData.or_amount : ''}
                onChange={(e) => handleEditChange(e, 'edit')}
                placeholder="Enter Amount Order"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleEditSubmit}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Modal */}
      <Modal show={addModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.2rem' }}>Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCategoryId">
              <Form.Label>Product</Form.Label>
              <Form.Select name="or_pd_id" onChange={(e) => handleEditChange(e, 'add')}>
                <option>Select Product</option>
                {dataProduct.length > 0
                  ? dataProduct.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.pd_name}
                      </option>
                    ))
                  : ''}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Amount Order</Form.Label>
              <Form.Control
                type="number"
                name="or_amount"
                value={newOrder ? newOrder.pd_price : ''}
                onChange={(e) => handleEditChange(e, 'add')}
                placeholder="Enter Amount Order"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleAddSubmit}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal delete */}
      <Modal show={deleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DashDefault;
