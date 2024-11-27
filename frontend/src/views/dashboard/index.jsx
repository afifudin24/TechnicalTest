import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import apiServices from 'services/api';

const DashDefault = () => {
  document.title = 'Dashboard';
  const [dataCount, setDataCount] = useState(null);
  const getAllCount = async () => {
    try {
      const response = await apiServices.getCountAll();
      console.log(response);
      setDataCount(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCount();
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Users</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-user text-c-green  f-30 m-r-5`} /> {dataCount ? dataCount.userCount : '0'}
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Products</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-package text-c-green  f-30 m-r-5`} /> {dataCount ? dataCount.productsCount : '0'}
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Categories</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-folder text-c-green  f-30 m-r-5`} /> {dataCount ? dataCount.categoriesCount : '0'}
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xxl={4}>
          <Card>
            <Card.Body>
              <h6 className="mb-4">Orders</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    <i className={`feather icon-shopping-cart text-c-green  f-30 m-r-5`} /> {dataCount ? dataCount.orderCount : '0'}
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
