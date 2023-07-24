import React, { useEffect } from 'react';
import Header from '../../components/doctors/partials/Header';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import PaginationComponent from '../../components/doctors/partials/paginationComponent';
import { useState } from 'react';
import { useGetRequest } from '../../hooks/useGetRequest';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../utils/helpers';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { userRole } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { data } from 'jquery';
import { deleteConfirmation } from '../../utils/helpers';
import { deleteRequest } from '../../utils/axiosRequests';

function PatientList() {
  const currentDate = moment().format('YYYY-MM-DD');
  const [patients, setPatients] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const userInfo = useSelector((state) => state.authReducer.data);
  const activeDoctor = useSelector(
    (state) => state.doctorsOfAssistantReducer.activeDoctor,
  );
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  //const [name, setName] = useState("");
  const [q, setQ] = useState('');
  const [patientId, setPatientId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientType, setPatientType] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [clearFilter, setClearFilter] = useState(true);
  const [patientDetails, setPatientDetails] = useState({});
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  const handlePatientProfleClose = () => setShowPatientProfile(false);
  const [serialSort, setSerialSort] = useState(false);
  const [firstTimeFlag, setFirstTimeFlag] = useState(true);
  const navigate = useNavigate();
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [gender, setGender] = useState('');

  // const { isLoading: isPatientLoading, refetch: getPatients } = useGetRequest(
  //   "get-patients",
  //   `patients/all-patients?page=${currentPage}${q ? "&q=" + q : ""}${
  //     gender ? "&gender=" + gender : ""
  //   }${startDate ? "&startDate=" + startDate : "2022-"}${
  //     endDate ? "&endDate=" + endDate : ""
  //   }&doctorId=${
  //     userRole(userInfo.userType) === "assistant"
  //       ? activeDoctor.id
  //       : userInfo.id
  //   }`,

  //   (data) => {
  //     if (currentPage === 1) {
  //       setPatients([...data.patients]);
  //       setItemsCount(data.total);
  //       setFirstTimeFlag(true);
  //     } else {
  //       if (patients.length < itemsCount) {
  //         setPatients([...patients, ...data.patients]);
  //         setItemsCount(data.total)
  //       }
  //     }
  //   },
  //   (e) => {
  //     console.log(e.message);
  //   }
  // );

  const { isLoading: isPatientLoading, refetch: getPatients } = useGetRequest(
    'get-patients',
    `patients/all-patients?page=${currentPage}${q ? '&q=' + q : ''}${
      gender ? '&gender=' + gender : ''
    }${startDate ? '&startDate=' + startDate : '2022-'}${
      endDate ? '&endDate=' + endDate : ''
    }&doctorId=${
      userRole(userInfo.userType) === 'assistant'
        ? activeDoctor.id
        : userInfo.id
    }`,

    (data) => {
      if (currentPage === 1) {
        setPatients([...data.patients]);
        setItemsCount(data.total);
        setFirstTimeFlag(true);
      } else {
        if (patients.length < itemsCount) {
          setPatients([...patients, ...data.patients]);
          setItemsCount(data.total);
        }
      }
    },
    (e) => {
      console.log(e.message);
    },
  );

  const getPatientId = (orgSeqs) => {
    const orgSeq = orgSeqs.find((item) => item.orgId === activeOrganization.id);
    if (orgSeq) return orgSeq.seq;
    else return '';
  };

  const deleteAction = (patientId) => {
    deleteRequest(`appointments/remove-appointments-with-patient/${patientId}`)
      .then((data) => {
        setPatients(patients.filter((patient) => patient.id !== patientId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPatientDob = (date) => {
    const dateParts = date.split(' ');
    if (dateParts.length > 3) {
      return (
        <>
          <span style={{ display: 'block', lineHeight: '8px' }}>
            {dateParts[0] + ' ' + dateParts[1] + ', ' + dateParts[2]}
          </span>
        </>
      );
    } else {
      return data;
    }
  };

  const getAppointmentPayment = (appointment) => {
    if (
      appointment?.paymentDetails &&
      appointment?.paymentDetails?.paymentStatus === 'completed'
    ) {
      return (
        <span className="payment-success">
          <i className="fas fa-check-circle"></i> Paid
        </span>
      );
    } else if (
      appointment?.paymentDetails &&
      appointment?.paymentDetails?.paymentStatus === 'pending'
    ) {
      return (
        <span className="payment-pending">
          <i className="fa fa-exclamation-circle"></i> Pending
        </span>
      );
    } else if (
      appointment?.paymentDetails &&
      appointment?.paymentDetails?.paymentStatus === 'unpaid'
    ) {
      return (
        <span className="payment-unpaid">
          <i className="fas fa-times-circle"></i> Unpaid
        </span>
      );
    } else if (
      appointment?.paymentDetails &&
      appointment?.paymentDetails?.paymentStatus === 'cancelled'
    ) {
      return (
        <span className="payment-cancelled">
          <i className="fa fa-minus-circle"></i> Cancelled
        </span>
      );
    } else {
      return <span>N/A</span>;
    }
  };

  useEffect(() => {
    if (firstTimeFlag) {
      getPatients();
    }
  }, [currentPage, clearFilter, firstTimeFlag]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPatients([]);
    setItemsCount(0);
    setClearFilter(false);
    setFirstTimeFlag(false);
    setCurrentPage(1);
    getPatients();
  };

  const handleClear = () => {
    setQ('');
    setPatientId('');
    setPhoneNumber('');
    setPatientType('');
    setAppointmentType('');
    setAppointmentStatus('');
    setGender('');
    setStartDate(currentDate);
    setEndDate(currentDate);
    // setFirstTimeFlag(false);
    setClearFilter(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    getPatients();
  }, []);

  let count = 1;

  const handleRowClick = (patient) => {
    navigate('/patient-history', {
      state: {
        patientData: { ...patient },
      },
    });
  };

  const goToPrescription = (patient) => {
    navigate('/prescription', {
      state: {
        patientData: { ...patient },
        history: 'new',
      },
    });
  };

  const getPatientIdForDoctor = (idList) => {
    let patientId = '';
    console.log('patientId for doctor: ', idList);
    idList?.forEach((item) => {
      if (item.doctorId === userInfo.id) {
        patientId = item.patientId;
      }
    });
    return patientId;
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Row>
          <div className="col-xl-12 col-md-12 col-lg-12">
            <div className="card shadow mb-4 card-content">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Patients</h6>
              </div>
              <div className="card-body appointment-card-body">
                <div style={{ margin: '15px' }}>
                  <Form>
                    <Row>
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          placeholder="Name, Patient Id, Phone Number"
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                        />
                      </Col>
                      {/* <Col>
                        <Form.Control
                          type="text"
                          placeholder="Patient ID"
                          value={patientId}
                          onChange={(e) => setPatientId(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Mobile number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </Col> */}
                      {/* <Col>
                        <Form.Select
                          className="form-control"
                          onChange={(e) => setPatientType(e.target.value)}
                          value={patientType}
                        >
                          <option value="">Patient Type</option>
                          <option value="new">New</option>
                          <option value="old">Old</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          className="form-control"
                          value={appointmentType}
                          onChange={(e) => setAppointmentType(e.target.value)}
                        >
                          <option value="">Appointment Type</option>
                          <option value="inPerson">Physical</option>
                          <option value="remote">Online</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select
                          className="form-control"
                          value={appointmentStatus}
                          onChange={(e) => setAppointmentStatus(e.target.value)}
                        >
                          <option value="">Appointment Status</option>
                          <option value="created">New</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="canceled">Canceled</option>
                          <option value="approved">Approved</option>
                        </Form.Select>
                      </Col>*/}
                      <Col>
                        <i
                          className="fa fa-bars"
                          style={{
                            marginRight: '15px',
                            fontSize: '20px',
                            cursor: 'pointer',
                          }}
                          onClick={() => setShowMoreFilter(!showMoreFilter)}
                        ></i>
                        <Button
                          variant="outline-success"
                          type="submit"
                          onClick={handleFilter}
                        >
                          <i className="fa fa-filter"></i> Filter
                        </Button>
                        <Button
                          style={{ marginLeft: '10px' }}
                          variant="outline-danger"
                          type="button"
                          onClick={handleClear}
                        >
                          <i className="fa fa-redo" title="Show More"></i> Clear
                        </Button>
                        {/* <Link
                          style={{ marginLeft: "40px" }}
                          to={"/new-appointment"}
                        >
                          <Button variant="success" type="submit">
                            <i className="fa fa-plus-circle"></i> Create New
                          </Button>
                        </Link> */}
                      </Col>
                    </Row>
                    {showMoreFilter && (
                      <Row style={{ marginTop: '10px' }}>
                        {/* <Col md={2}>
                          <Form.Select
                            className="form-control"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </Form.Select>
                        </Col> */}
                        <Col md={2}>
                          {/* <Form.Select
                            className="form-control"
                            value={appointmentType}
                            onChange={(e) => setAppointmentType(e.target.value)}
                          >
                            <option value="">Appointment Type</option>
                            <option value="inPerson">Physical</option>
                            <option value="remote">Online</option>
                          </Form.Select> */}
                        </Col>
                        <Col md={2}>
                          {/* <Form.Select
                            className="form-control"
                            value={appointmentStatus}
                            onChange={(e) => setAppointmentStatus(e.target.value)}
                          >
                            <option value="">Appointment Status</option>
                            <option value="created">New</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                            <option value="approved">Approved</option>
                          </Form.Select> */}
                        </Col>
                        <Col md={2}></Col>
                        <Col md={2}>
                          {/* <Row>
                            <Col
                              md={3}
                              style={{ marginRight: "-20px", paddingTop: "5px" }}
                            >
                              From:{" "}
                            </Col>
                            <Col md={9}>
                              <Form.Control
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                defaultValue={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </Col>
                          </Row> */}
                        </Col>
                        <Col md={2}>
                          {/* <Row>
                            <Col
                              md={2}
                              style={{ marginRight: "-20px", paddingTop: "5px" }}
                            >
                              To:{" "}
                            </Col>
                            <Col md={10} className="text-right">
                              <Form.Control
                                type="date"
                                name="endDate"
                                placeholder="To"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                // error={errors.date_of_birth}
                                // ref={register}
                              />
                            </Col>
                          </Row> */}
                        </Col>
                      </Row>
                    )}
                  </Form>
                  <Table hover>
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>No</th>
                        <th style={{ width: '25%' }}>Name</th>
                        <th style={{ width: '10%' }}>Patient Id</th>
                        <th style={{ width: '15%' }}>Mobile Number</th>
                        <th style={{ width: '10%' }}>Gender</th>
                        {/* <th style={{ width: "10%" }}>Date of Birth</th> */}
                        {/* <th style={{ width: "10%" }}>Visit Type</th>
                        <th style={{ width: "10%" }}>Date</th>
                        <th style={{ width: "10%" }}>Appointment Status</th>
                        <th style={{ width: "10%" }}>Payment Status</th> */}
                        <th className="text-center" style={{ width: '15%' }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (count =
                          1 &&
                          patients &&
                          patients.map((patient) => (
                            <tr
                              key={patient.id}
                              style={{ borderTop: '0px', cursor: 'pointer' }}
                              onClick={() => handleRowClick(patient)}
                            >
                              <td>{count++}</td>
                              <td
                                style={{
                                  color: '#4e73df',
                                }}
                              >
                                {patient?.name || ''}
                              </td>
                              <td>
                                {getPatientIdForDoctor(
                                  patient.patientIdForDoctor,
                                )}
                              </td>
                              <td>{patient?.phoneNumber || ''}</td>
                              <td>{capitalizeFirstLetter(patient?.gender)}</td>
                              <td style={{ textAlign: 'center' }}>
                                {/* <i
                                  style={{
                                    cursor: "pointer",
                                    color: "#1cc88a",
                                  }}
                                  className="fas fa-edit"
                                ></i> */}
                                {/* <Link
                                  to={'/prescription'}
                                  state={{
                                    patientData: patient,
                                    history: 'new',
                                  }}
                                >
                                  <i
                                    style={{
                                      cursor: 'pointer',
                                      color: '#1cc88a',
                                      marginLeft: '10px',
                                    }}
                                    className="fas fa-file-medical"
                                  ></i>
                                </Link> */}
                                <i
                                  style={{
                                    cursor: 'pointer',
                                    color: '#1cc88a',
                                  }}
                                  className="fas fa-file-medical"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrescription(patient);
                                  }}
                                ></i>
                                <i
                                  className="fa fa-trash ml-3"
                                  aria-hidden="true"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteConfirmation(
                                      deleteAction,
                                      patient.id,
                                    );
                                  }}
                                ></i>
                              </td>
                            </tr>
                          )))
                      }
                    </tbody>
                  </Table>
                  <div>
                    {patients && patients.length < itemsCount && (
                      <Button onClick={() => setCurrentPage(currentPage + 1)}>
                        Load More
                      </Button>
                    )}
                  </div>
                  {/* <PaginationComponent
                    itemsCount={itemsCount}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    alwaysShown={true}
                  /> */}
                </div>
              </div>
            </div>
          </div>

          <Modal
            size="lg"
            show={showPatientProfile}
            onHide={handlePatientProfleClose}
          >
            <Modal.Header className="common-modal-header">
              <Col>
                <Modal.Title>Patient profile</Modal.Title>
              </Col>
              <Col md={4}></Col>
              <Col md={1} style={{ textAlign: 'end' }}>
                <i
                  className="fa fa-times cursor-pointer"
                  aria-hidden="true"
                  onClick={handlePatientProfleClose}
                ></i>
              </Col>
            </Modal.Header>
            <Modal.Body>
              <b>Name</b>: {patientDetails.name ? patientDetails.name : ''}
              <br />
              <b>PatientId</b>: {patientDetails?.patientId || ''}
              <br />
              <b>Age</b>: {patientDetails?.age ? patientDetails?.age : ''}
              <br />
              <b>Phone Number</b>:{' '}
              {patientDetails?.phoneNumber ? patientDetails?.phoneNumber : ''}
              <br />
              <b>Gender</b>:{' '}
              {patientDetails?.gender ? patientDetails?.gender : ''}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePatientProfleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </div>
    </div>
  );
}

export default PatientList;
