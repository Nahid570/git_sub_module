import React, { useState, useEffect, Fragment, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailed } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  Alert,
  Modal,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import {
  organizationList,
  activeOrganization as activateOrg,
} from '../../../store/slices/orgSlice';
import { getPrescriptionInfo } from '../../../hooks/useGetPrescriptionInfo';
import {
  prescriptionHeader,
  prescriptionFooter,
  prescriptionItems,
  patientSettings,
  prescriptionSettings,
} from '../../../store/slices/prescriptionSlice';
import { activeDoctorForAssistant } from '../../../store/slices/doctorsOfAssistantSlice';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { usePostRequest } from '../../../hooks/usePostRequest';
import { postRequest, patchRequest } from '../../../utils/axiosRequests';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { toast } from 'react-toastify';
import { userRole, getSpecialityName } from '../../../utils/helpers';
import profileImg from '../../../img/profile.svg';
import logoImg from '../../../img/logo.png';
import LoadingButton from '../../forms/LoadingButton';
import ImageSlider from './imageSlider';

const Header = () => {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hideOrgSubMenu, setHideOrgSubMenu] = useState('');
  const userInfo = useSelector((state) => state.authReducer.data);
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const doctorOrganizations = useSelector((state) => state.orgReducer.orgList);
  const doctorList = useSelector(
    (state) => state.doctorsOfAssistantReducer.doctors,
  );
  const activeDoctor = useSelector(
    (state) => state.doctorsOfAssistantReducer.activeDoctor,
  );
  const specialties = useSelector(
    (state) => state.specialtyReducer.specialties,
  );
  const [organizations, setOrganizations] = useState([]);
  const [orgOptions, setOrgOptions] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [typedOrganization, setTypedOrganization] = useState('');
  const [clickedOrganization, setClickedOrganization] = useState('');
  const typeaheadRef = useRef(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState(false);
  const [brandings, setBrandings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleYes = () => {
    setShow(false);
    dispatch(loginFailed({}));
    navigate('/');
  };
  const handleSettingsSave = () => {
    setShowSettings(false);
  };

  const handleSettingsClose = () => setShowSettings(false);
  const handleOrgSearch = () => {};
  const handleSaveOrganization = async () => {
    if (!typedOrganization.length) {
      return false;
    }
    const clickOrg = clickedOrganization.length
      ? clickedOrganization[0]?.name
      : '';
    let orgDetails;
    if (typedOrganization.length > clickOrg.length) {
      orgDetails = await postRequest('organizations', {
        name: typedOrganization,
        status: 'active',
      });
    } else {
      orgDetails = clickedOrganization[0];
      await postRequest('doctors/default-entry', {
        id: userInfo.id,
        organizationId: orgDetails.id,
      });
    }
    const orgList = [...organizations, orgDetails];
    setOrganizations(orgList);
    dispatch(organizationList([...doctorOrganizations, orgDetails]));
    const orgIdList = organizations.map((item) => item.id);
    await patchRequest('doctors/' + userInfo.id, {
      organizationIds: [...orgIdList, orgDetails.id],
    });
    setClickedOrganization('');
    setTypedOrganization('');
    typeaheadRef.current.clear();
  };

  const handleRemoveOrganization = async (org) => {
    if (activeOrganization.id === org.id) {
      alert('Please change active organization before organization remove!');
      return false;
    }
    const orgList = doctorOrganizations.filter((item) => item.id !== org.id);
    const orgListIds = orgList.map((item) => item.id);
    await patchRequest('doctors/' + userInfo.id, {
      organizationIds: [...orgListIds],
    });
    dispatch(organizationList(orgList));
  };

  const { isLoading: isOrgLoading, refetch: orgsRefetch } = useGetRequest(
    'getAllOrgs',
    `organizations?name=${typedOrganization}`,
    (data) => {
      setOrgOptions(data?.data);
    },
    (e) => {
      console.log('error message: ', e.message);
    },
  );
  const {
    isLoading: isPasswordLoading,
    mutate: passwordChangeSubmit,
  } = usePostRequest(
    'auth/change-password',
    {
      oldPassword,
      newPassword,
    },
    (data) => {
      setPasswordSuccess(data.message);
      setPasswordError('');
    },
    (e) => {
      setPasswordSuccess('');
      setPasswordError(e.message);
      console.log('error message: ', e.message);
    },
  );
  const filterBy = () => true;

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordSuccess('');
      setPasswordError('Confirm password did not match');
    } else {
      passwordChangeSubmit();
    }
  };

  const {
    isLoading: isOtpSendLoading,
    mutate: checkAndSendOtp,
  } = usePostRequest(
    'auth/send-otp-by-userid',
    {
      userId: userInfo.id,
    },
    (data) => {
      console.log(data);
      setSentOtp(true);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (error) => {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const {
    isLoading: isPhoneNumberUpdateLoading,
    mutate: updatePhoneNumber,
  } = usePostRequest(
    'auth/update-doctor/' + userInfo.id,
    {
      phoneNumber,
    },
    (data) => {
      console.log(data);
      setSentOtp(false);
      setOtp('');
      setPhoneNumber('');
      toast.success('Phone Number updated successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (error) => {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const { isLoading: isVerifyOtpLoading, mutate: verifyOtp } = usePostRequest(
    'auth/verify-otp',
    {
      userId: userInfo.id,
      otp,
    },
    (data) => {
      console.log(data);
      updatePhoneNumber();
    },
    (error) => {
      console.log(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  );

  const handleContinue = () => {
    var phoneNo = /^01[1-9]{3}[0-9]{6}$/;
    if (
      phoneNumber &&
      phoneNumber.length === 11 &&
      phoneNumber.match(phoneNo)
    ) {
      checkAndSendOtp();
    } else {
      toast.error('Invalid Phone Number', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUpdatePhonNumber = () => {
    verifyOtp();
  };

  const { isLoading, refetch: getAdvertisement } = useGetRequest(
    'advertisement',
    `advertisements/doctor-ad/${userInfo.id}`,
    (data) => {
      setBrandings([...data]);
    },
    (e) => {},
  );

  useEffect(() => {
    getAdvertisement();
  }, []);

  useEffect(() => {
    if (userRole(userInfo.userType) !== 'assistant') {
      getPrescriptionInfo('header', activeOrganization?.id)
        .then((data) => {
          dispatch(prescriptionHeader(data));
        })
        .catch((error) => {
          dispatch(prescriptionHeader({}));
        });
      getPrescriptionInfo('footer', activeOrganization?.id)
        .then((data) => {
          dispatch(prescriptionFooter(data));
        })
        .catch((error) => {
          dispatch(prescriptionFooter({}));
        });
      getPrescriptionInfo('prescriptionItem', activeOrganization?.id)
        .then((data) => {
          dispatch(prescriptionItems(data));
        })
        .catch((error) => {
          dispatch(prescriptionItems([]));
        });
      getPrescriptionInfo('prescriptionPrint', activeOrganization?.id)
        .then((data) => {
          dispatch(prescriptionSettings(data));
        })
        .catch((error) => {
          dispatch(prescriptionSettings([]));
        });
      getPrescriptionInfo('patientItem', activeOrganization?.id)
        .then((data) => {
          dispatch(patientSettings(data));
        })
        .catch((error) => {
          dispatch(patientSettings([]));
        });
    }
  }, [activeOrganization]);

  useEffect(() => {
    const { organizationIds } = userInfo;
    setOrganizations(organizationIds);
    if (activeOrganization && activeOrganization.id) {
      setSelectedOrganization(activeOrganization);
    } else if (organizationIds.length) {
      setSelectedOrganization(organizationIds[0]);
      dispatch(activateOrg(organizationIds[0]));
    }
  }, []);
  const handleSubMenu = (e) => {
    e.preventDefault();
    if (!hideOrgSubMenu) {
      setHideOrgSubMenu('hideOrgSubMenu');
    } else {
      setHideOrgSubMenu('');
    }
    e.stopPropagation();
  };

  useEffect(() => {
    orgsRefetch();
  }, [typedOrganization]);

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow sticky-header">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className="mr-2 ml-5">
          <img src={logoImg} height={30} width={220} />
        </div>
        {brandings?.length > 0 && (
          <div
            className="ml-5"
            style={{
              fontStyle: 'italic',
              paddingTop: '20px',
              lineHeight: '14px',
            }}
          >
            <span>Supported</span>
            <div style={{ paddingLeft: '71px' }}> by</div>
          </div>
        )}
        {brandings.length > 0 && (
          <ImageSlider userInfo={userInfo} brandings={brandings} />
        )}
        <ul className="navbar-nav ml-auto nav-bar-top">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item dropdown no-arrow mx-1">
            {!isOnline && (
              <div className="no-internet">
                You are offline. Please check your internet connection.
              </div>
            )}
          </li>
          <li className="nav-item dropdown no-arrow nav-profile-menu-area">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img className="img-profile rounded-circle" src={profileImg} />
              <div className="profile-icon-area">
                <span className="doctor-name">{userInfo.name}</span>
                <span className="doctor-speciality">
                  {getSpecialityName(specialties, userInfo?.speciality[0])}
                </span>
                <span className="doctor-organization">
                  {userInfo?.userType.toLowerCase() === 'doctor'
                    ? `${selectedOrganization.name}`
                    : `Dr: ${activeDoctor?.name}`}
                </span>
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              {userInfo?.userType.toLowerCase() === 'doctor'
                ? doctorOrganizations &&
                  doctorOrganizations.length > 1 && (
                    <>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => handleSubMenu(e)}
                      >
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Organization{' '}
                        <i
                          className={`fas ${
                            hideOrgSubMenu ? 'fa-angle-down' : 'fa-angle-up'
                          }  submenu-arrow`}
                        ></i>
                      </a>
                      <div className={`submenu-organization ${hideOrgSubMenu}`}>
                        {doctorOrganizations.map((organization, index) => {
                          const selectedClass =
                            organization.name === selectedOrganization.name
                              ? 'text-primary'
                              : '';
                          return (
                            <div
                              key={index}
                              className={`submenu-org-item ${selectedClass}`}
                              title={organization.name}
                              onClick={() => {
                                setSelectedOrganization(
                                  doctorOrganizations[index],
                                );
                                dispatch(
                                  activateOrg(doctorOrganizations[index]),
                                );
                              }}
                            >
                              {organization.name}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )
                : doctorList &&
                  doctorList.length > 0 && (
                    <>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => handleSubMenu(e)}
                      >
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        {doctorList.length > 1 ? 'Doctors' : 'Doctor'}
                        <i
                          className={`fas ${
                            hideOrgSubMenu ? 'fa-angle-down' : 'fa-angle-up'
                          }  submenu-arrow`}
                        ></i>
                      </a>
                      <div className={`submenu-organization ${hideOrgSubMenu}`}>
                        {doctorList.map((doctor, index) => {
                          const selectedClass =
                            doctor.name === activeDoctor?.name
                              ? 'text-primary'
                              : '';
                          return (
                            <div
                              key={index}
                              className={`submenu-org-item ${selectedClass}`}
                              title={doctor.name}
                              onClick={() => {
                                //setSelectedOrganization(organizations[index]);
                                dispatch(
                                  activeDoctorForAssistant(doctorList[index]),
                                );
                              }}
                            >
                              {doctor.name}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSettings(true);
                }}
              >
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                }}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>Logout</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                handleClose();
              }}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>Are you sure want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showSettings} onHide={handleSettingsClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>Settings</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={handleSettingsClose}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            {userRole(userInfo.userType) !== 'assistant' ? (
              <Accordion.Item eventKey="0">
                <Accordion.Header className="profile-setting-menu-item">
                  Organization Management
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col md={8}>
                      <div className="form-group">
                        <AsyncTypeahead
                          filterBy={filterBy}
                          id="async-example"
                          isLoading={isOrgLoading}
                          labelKey="name"
                          minLength={1}
                          onSearch={handleOrgSearch}
                          options={orgOptions}
                          ref={typeaheadRef}
                          placeholder="Search/Type Organization"
                          onInputChange={setTypedOrganization}
                          onChange={setClickedOrganization}
                          renderMenuItemChildren={(option, props) => (
                            <Fragment>
                              <span>{option?.name}</span>
                            </Fragment>
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={4} className="pt-1">
                      <Button onClick={handleSaveOrganization}>+</Button>
                    </Col>
                  </Row>

                  {doctorOrganizations.length > 0 &&
                    doctorOrganizations.map((item) => (
                      <li key={item.id} style={{ listStyle: 'none' }}>
                        <Row>
                          <Col md={7} className="ml-2">{item.name}</Col>
                          <Col md={1}>
                            <i
                              className="fa fa-times-circle pt-2 cursor-pointer"
                              aria-hidden="true"
                              style={{ marginLeft: '25px' }}
                              onClick={() => handleRemoveOrganization(item)}
                            ></i>
                          </Col>
                        </Row>
                      </li>
                    ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              ''
            )}
            <Accordion.Item eventKey="1">
              <Accordion.Header className="profile-setting-menu-item">
                Change Password
              </Accordion.Header>
              <Accordion.Body>
                {passwordSuccess && (
                  <Alert variant="success">{passwordSuccess}</Alert>
                )}
                {passwordError && (
                  <Alert variant="danger">{passwordError}</Alert>
                )}
                <Row style={{ marginBottom: '10px' }}>
                  <Col md={8}>
                    <Form.Control
                      type="password"
                      placeholder="Old Password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: '10px' }}>
                  <Col md={8}>
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: '10px' }}>
                  <Col md={8}>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: '10px' }}>
                  <Col md={8}>
                    <Button onClick={handleChangePassword}>Save</Button>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            {userRole(userInfo.userType) !== 'assistant' ? (
              <Accordion.Item eventKey="2">
                <Accordion.Header className="profile-setting-menu-item">
                  Update Phone Number
                </Accordion.Header>
                <Accordion.Body>
                  {sentOtp === false ? (
                    <Row style={{ marginBottom: '10px' }}>
                      <Col md={8}>
                        <Form.Control
                          type="text"
                          placeholder="Enter new phone number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ marginBottom: '10px' }}>
                      <Col md={8}>
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP here to update phone number"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </Col>
                    </Row>
                  )}
                  <Row style={{ marginBottom: '10px' }}>
                    <Col md={8}>
                      {sentOtp === false ? (
                        isOtpSendLoading ? (
                          <LoadingButton />
                        ) : (
                          <Button onClick={handleContinue}>Continue</Button>
                        )
                      ) : isPhoneNumberUpdateLoading || isVerifyOtpLoading ? (
                        <LoadingButton />
                      ) : (
                        <Button onClick={handleUpdatePhonNumber}>Update</Button>
                      )}
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              ''
            )}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSettingsClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSettingsSave}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(Header);
