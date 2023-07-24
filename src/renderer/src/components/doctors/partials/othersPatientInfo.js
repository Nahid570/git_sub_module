import React, { useState, useEffect, memo } from 'react';
import {
  Modal,
  Button,
  ButtonGroup,
  Row,
  Col,
  Form,
  Tab,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OthersPatientInfo = (props) => {
  let { patientInfo, setPatientInfo, infoModal, setInfoModal, patientData } =
    props;
  let {
    name,
    dob,
    gender,
    phoneNumber,
    address,
    email,
    serialNumber,
    visitationFee,
    nid,
    reference_by,
    disease,
    registration_no,
    attachment,
  } = patientInfo;
  const [dob1, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ageOrDob, setAgeOrDob] = useState(true);
  const [errors, setErrors] = useState({});

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const handleSubmit = () => {};
  return (
    <div className="patient-info">
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label className="label-custom">NID</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter NID"
              value={nid}
              defaultValue={nid}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, nid: e.target.value })
              }
            />
            <small className="v-error">{getErrorMessage('name')}</small>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="d-block label-custom">
              Reference By
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Reference By"
              defaultValue={reference_by}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, reference_by: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label className="label-custom">Registration No</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter Registration No"
              value={registration_no}
              defaultValue={registration_no}
              onChange={(e) =>
                setPatientInfo({
                  ...patientInfo,
                  registration_no: e.target.value,
                })
              }
            />
            <small className="v-error">
              {getErrorMessage('registration_no')}
            </small>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="d-block label-custom">Disease</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Disease"
              defaultValue={disease}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, disease: e.target.value })
              }
            />
            <small className="v-error">{getErrorMessage('disease')}</small>
          </Form.Group>
        </Col>
      </Row>
      {/* <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label className="label-custom">Attachment</Form.Label>
                        <Form.Control size="sm" type="file" placeholder="Enter Registration No" value={attachment} defaultValue={attachment} onChange={(e) => setPatientInfo({ ...patientInfo, 'attachment': e.target.value })} />
                        <small className="v-error">{getErrorMessage('registration_no')}</small>
                    </Form.Group>
                </Col>
            </Row> */}
    </div>
  );
};

export default memo(OthersPatientInfo);
