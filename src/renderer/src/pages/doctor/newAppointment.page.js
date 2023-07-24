import React, { useState, Fragment, useRef } from 'react';
import Header from '../../components/doctors/partials/Header';
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  ButtonGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRequest } from '../../utils/axiosRequests';
import { usePostRequest } from '../../hooks/usePostRequest';
import { useValidation } from '../../hooks/validationHooks/useValiation';
import { appointmentSchema } from '../../validationSchemas/appointment.validation';
import LoadingButton from '../../components/forms/LoadingButton';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import { userRole, ageConvertToDateTime } from '../../utils/helpers';
import moment from 'moment';

function PatientHistory() {
  const { state } = useLocation();
  const [ageOrDob, setAgeOrDob] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [visitationFee, setVisitationFee] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [errors, setErrors] = useState([]);
  const [backendError, setBackendError] = useState('');
  const [searchResultArr, setSearchResultArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [patientData, setPatientData] = useState({});
  const validation = useValidation;

  const userInfo = useSelector((state) => state.authReducer.data);
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const activeDoctor = useSelector(
    (state) => state.doctorsOfAssistantReducer.activeDoctor,
  );
  let navigate = useNavigate();
  const onSuccess = (data) => {
    toast.success(data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate('/appointments');
  };
  const onError = (error) => {
    setLoadingStatus(false);
    setBackendError(error.message);
  };

  const { isPatientLoading, mutate: submitUser } = usePostRequest(
    'appointments/appointment-with-patient',
    {
      name: name,
      dob:  ageOrDob ? dob : ageConvertToDateTime(dob),
      phoneNumber: phoneNumber,
      gender: gender,
      address: address,
      email: email,
      appointmentDateTime: moment(appointmentDateTime).format(
        'YYYY-MM-DD HH:mm',
      ),
      serialNumber: serialNumber,
      fee: parseInt(visitationFee),
      doctorId:
        userRole(userInfo.userType) === 'assistant'
          ? activeDoctor.id
          : userInfo.id,
      organizationId:
        userRole(userInfo.userType) === 'assistant'
          ? userInfo?.organizationIds[0]?.id
          : activeOrganization.id,
    },
    onSuccess,
    onError,
  );
  const handleSubmit = () => {
    setLoadingStatus(true);
    const { isValid, errors } = validation(
      {
        name,
        dob,
        phoneNumber,
        gender,
        address,
        email,
        appointmentDateTime,
        visitationFee,
        serialNumber,
      },
      appointmentSchema,
    );
    if (isValid) {
      submitUser();
    }
    {
      if (Object.keys(errors).length !== 0) {
        setErrors(errors);
        setLoadingStatus(false);
      }
    }
  };
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const typeaheadRef = useRef(null);
  const handleOnInputChange = (val) => {
    setIsLoading(true);
    const url = `patients?phoneNumber=${val}`;
    setPhoneNumber(val);

    getRequest(url)
      .then((data) => {
        setSearchResultArr(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterBy = () => true;

  const selectSearchResult = (selectedUser) => {
    setPhoneNumber(selectedUser[0].phoneNumber);
    setName(selectedUser[0].name);
    setDob(selectedUser[0]?.dob);
    setAddress(selectedUser[0].address);
    setGender(selectedUser[0].gender);
    setEmail(selectedUser[0].email);
    setPatientId(selectedUser[0].id);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4 card-content">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold">New Appointment</h6>
              </div>

              <div className="card-body patient-history appointment-card-body">
                <Row>
                  {/* <Col md={3} className="patient-details pt-3">
                    <div className="text-center">
                      <img className="patient-history-profile-img rounded-circle" src={profileImg} />
                      <div className="font-weight-bold mt-2">{patientData?.name}</div>
                      <div>{patientData?.phoneNumber}</div>
                      <div>{patientData?.email}</div>
                      <div>Patient ID: <b>{patientData?.id}</b></div>
                      <div className="mt-2">
                        <i className="fas fa-phone-alt mr-4" aria-hidden="true"></i>
                        <i className="fas fa-video mr-4" aria-hidden="true"></i>
                        <i className="fas fa-comment-alt" aria-hidden="true"></i>
                      </div>
                    </div>
                    <hr/>
                    <Row className="text-center">
                      <Col>
                        <Row>
                          <Col>
                            <div>Gender</div>
                            <div className="font-weight-bold mt-2">{gender}</div>
                            <hr/>
                          </Col>
                          <Col>
                            <div>Age</div>
                            <div className="font-weight-bold mt-2">{dob}</div>
                            <hr/>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>Height</div>
                            <div className="font-weight-bold mt-2">{`5.6`}</div>
                            <hr/>
                          </Col>
                          <Col>
                            <div>Weight</div>
                            <div className="font-weight-bold mt-2">{`72`}</div>
                            <hr/>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col> */}
                  <Col nd={3}></Col>
                  <Col md={6} className="pl-4">
                    <Form className="appointmentForm">
                      <div className="v-error text-center">{backendError}</div>
                      <div className="add-new-rx mb-3">
                        <span>Add New Appointment</span>
                      </div>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone No.</Form.Label>
                            <AsyncTypeahead
                              labelKey="phoneNumber"
                              ref={typeaheadRef}
                              filterBy={filterBy}
                              id="async-example"
                              isLoading={isLoading}
                              options={searchResultArr}
                              placeholder="Search / Add patient here ..."
                              onChange={selectSearchResult}
                              minLength={5}
                              onSearch={handleOnInputChange}
                              size="md"
                              renderMenuItemChildren={(option, props) => (
                                <Fragment>
                                  <span>{option.phoneNumber}</span>
                                </Fragment>
                              )}
                            />
                            <small className="v-error">
                              {getErrorMessage('phoneNumber')}
                            </small>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ display: 'block' }}>
                              <span>Age</span>
                              <ButtonGroup
                                className="appointment-btn-group"
                                aria-label="Basic example"
                              >
                                <Button
                                  size="sm"
                                  variant={
                                    !ageOrDob ? 'primary' : 'outline-secondary'
                                  }
                                  onClick={() => setAgeOrDob(false)}
                                >
                                  Age
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    ageOrDob ? 'primary' : 'outline-secondary'
                                  }
                                  onClick={() => setAgeOrDob(true)}
                                >
                                  DOB
                                </Button>
                              </ButtonGroup>
                            </Form.Label>
                            {!ageOrDob && (
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  defaultValue={dob?.years}
                                  placeholder="Year"
                                  onChange={(e) =>
                                    setDob({ ...dob, years: e.target.value })
                                  }
                                />
                                <Form.Control
                                  type="number"
                                  defaultValue={dob?.months}
                                  placeholder="Month"
                                  onChange={(e) =>
                                    setDob({ ...dob, months: e.target.value })
                                  }
                                />
                                <Form.Control
                                  type="number"
                                  defaultValue={dob?.days}
                                  placeholder="Day"
                                  onChange={(e) =>
                                    setDob({ ...dob, days: e.target.value })
                                  }
                                />
                                <Form.Control
                                  type="number"
                                  placeholder="Hour"
                                  defaultValue={dob?.hours}
                                  onChange={(e) =>
                                    setDob({ ...dob, hours: e.target.value })
                                  }
                                />
                              </InputGroup>
                            )}
                            {ageOrDob && (
                              <Form.Control
                                type={'date'}
                                placeholder="Enter age"
                                defaultValue={dob}
                                onChange={(e) => setDob(e.target.value)}
                              />
                            )}
                            <small className="v-error">
                              {getErrorMessage('dob')}
                            </small>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="name"
                              placeholder="Enter name"
                              defaultValue={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <small className="v-error">
                              {getErrorMessage('name')}
                            </small>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter address"
                              defaultValue={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <small className="v-error">
                              {getErrorMessage('address')}
                            </small>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              defaultValue={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className="v-error">
                              {getErrorMessage('email')}
                            </small>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              className="form-control"
                              defaultValue={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Others</option>
                            </Form.Select>
                            <small className="v-error">
                              {getErrorMessage('gender')}
                            </small>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Appointment Date</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              onChange={(e) =>
                                setAppointmentDateTime(e.target.value)
                              }
                            />
                            <small className="v-error">
                              {getErrorMessage('appointmentDateTime')}
                            </small>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Visitation Fee</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter visitation fee"
                              onChange={(e) => setVisitationFee(e.target.value)}
                            />
                            <small className="v-error">
                              {getErrorMessage('visitationFee')}
                            </small>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                              type="number"
                              onChange={(e) => setSerialNumber(e.target.value)}
                            />
                            <small className="v-error">
                              {getErrorMessage('serialNumber')}
                            </small>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          {loadingStatus ? (
                            <LoadingButton btnFull="yes" />
                          ) : (
                            <Button
                              variant="primary"
                              size="md"
                              style={{ width: 'inherit' }}
                              onClick={handleSubmit}
                            >
                              <b>Save</b>
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col nd={3}></Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHistory;
