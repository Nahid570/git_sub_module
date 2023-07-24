import React, { useState, useEffect } from 'react';
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
import GeneralExaminationBtn from '../partials/generalExaminationBtn';
import { memo } from 'react';

const MedicalPatientInfo = ({
  patientInfo,
  setPatientInfo,
  selectedOnExamination,
  setSelectedOnExamination,
}) => {
  let generalExaminations = selectedOnExamination?.generalExaminations;
  const [dob, setDob] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [isGeneralExaminationBtn, setIsGeneralExaminationBtn] = useState(false);
  const [btnInputArray, setBtnInputArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ageOrDob, setAgeOrDob] = useState(true);
  const [errors, setErrors] = useState({});

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const handleInput = (fieldName, val) => {
    setFieldName('');
    if (fieldName === 'bloodGroup') {
      generalExaminations[fieldName] =
        generalExaminations[fieldName] === val ? '' : val;
    } else if (fieldName === 'systolic' || fieldName === 'diastolic') {
      generalExaminations.bloodPressure[fieldName] = val;
    } else if (
      fieldName === 'pulse' ||
      fieldName === 'pulseUnit' ||
      fieldName === 'pulseType'
    ) {
      if (fieldName === 'pulseType') {
        generalExaminations.pulseInfo[fieldName] =
          generalExaminations.pulseInfo[fieldName] === val ? '' : val;
      } else {
        generalExaminations.pulseInfo[fieldName] = val;
      }
    } else if (fieldName === 'temperature' || fieldName === 'temperatureUnit') {
      generalExaminations.temperatureInfo[fieldName] = val;
    } else if (fieldName === 'temperatureType') {
      generalExaminations.temperatureInfo[fieldName] = generalExaminations
        .temperatureInfo[fieldName]
        ? ''
        : val;
    } else if (
      fieldName === 'weight' ||
      fieldName === 'weightUnit' ||
      fieldName === 'weightShowInPrescription'
    ) {
      generalExaminations.weightInfo[fieldName] = val;
    } else if (
      fieldName === 'feet' ||
      fieldName === 'inch' ||
      fieldName === 'heightUnit'
    ) {
      generalExaminations.heightInfo[fieldName] = val;
    }
    selectedOnExamination.generalExaminations = generalExaminations;
    setSelectedOnExamination({ ...selectedOnExamination });
    setIsGeneralExaminationBtn(false);
  };

  const handleBtnInputArray = (field) => {
    setFieldName(field);
    let buttonArray;
    if (field === 'systolic') {
      buttonArray = [
        70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
      ];
    } else if (field === 'diastolic') {
      buttonArray = [40, 50, 60, 70, 80, 90, 100, 110, 120];
    } else if (field === 'pulse') {
      buttonArray = [
        40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
      ];
    } else if (field === 'temperature') {
      buttonArray = [95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    } else if (field === 'weight') {
      buttonArray = [40, 45, 50, 55, 60, 65, 70, 75, 80];
    } else if (field === 'feet') {
      buttonArray = [3, 4, 5, 6, 7];
    } else if (field === 'inch') {
      buttonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    } else if (field === 'idealWeight') {
      buttonArray = [40, 45, 50, 55, 60, 65, 70, 75, 80];
    }
    setIsGeneralExaminationBtn(isGeneralExaminationBtn ? false : true);
    setBtnInputArray(buttonArray);
  };

  return (
    <div className="patient-info">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="label-custom d-block">Gender</Form.Label>
            <div className="common-small-btn">
              <Button
                size="sm"
                variant={
                  patientInfo.gender === 'male'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() =>
                  setPatientInfo({ ...patientInfo, gender: 'male' })
                }
              >
                Male
              </Button>
              <Button
                size="sm"
                variant={
                  patientInfo.gender === 'female'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() =>
                  setPatientInfo({ ...patientInfo, gender: 'female' })
                }
              >
                Female
              </Button>
              <Button
                size="sm"
                variant={
                  patientInfo.gender === 'others'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() =>
                  setPatientInfo({ ...patientInfo, gender: 'others' })
                }
              >
                Others
              </Button>
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="label-custom d-block">
              <span>Height</span>
              <ButtonGroup
                className="patient-info-btn-group mb-1"
                aria-label="Basic example"
              >
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.heightInfo?.heightUnit === 'Ft'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() => handleInput('heightUnit', 'Ft')}
                >
                  Ft
                </Button>
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.heightInfo?.heightUnit === 'Cm'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() => handleInput('heightUnit', 'Cm')}
                >
                  Cm
                </Button>
              </ButtonGroup>
            </Form.Label>
            <div className="d-flex justify-content-space-between">
              <Form.Control
                className="mr-3"
                size="sm"
                type="number"
                placeholder="Enter Feet"
                defaultValue={generalExaminations?.heightInfo?.feet}
                onClick={() => handleBtnInputArray('feet')}
                onChange={(e) => handleInput('feet', e.target.value)}
              />
              <Form.Control
                size="sm"
                type="number"
                defaultValue={generalExaminations?.heightInfo?.inch}
                placeholder="Inch"
                onClick={() => handleBtnInputArray('inch')}
                onChange={(e) => handleInput('inch', e.target.value)}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
      {isGeneralExaminationBtn &&
        (fieldName === 'feet' || fieldName === 'inch') && (
          <Row className={fieldName === 'inch' ? 'mb-1' : ''}>
            <Col md={fieldName === 'feet' ? 6 : 4}></Col>
            <Col md={fieldName === 'feet' ? 6 : 8}>
              <GeneralExaminationBtn
                fieldName={fieldName}
                btnInputArray={btnInputArray}
                onClickAction={handleInput}
              />
            </Col>
          </Row>
        )}
      <Row
        className={fieldName === 'feet' || fieldName === 'inch' ? '' : 'mt-3'}
      >
        <Col>
          <Form.Group>
            <Form.Label className="label-custom d-block d-flex justify-content-space-between">
              <span>Blood Pressure</span>
              <span style={{ paddingLeft: '65px' }}>mm HG</span>
            </Form.Label>
            <div className="d-flex justify-content-space-between">
              <Form.Control
                className="mr-2"
                size="sm"
                type="number"
                placeholder="Systolic"
                defaultValue={generalExaminations?.bloodPressure?.systolic}
                onClick={() => handleBtnInputArray('systolic')}
                onChange={(e) => handleInput('systolic', e.target.value)}
              />
              <div style={{ fontSize: '25px' }}>/</div>
              <Form.Control
                className="ml-2"
                size="sm"
                type="number"
                placeholder="Diastolic"
                defaultValue={generalExaminations?.bloodPressure?.diastolic}
                onClick={() => handleBtnInputArray('diastolic')}
                onChange={(e) => handleInput('diastolic', e.target.value)}
              />
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="d-block label-custom">
              <span>Temperature</span>
              <ButtonGroup
                className="patient-info-btn-group"
                aria-label="Basic example"
              >
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.temperatureInfo?.temperatureUnit ===
                    'F'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() => handleInput('temperatureUnit', 'F')}
                >
                  <span>&#8451;</span>
                </Button>
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.temperatureInfo?.temperatureUnit ===
                    'C'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() => handleInput('temperatureUnit', 'C')}
                >
                  <span>&#8457;</span>
                </Button>
              </ButtonGroup>
            </Form.Label>
            <div className="d-flex justify-content-space-between">
              <Form.Control
                size="sm"
                type="number"
                defaultValue={generalExaminations?.temperatureInfo?.temperature}
                placeholder="Temperature"
                onClick={() => handleBtnInputArray('temperature')}
                onChange={(e) => handleInput('temperature', e.target.value)}
              />
              <Button
                className="ml-2 btn-sm-customize"
                variant={
                  generalExaminations?.temperatureInfo?.temperatureType ===
                  'Normal'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={(e) => handleInput('temperatureType', 'Normal')}
              >
                Normal
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>
      {isGeneralExaminationBtn &&
        (fieldName === 'systolic' || fieldName === 'diastolic') && (
          <Row>
            <Col md={12}>
              <GeneralExaminationBtn
                fieldName={fieldName}
                btnInputArray={btnInputArray}
                onClickAction={handleInput}
              />
            </Col>
          </Row>
        )}
      {isGeneralExaminationBtn && fieldName === 'temperature' && (
        <Row>
          <Col md={2}></Col>
          <Col md={10}>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleInput}
            />
          </Col>
        </Row>
      )}
      <Row
        className={
          fieldName === 'pulse' || fieldName === 'weight' ? '' : 'mt-3'
        }
      >
        <Col md={6}>
          <Form.Group>
            <Form.Label className="d-block label-custom">
              <span>Pulse</span>
              <ButtonGroup
                className="patient-info-btn-group mb-1"
                aria-label="Basic example"
              >
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.pulseInfo?.pulseUnit === 'PM'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() => handleInput('pulseUnit', 'PM')}
                >
                  PM
                </Button>
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.pulseInfo?.pulseUnit === 'BPM'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={() => handleInput('pulseUnit', 'BPM')}
                >
                  BPM
                </Button>
              </ButtonGroup>
            </Form.Label>
            <div className="d-flex justify-content-space-between">
              <Form.Control
                size="sm"
                type="number"
                placeholder="Pulse"
                defaultValue={generalExaminations?.pulseInfo?.pulse}
                onClick={() => handleBtnInputArray('pulse')}
                onChange={(e) => handleInput('pulse', e.target.value)}
              />
              <Button
                className="ml-2 btn-sm-customize"
                size="sm"
                variant={
                  generalExaminations?.pulseInfo?.pulseType === 'Regular'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={(e) => handleInput('pulseType', 'Regular')}
              >
                Regular
              </Button>
              <Button
                className="ml-2 btn-sm-customize"
                size="sm"
                variant={
                  generalExaminations?.pulseInfo?.pulseType === 'Irregular'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={(e) => handleInput('pulseType', 'Irregular')}
              >
                Irregular
              </Button>
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="label-custom d-block">
              <span>Weight</span>
              <ButtonGroup
                className="patient-info-btn-group mb-1"
                aria-label="Basic example"
              >
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.weightInfo?.weightUnit === 'KG'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={(e) => handleInput('weightUnit', 'KG')}
                >
                  KG
                </Button>
                <Button
                  size="sm"
                  variant={
                    generalExaminations?.weightInfo?.weightUnit === 'Pound'
                      ? 'primary'
                      : 'outline-secondary'
                  }
                  onClick={(e) => handleInput('weightUnit', 'Pound')}
                >
                  Pound
                </Button>
              </ButtonGroup>
            </Form.Label>
            <Form.Control
              size="sm"
              defaultValue={generalExaminations?.weightInfo?.weight}
              placeholder="Weight"
              onClick={() => handleBtnInputArray('weight')}
              onChange={(e) => handleInput('weight', e.target.value)}
            />
            <small className="v-error">{getErrorMessage('dob')}</small>
          </Form.Group>
        </Col>
      </Row>
      {isGeneralExaminationBtn && fieldName === 'weight' && (
        <Row>
          <Col md={4}></Col>
          <Col md={8}>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleInput}
            />
          </Col>
        </Row>
      )}
      {isGeneralExaminationBtn && fieldName === 'pulse' && (
        <Row>
          <Col>
            <GeneralExaminationBtn
              fieldName={fieldName}
              btnInputArray={btnInputArray}
              onClickAction={handleInput}
            />
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label className="label-custom">Blood Group</Form.Label>
            <div className="common-small-btn">
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'O+'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'O+')}
              >
                O+
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'O-'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'O-')}
              >
                O-
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'A+'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'A+')}
              >
                A+
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'A-'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'A-')}
              >
                A-
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'B+'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'B+')}
              >
                B+
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'B-'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'B-')}
              >
                B-
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'AB+'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'AB+')}
              >
                AB+
              </Button>
              <Button
                size="sm"
                variant={
                  generalExaminations?.bloodGroup === 'AB-'
                    ? 'primary'
                    : 'outline-secondary'
                }
                onClick={() => handleInput('bloodGroup', 'AB-')}
              >
                AB-
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default memo(MedicalPatientInfo);
