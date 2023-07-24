import React, { useEffect, useState } from 'react';
import Header from '../../components/doctors/partials/Header';
import { Row, Col } from 'react-bootstrap';
import AppointmentHistory from '../../components/doctors/partials/appointmentHistory';
import { useSelector } from 'react-redux';
import profileImg from '../../img/profile.svg';
import { Link, useLocation } from 'react-router-dom';
import { getRequest } from '../../utils/axiosRequests';
import {
  getPatientIdForDoctor,
  agePrint,
  separateDateTime,
} from '../../utils/helpers';

function PatientHistory() {
  const { state } = useLocation();
  const { patientData, appointment } = state;
  const [prescriptions, setPrescriptions] = useState([]);
  const [note, setNote] = useState('');
  const [generalExamination, setGeneralExamination] = useState({});
  const userInfo = useSelector((state) => state.authReducer.data);
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const patientSettings = useSelector(
    (state) => state?.prescriptionReducer?.prescriptionInfo?.patientSettings,
  );
  const ageProperties = patientSettings?.items?.find(
    (item) => item.name === 'age',
  );
  let { unitProperties } = ageProperties || {};
  const getPrescriptionList = async () => {
    let result = await getRequest(
      'prescriptions?organizationId=' +
        activeOrganization.id +
        '&patientId=' +
        patientData?.id,
    );
    const note = result?.note?.note;
    result = result.data;
    let length = result.length;
    let prescription =
      length > 0 ? (length === 1 ? result[0] : result[length - 1]) : {};
    setGeneralExamination(prescription?.onExaminations?.generalExaminations);
    setPrescriptions(result);
    setNote(note);
  };

  useEffect(() => {
    getPrescriptionList();
    countTotalItems();
  }, []);

  const countTotalItems = () => {
    let total = {
      chiefComplain: 0,
      diagnosis: 0,
      advice: 0,
      medicine: 0,
      followUp: 0,
    };
    prescriptions?.map((data, index) => {
      total.chiefComplain = total.chiefComplain + data?.chiefComplains?.length;
      total.diagnosis = total.diagnosis + data?.diagnoses?.length;
      total.medicine = total.medicine + data?.medicines?.length;
      total.followUp = total.followUp + data?.followUps?.length;
      total.advice = total.followUp + data?.advices?.length;
    });
    return total;
  };

  const addNewRxButton = () => {
    return (
      <div className="add-new-rx mb-3">
        <span>
          <i className="fa fa-plus pr-2"></i>
          Add New Rx
        </span>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        {/* <div className="row mb-3 mt-3">
          <Col>
            <Link to={'/appointments'}> Patient Appointment History</Link> > {patientData?.name}
          </Col>
        </div> */}
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4 card-content">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold">
                  <Link to={'/appointments'}> Patient Appointment History</Link>{' '}
                  <i className="fas fa-angle-right"></i> {patientData?.name}
                </h6>
              </div>

              <div className="card-body appointment-card-body">
                <div style={{ margin: '15px' }}>
                  <Row>
                    <Col
                      md={2}
                      className="patient-details patient-detail-history pt-3"
                    >
                      <div className="text-center">
                        <img
                          className="patient-history-profile-img rounded-circle"
                          src={profileImg}
                        />
                        <div className="font-weight-bold mt-2">
                          {patientData?.name}
                        </div>
                        <div>{patientData?.phoneNumber}</div>
                        <div>{patientData?.email}</div>
                        <div>
                          Patient ID:{' '}
                          <b>
                            {getPatientIdForDoctor(
                              patientData?.patientIdForDoctor,
                              userInfo,
                            )}
                          </b>
                        </div>
                        {/* <div className="mt-2">
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
                                {patientData?.gender}
                              </div>
                              <hr />
                            </Col>
                            <Col>
                              <div>Age</div>
                              <div className="font-weight-bold mt-2">
                                {agePrint(
                                  separateDateTime(patientData?.dob),
                                  unitProperties,
                                )}
                              </div>
                              <hr />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div>Height</div>
                              <div className="font-weight-bold mt-2">
                                {generalExamination?.heightInfo?.feet}
                                {generalExamination?.heightInfo?.inch
                                  ? '.' + generalExamination?.heightInfo?.inch
                                  : ''}{' '}
                                {generalExamination?.heightInfo?.heightUnit}
                              </div>
                              <hr />
                            </Col>
                            <Col>
                              <div>Weight</div>
                              <div className="font-weight-bold mt-2">
                                {generalExamination?.weightInfo?.weight}{' '}
                                {generalExamination?.weightInfo?.weightUnit}
                              </div>
                              <hr />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col className="font-weight-bold text-center">
                          <div style={{ fontSize: '24px' }}>
                            {prescriptions.length}
                          </div>
                          <div>Total Appointments</div>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col className="ml-1 mr-1">
                          <div className="mb-2 text-center font-weight-bold">
                            Summary of Total Appointments
                          </div>
                          <Row className="summary-box">
                            <Col>
                              <div className="font-weight-bold">
                                {countTotalItems().chiefComplain}
                              </div>
                              <div>Chief Complain</div>
                            </Col>
                            <Col>
                              <div className="font-weight-bold">
                                {countTotalItems().diagnosis}
                              </div>
                              <div>Diagnosis</div>
                            </Col>
                            <Col>
                              <div className="font-weight-bold">
                                {countTotalItems().medicine}
                              </div>
                              <div>Rx</div>
                            </Col>
                          </Row>
                          <Row className="summary-box">
                            <Col>
                              <div className="font-weight-bold">
                                {countTotalItems().followUp}
                              </div>
                              <div>Follow Up</div>
                            </Col>
                            <Col>
                              <div className="font-weight-bold">
                                {countTotalItems().advice}
                              </div>
                              <div>Advice</div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={10} className="pl-4">
                      {appointment && appointment?.status !== 'completed' ? (
                        <Link
                          to="/prescription"
                          state={{
                            appointment,
                            dob: patientData?.dob,
                            history: 'onlyAppointment',
                          }}
                        >
                          {addNewRxButton()}
                        </Link>
                      ) : (
                        <Link
                          to={'/prescription'}
                          state={{
                            patientData: patientData,
                            dob: patientData?.dob,
                            history: 'new',
                          }}
                        >
                          {addNewRxButton()}
                        </Link>
                      )}
                      <Row className="mt-2 application-history dotted-border ml-0">
                        <Col>
                          {prescriptions.length > 0 && (
                            <AppointmentHistory
                              prescriptions={prescriptions}
                              appointment={appointment}
                              note={note}
                            />
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHistory;
