import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/doctors/partials/Header';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PaginationComponent from '../../components/doctors/partials/paginationComponent';
import { useState } from 'react';
import { useGetRequest } from '../../hooks/useGetRequest';
import { useSelector } from 'react-redux';
import {
  capitalizeFirstLetter,
  getPatientIdForDoctor,
} from '../../utils/helpers';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { userRole } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { data } from 'jquery';

function Appointments() {
  const currentDate = moment().format('YYYY-MM-DD');
  const [appointments, setAppointments] = useState([]);
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
  const location = useLocation();
  const appointStatus = location?.state?.status ? location?.state?.status : '';

  const {
    isLoading: isAppointmentLoading,
    refetch: getAppointments,
  } = useGetRequest(
    'get-appointments',
    `appointments?organizationId=${activeOrganization.id}&page=${currentPage}${
      q ? '&q=' + q : ''
    }${patientId ? '&patientId=' + patientId : ''}${
      phoneNumber ? '&phoneNumber=' + phoneNumber : ''
    }${patientType ? '&patientType=' + patientType : ''}${
      appointmentType ? '&appointmentType=' + appointmentType : ''
    }${
      appointmentStatus !== 'all'
        ? appointmentStatus
          ? '&appointmentStatus=' + appointmentStatus
          : '&appointmentStatus=' + appointStatus
        : ''
    }${startDate ? '&startDate=' + startDate : '2022-'}${
      endDate ? '&endDate=' + endDate : ''
    }&doctorId=${
      userRole(userInfo.userType) === 'assistant'
        ? activeDoctor.id
        : userInfo.id
    }`,

    (data) => {
      if (currentPage === 1) {
        setAppointments([...data.appointments]);
        setItemsCount(data.total);
        setFirstTimeFlag(true);
      } else {
        if (appointments.length < itemsCount) {
          setAppointments([...appointments, ...data.appointments]);
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

  const getAppointmentStatus = (status) => {
    if (status === 'new')
      return (
        <span
          className="btn-success"
          style={{ color: 'white', padding: '4px 30px', borderRadius: '3px' }}
        >
          New
        </span>
      );
    else if (status === 'completed')
      return (
        <span
          style={{
            color: 'white',
            padding: '4px 30px',
            borderRadius: '3px',
            backgroundColor: '#36b9cc',
          }}
        >
          Completed
        </span>
      );
    else return capitalizeFirstLetter(status);
  };

  const getAppointmentDateTime = (date) => {
    const dateParts = date.split(' ');
    if (dateParts.length > 4) {
      return (
        <>
          <span
            style={{
              display: 'block',
              lineHeight: '8px',
              paddingBottom: '4px',
            }}
          >
            {dateParts[0] + ' ' + dateParts[1] + ', ' + dateParts[2]}
          </span>
          <span style={{ fontSize: '12px', fontStyle: 'italic' }}>
            {dateParts[3] + dateParts[4]}
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
      getAppointments();
    }
  }, [currentPage, clearFilter, firstTimeFlag]);

  const getLoadMore = () => {
    setCurrentPage(currentPage + 1);
    getAppointments();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setAppointments([]);
    setItemsCount(0);
    setClearFilter(false);
    setFirstTimeFlag(false);
    setCurrentPage(1);
    getAppointments();
  };

  const handleClear = () => {
    setQ('');
    setPatientId('');
    setPhoneNumber('');
    setPatientType('');
    setAppointmentType('');
    setAppointmentStatus('');
    setStartDate(currentDate);
    setEndDate(currentDate);
    setClearFilter(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  useEffect(() => {
    getAppointments();
  }, [activeDoctor]);

  useEffect(() => {
    let sortedAppointments;
    if (serialSort) {
      sortedAppointments = appointments.sort(
        (a, b) => a.serialNumber - b.serialNumber,
      );
    } else {
      sortedAppointments = appointments.sort(
        (a, b) => b.serialNumber - a.serialNumber,
      );
    }
    setAppointments([...sortedAppointments]);
  }, [serialSort]);

  let count = 1;

  const handleRowClick = (appointment) => {
    navigate('/patient-history', {
      state: {
        appointment,
        patientData: { ...appointment.patientId },
      },
    });
  };

  const editPrescription = (data, type) => {
    console.log(data?.patientId?.dob, 'datadatadatadata');
    if (type === 'editFromList') {
      navigate('/prescription', {
        state: {
          appointmentInfo: data,
          history: type,
          dob: data?.patientId?.dob,
        },
      });
    } else if (type === 'onlyAppointment') {
      navigate('/prescription', {
        state: {
          appointment: data,
          history: type,
          dob: data?.patientId?.dob,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Row>
          <div className="col-xl-12 col-md-12 col-lg-12">
            <div className="card shadow mb-4 card-content">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Appointments
                </h6>
              </div>
              <div className="card-body appointment-card-body">
                <div style={{ margin: '15px' }}>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          className="form-control-sm"
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
                          className="btn-sm"
                          onClick={handleFilter}
                        >
                          <i className="fa fa-filter"></i> Filter
                        </Button>
                        <Button
                          style={{ marginLeft: '10px' }}
                          variant="outline-danger"
                          className="btn-sm"
                          type="button"
                          onClick={handleClear}
                        >
                          <i className="fa fa-redo" title="Show More"></i> Clear
                        </Button>
                        <Link
                          style={{ marginLeft: '40px' }}
                          to={'/new-appointment'}
                        >
                          <Button
                            variant="success"
                            type="submit"
                            className="btn-sm"
                          >
                            <i className="fa fa-plus-circle"></i> Create New
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                    {showMoreFilter && (
                      <Row style={{ marginTop: '10px' }}>
                        <Col md={2}>
                          <Form.Select
                            className="form-control form-control-sm"
                            onChange={(e) => setPatientType(e.target.value)}
                            value={patientType}
                          >
                            <option value="">Patient Type</option>
                            <option value="all">All</option>
                            <option value="new">New</option>
                            <option value="old">Old</option>
                          </Form.Select>
                        </Col>
                        <Col md={2}>
                          <Form.Select
                            className="form-control form-control-sm"
                            value={appointmentType}
                            onChange={(e) => setAppointmentType(e.target.value)}
                          >
                            <option value="">Appointment Type</option>
                            <option value="inPerson">Physical</option>
                            <option value="remote">Online</option>
                          </Form.Select>
                        </Col>
                        <Col md={2}>
                          <Form.Select
                            className="form-control form-control-sm"
                            value={appointmentStatus}
                            onChange={(e) =>
                              setAppointmentStatus(e.target.value)
                            }
                          >
                            <option value="all">Appointment Status</option>
                            <option value="new">New</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                            <option value="approved">Approved</option>
                          </Form.Select>
                        </Col>
                        {/* <Col md={2}></Col> */}
                        <Col md={2}>
                          <Row>
                            <Col
                              md={4}
                              style={{
                                marginRight: '-20px',
                                paddingTop: '3px',
                              }}
                            >
                              From:{' '}
                            </Col>
                            <Col md={8} className="pl-0">
                              <Form.Control
                                type="date"
                                className="form-control-sm"
                                data-date-format="DD MMMM YYYY"
                                defaultValue={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col md={2}>
                          <Row>
                            <Col
                              md={4}
                              style={{
                                marginRight: '-20px',
                                paddingTop: '3px',
                              }}
                            >
                              To:{' '}
                            </Col>
                            <Col md={8} className="pl-0">
                              <Form.Control
                                type="date"
                                className="form-control-sm"
                                name="endDate"
                                placeholder="To"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                // error={errors.date_of_birth}
                                // ref={register}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )}
                  </Form>
                  <Table hover>
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}>No</th>
                        <th
                          className="text-center"
                          style={{ width: '5%', cursor: 'pointer' }}
                          onClick={() => {
                            setSerialSort(!serialSort);
                          }}
                        >
                          Serial{' '}
                          {!serialSort && <i className="fa fa-arrow-up"></i>}{' '}
                          {serialSort && <i className="fa fa-arrow-down"></i>}
                        </th>
                        <th style={{ width: '15%' }}>Name</th>
                        <th style={{ width: '7%' }}>Patient Id</th>
                        <th style={{ width: '10%' }}>Mobile Number</th>
                        <th style={{ width: '8%' }}>Patient Type</th>
                        <th style={{ width: '10%' }}>Visit Type</th>
                        <th style={{ width: '10%' }}>Date</th>
                        <th style={{ width: '10%' }}>Appointment Status</th>
                        <th style={{ width: '10%' }}>Payment Status</th>
                        <th className="text-center" style={{ width: '5%' }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (count =
                          1 &&
                          appointments.map((appointment) => (
                            <tr
                              key={appointment.id}
                              style={{ borderTop: '0px', cursor: 'pointer' }}
                              onClick={() => handleRowClick(appointment)}
                            >
                              <td>{count++}</td>
                              <td className="text-center">
                                {appointment?.serialNumber}
                              </td>
                              <td
                                style={{
                                  cursor: 'pointer',
                                  color: '#4e73df',
                                }}
                              >
                                {appointment?.patientId?.name || ''}
                              </td>
                              <td>
                                {getPatientIdForDoctor(
                                  appointment?.patientId?.patientIdForDoctor,
                                  userInfo,
                                )}
                              </td>
                              <td>
                                {appointment?.patientId?.phoneNumber || ''}
                              </td>
                              <td>
                                {capitalizeFirstLetter(
                                  appointment?.patientType,
                                ) || ''}
                              </td>
                              <td>
                                {appointment?.appointmentType === 'inPerson'
                                  ? 'Physical'
                                  : 'Online'}
                              </td>
                              <td>
                                {getAppointmentDateTime(
                                  moment(appointment?.appointmentDateTime)
                                    .utc()
                                    .format('Do MMM YYYY h:mm a'),
                                )}
                              </td>
                              <td>
                                {getAppointmentStatus(appointment?.status)}
                              </td>
                              <td>{getAppointmentPayment(appointment)}</td>
                              <td className="text-center">
                                {appointment?.status === 'completed' && (
                                  <>
                                    <i
                                      style={{
                                        cursor: 'pointer',
                                        color: '#1cc88a',
                                      }}
                                      className="fas fa-edit new-edit-icon"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        editPrescription(
                                          appointment,
                                          'editFromList',
                                        );
                                      }}
                                    ></i>
                                  </>
                                )}
                                {appointment.status !== 'completed' && (
                                  <i
                                    style={{
                                      cursor: 'pointer',
                                      color: '#1cc88a',
                                    }}
                                    className="fas fa-file-medical new-edit-icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      editPrescription(
                                        appointment,
                                        'onlyAppointment',
                                      );
                                    }}
                                  ></i>
                                )}
                              </td>
                            </tr>
                          )))
                      }

                      {/* {[...Array(15).keys()].map((item) => (
                        <tr>
                          <td>2</td>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                      ))} */}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default Appointments;
