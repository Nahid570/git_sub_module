import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  InputGroup,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { userRole } from '../../../utils/helpers';

const BasicPatientInfo = ({ patientInfo, setPatientInfo }) => {
  let { dob } = patientInfo;
  const userInfo = useSelector((state) => state.authReducer.data);
  const [ageOrDob, setAgeOrDob] = useState(false);
  const [errors, setErrors] = useState({});

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const handleAge = (fieldName, val) => {
    setPatientInfo({
      ...patientInfo,
      dob: { ...patientInfo.dob, [fieldName]: val },
    });
  };

  return (
    <div className="patient-info">
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="label-custom">Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter name"
              defaultValue={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
            />
            <small className="v-error">{getErrorMessage('name')}</small>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="d-block label-custom">
              <span>Age</span>
              <InputGroup className="mb-3">
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue={dob?.years}
                  placeholder="Year"
                  onChange={(e) => handleAge('years', e.target.value)}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue={dob?.months}
                  placeholder="Month"
                  onChange={(e) => handleAge('months', e.target.value)}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  defaultValue={dob?.days}
                  placeholder="Day"
                  onChange={(e) => handleAge('days', e.target.value)}
                />
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Hour"
                  defaultValue={dob?.hours}
                  onChange={(e) => handleAge('hours', e.target.value)}
                />
              </InputGroup>
            </Form.Label>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="label-custom">Phone No.</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              defaultValue={patientInfo.phoneNumber}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, phoneNumber: e.target.value })
              }
              placeholder="Enter phone number"
            />
            <small className="v-error">{getErrorMessage('phoneNumber')}</small>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="label-custom">Address</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter address"
              defaultValue={patientInfo.address}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, address: e.target.value })
              }
            />
            <small className="v-error">{getErrorMessage('address')}</small>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="label-custom">Email</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter email"
              defaultValue={patientInfo.email}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, email: e.target.value })
              }
            />
            <small className="v-error">{getErrorMessage('email')}</small>
          </Form.Group>
        </Col>
        {userRole(userInfo?.userType) === 'assistant' && (
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="label-custom">Serial Number</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                onChange={(e) =>
                  setPatientInfo({
                    ...patientInfo,
                    serialNumber: e.target.value,
                  })
                }
              />
              <small className="v-error">
                {getErrorMessage('serialNumber')}
              </small>
            </Form.Group>
          </Col>
        )}
      </Row>
      {userRole(userInfo?.userType) === 'assistant' && (
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="d-block label-custom">
                <span>Visitation Fee</span>
                <ButtonGroup
                  className="patient-info-btn-group"
                  aria-label="Basic example"
                >
                  <Button
                    size="sm"
                    variant={!ageOrDob ? 'primary' : 'outline-secondary'}
                    onClick={() => setAgeOrDob(false)}
                  >
                    New
                  </Button>
                  <Button
                    size="sm"
                    variant={ageOrDob ? 'primary' : 'outline-secondary'}
                    onClick={() => setAgeOrDob(true)}
                  >
                    Old
                  </Button>
                </ButtonGroup>
              </Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Enter visitation fee"
                onChange={(e) =>
                  setPatientInfo({
                    ...patientInfo,
                    visitationFee: e.target.value,
                  })
                }
              />
              <small className="v-error">
                {getErrorMessage('visitationFee')}
              </small>
            </Form.Group>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default memo(BasicPatientInfo);
