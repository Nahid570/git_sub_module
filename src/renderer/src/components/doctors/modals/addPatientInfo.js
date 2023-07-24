import React, { memo, useRef, useState } from 'react';
import { Modal, Button, Row, Col, Tab, Nav } from 'react-bootstrap';
import LoadingButton from '../../forms/LoadingButton';
import { ageCount } from '../../../utils/helpers';
import profileImg from '../../../img/profile.svg';
import BasicPatientInfo from '../partials/basicPatientInfo';
import MedicalPatientInfo from '../partials/medicalPatientInfo';
import OthersPatientInfo from '../partials/othersPatientInfo';
import { useClickAway } from 'react-use';

const AddPatientInfo = ({
  patientInfo,
  setPatientInfo,
  infoModal,
  setInfoModal,
  selectedOnExamination,
  setSelectedOnExamination,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ageOrDob, setAgeOrDob] = useState(false);
  const [errors, setErrors] = useState({});
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const ref = useRef(null);
  useClickAway(ref, () => {
    setInfoModal(false);
  });

  return (
    <>
      <Modal show={infoModal} size="lg">
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>Add Patient Info</Modal.Title>
          </Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              onClick={() => {
                setInfoModal(false);
              }}
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body className="pb-4" ref={ref}>
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="card shadow mb-4">
                <div className="card-body patient-history">
                  <Row>
                    <Col
                      md={3}
                      className="patient-details pt-3"
                      style={{ fontSize: '15px' }}
                    >
                      <div className="text-center">
                        <img
                          className="patient-history-profile-img rounded-circle"
                          src={profileImg}
                        />
                        <div className="font-weight-bold mt-2">
                          {patientInfo?.name}
                        </div>
                        <div>{patientInfo?.phoneNumber}</div>
                        <div>{patientInfo?.email}</div>
                        {/* { patientInfo?.id && <div>Patient ID: <b>{patientInfo?.id}</b></div>
                                                    <div className="mt-2">
                                                    <i className="fas fa-phone-alt mr-4" aria-hidden="true"></i>
                                                    <i className="fas fa-video mr-4" aria-hidden="true"></i>
                                                    <i className="fas fa-comment-alt" aria-hidden="true"></i>
                                                </div> */}
                      </div>
                      <hr />
                      <Row className="text-center">
                        <Col>
                          <Row>
                            <Col>
                              <div>Gender</div>
                              <div className="font-weight-bold mt-2">
                                {patientInfo?.gender}
                              </div>
                              <hr />
                            </Col>
                            <Col>
                              <div>Age</div>
                              <div className="font-weight-bold mt-2">
                                {ageCount(patientInfo?.dob)}
                              </div>
                              <hr />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div>Height</div>
                              <div className="font-weight-bold mt-2">
                                {
                                  selectedOnExamination?.generalExaminations
                                    ?.heightInfo?.feet
                                }
                                {selectedOnExamination?.generalExaminations
                                  ?.heightInfo?.inch
                                  ? '.' +
                                    selectedOnExamination.generalExaminations
                                      ?.heightInfo?.inch
                                  : ''}
                                {selectedOnExamination?.generalExaminations
                                  ?.heightInfo?.feet ||
                                selectedOnExamination.generalExaminations
                                  ?.heightInfo?.inch
                                  ? ' ' +
                                    selectedOnExamination.generalExaminations
                                      ?.heightInfo?.heightUnit
                                  : ''}
                              </div>
                              <hr />
                            </Col>
                            <Col>
                              <div>Weight</div>
                              <div className="font-weight-bold mt-2">
                                {selectedOnExamination?.generalExaminations
                                  ?.weightInfo?.weight
                                  ? selectedOnExamination.generalExaminations
                                      ?.weightInfo?.weight +
                                    ' ' +
                                    selectedOnExamination.generalExaminations
                                      ?.weightInfo?.weightUnit
                                  : ''}
                              </div>
                              <hr />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {/* <Row className="mb-2">
                                                <Col className="font-weight-bold text-center">
                                                    <div style={{ fontSize: "24px" }}>6</div>
                                                    <div>Past Appointments</div>
                                                </Col>
                                            </Row> */}
                      {/* <hr /> */}
                    </Col>
                    <Col md={9} className="pl-4">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="basic"
                      >
                        <Row
                          className="flex-row pb-2"
                          style={{ display: 'block' }}
                        >
                          <Nav variant="pills patient-info-pills">
                            <Nav.Item style={{ width: '33%' }}>
                              <Nav.Link
                                eventKey="basic"
                                className="text-center"
                              >
                                Basic Information
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item style={{ width: '33%' }}>
                              <Nav.Link
                                eventKey="medical"
                                className="text-center"
                              >
                                Medical Information
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item style={{ width: '33%' }}>
                              <Nav.Link
                                eventKey="others"
                                className="text-center"
                              >
                                Others
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Row>
                        <Tab.Content>
                          <Tab.Pane eventKey="basic">
                            <BasicPatientInfo
                              patientInfo={patientInfo}
                              setPatientInfo={setPatientInfo}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="medical">
                            <MedicalPatientInfo
                              patientInfo={patientInfo}
                              setPatientInfo={setPatientInfo}
                              selectedOnExamination={selectedOnExamination}
                              setSelectedOnExamination={
                                setSelectedOnExamination
                              }
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="others">
                            <OthersPatientInfo
                              patientInfo={patientInfo}
                              setPatientInfo={setPatientInfo}
                            />
                          </Tab.Pane>
                          {/* <div className="appointmentForm" style={{ padding: "0 25px" }}> */}
                          <Row className="mt-2 ml-1 mr-1 mb-2">
                            <Col className="text-center">
                              {isLoading ? (
                                <LoadingButton btnFull="yes" />
                              ) : (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  style={{ width: 'inherit' }}
                                  onClick={() => setInfoModal(false)}
                                >
                                  <b>Save</b>
                                </Button>
                              )}
                            </Col>
                          </Row>
                          {/* </div> */}
                        </Tab.Content>
                      </Tab.Container>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(AddPatientInfo);
