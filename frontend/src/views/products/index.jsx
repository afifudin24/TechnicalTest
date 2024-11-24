import React, { useEffect, useState } from 'react';

import { Row, Col, Card, Table, Tabs, Tab, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import apiServices from 'services/api';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
const DashDefault = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newProduct, setNewProduct] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  function generateRandomId() {
    const prefix = 'ct';
    const timestamp = Date.now(); // Get the current timestamp
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
  const getCategories = async () => {
    try {
      const response = await apiServices.getCategories();
      console.log(response);
      setDataCategory(response.data);
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
  const handleShowModal = (modalType, ct) => {
    // Menutup semua modal sebelum membuka yang baru
    setAddModal(false);
    setDetailModal(false);
    setEditModal(false);
    setDeleteModal(false);
    setSelectedData(ct);

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
    setNewProduct(null);
    setAddModal(false);
    setDetailModal(false);
    setEditModal(false);
    setDeleteModal(false);
  };
  const handleEditChange = (e, editType) => {
    const { name, value } = e.target;
    switch (editType) {
      case 'add':
        setNewProduct((prevData) => ({
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
    console.log(newProduct);
    const newProductWithId = {
      pd_id: generateRandomId(), // Call the function to generate the ID
      pd_code: newProduct.pd_code,
      pd_name: newProduct.pd_name,
      pd_price: newProduct.pd_price,
      pd_ct_id: newProduct.pd_ct_id
    };

    try {
      const response = await apiServices.postProduct(newProductWithId);
      console.log(response);
      if (response.status === 201) {
        showToast('success', 'Success Add Product');
        setDataProduct([]);
        getProducts();
        handleClose();
      } else {
        showToast('error', 'Failed Add Product');
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Delete
  const handleDelete = async () => {
    try {
      const response = await apiServices.deleteProduct(selectedData._id);
      console.log(response);
      if (response.status === 200) {
        setDataProduct([]);
        getProducts();
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
      const response = await apiServices.updateProduct(selectedData._id, selectedData);
      console.log(response);
      if (response.status === 200) {
        setDataProduct([]);
        getProducts();
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
    getCategories();
    getProducts();
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Button onClick={() => handleShowModal('add')} size="sm">
                Add Product
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Code</th>
                    <th>Category Name</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProduct.length > 0 ? (
                    dataProduct.map((pd, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{pd.pd_code}</td>
                        <td>{pd.pd_ct_id.ct_name}</td>
                        <td>{pd.pd_name}</td>
                        <td>{pd.pd_price}</td>
                        <td>
                          <Button size="sm" onClick={() => handleShowModal('detail', pd)} variant="success">
                            Detail
                          </Button>
                          <Button size="sm" onClick={() => handleShowModal('edit', pd)} variant="warning">
                            Edit
                          </Button>
                          <Button onClick={() => handleShowModal('delete', pd)} variant="danger" size="sm">
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
                <strong>Product Code :</strong> {selectedData.pd_code}
              </p>
              <p>
                <strong>Category :</strong> {selectedData.pd_ct_id.ct_name}
              </p>
              <p>
                <strong>Product Name :</strong> {selectedData.pd_name}
              </p>
              <p>
                <strong>Product Price :</strong> {selectedData.pd_price}
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
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                name="pd_code"
                value={selectedData ? selectedData.pd_code : ''}
                onChange={(e) => handleEditChange(e, 'edit')}
                placeholder="Enter product code"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="pd_ct_id"
                value={selectedData && selectedData.pd_ct_id ? selectedData.pd_ct_id._id : ''}
                onChange={(e) => handleEditChange(e, 'edit')}
              >
                <option>Select Category</option>
                {dataCategory.length > 0
                  ? dataCategory.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.ct_name}
                      </option>
                    ))
                  : ''}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="pd_name"
                value={selectedData ? selectedData.pd_name : ''}
                onChange={(e) => handleEditChange(e, 'edit')}
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="pd_price"
                value={selectedData ? selectedData.pd_price : ''}
                onChange={(e) => handleEditChange(e, 'edit')}
                placeholder="Enter product price"
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
          <Modal.Title style={{ fontSize: '1.2rem' }}>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                name="pd_code"
                value={newProduct ? newProduct.pd_code : ''}
                onChange={(e) => handleEditChange(e, 'add')}
                placeholder="Enter product code"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Select name="pd_ct_id" onChange={(e) => handleEditChange(e, 'add')}>
                <option>Select Category</option>
                {dataCategory.length > 0
                  ? dataCategory.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.ct_name}
                      </option>
                    ))
                  : ''}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="pd_name"
                value={newProduct ? newProduct.pd_name : ''}
                onChange={(e) => handleEditChange(e, 'add')}
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="pd_price"
                value={newProduct ? newProduct.pd_price : ''}
                onChange={(e) => handleEditChange(e, 'add')}
                placeholder="Enter product price"
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
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
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
