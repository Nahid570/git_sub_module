import { memo, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { oncologyList } from '../../../utils/helpers';
import SearchArea from '../partials/searchArea';

const Staging = () => {
  const handleOnInputChange = () => {};
  const handleSearchOrNew = () => {};

  return (
    <div className="staging">
      <Row className="title">
        <Col md={2} className="pt-1">
          TNM Staging:
          {/* <Button
            size="sm"
            className="customize-btn"
            variant="outline-secondary"
          >
            Types &nbsp;<i className="fa fa-angle-down"></i>
          </Button> */}
        </Col>
        <Col md={5}>
          {/* <Form.Select className="form-control form-control-sm">
            <option>Please Select One</option>
            {oncologyList.map((data, key) => {
              return (
                <option key={key} value={data.id}>
                  {data.name}
                </option>
              )
            })}
          </Form.Select> */}
          <SearchArea
            handleOnInputChange={handleOnInputChange}
            handleSearchOrNew={handleSearchOrNew}
            searchQuery={''}
            options={oncologyList()}
            placeholder={'TNM staging'}
          />
        </Col>
      </Row>
      <hr />
      <Row className="mt-2">
        <Col md={2} className="pt-2">
          Tumor:
        </Col>
        <Col>
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <Form.Control size="sm" type="text" placeholder="Search" />
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={2} className="pt-2">
          Nodes:
        </Col>
        <Col>
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <Form.Control size="sm" type="text" placeholder="Search" />
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={2} className="pt-2">
          Metastasis:
        </Col>
        <Col>
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <Form.Control size="sm" type="text" placeholder="Search" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Staging);
