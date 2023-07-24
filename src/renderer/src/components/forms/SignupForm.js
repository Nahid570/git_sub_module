import React, { useState, Fragment, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { usePostRequest } from '../../hooks/usePostRequest';
import { signupSchema } from '../../validationSchemas/signup.validation';
import { useValidation } from '../../hooks/validationHooks/useValiation';
import LoadingButton from './LoadingButton';
import { getRequest } from '../../utils/axiosRequests';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [organizationName, setOrganizationName] = useState('');
  const [speciality, setSpeciality] = useState([]);
  const [bmdc, setBmdc] = useState('');
  const [password, setPassword] = useState('');
  const [repeat_password, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [isLoadingOrg, setIsLoadingOrg] = useState(false);
  const [isLoadingSp, setIsLoadingSp] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [typedOrganization, setTypedOrganization] = useState('');

  const validation = useValidation;
  let navigate = useNavigate();

  const onSuccess = (data) => {
    navigate('/signup-otp-verification', {
      state: { Id: data.id, phoneNumber: data.phoneNumber },
    });
  };
  const onError = (error) => {
    setBackendError(error.message);
  };
  let inputArr = {
    name,
    email,
    phoneNumber,
    speciality,
    organizationName:
      typedOrganization.length > organizationName
        ? typedOrganization
        : organizationName,
    gender,
    bmdc,
    password,
    repeat_password,
  };
  const { isLoading, mutate: submitUser } = usePostRequest(
    'auth/register-doctor',
    inputArr,
    onSuccess,
    onError,
  );
  const handleSubmit = () => {
    const { isValid, errors } = validation(inputArr, signupSchema);
    if (isValid) {
      submitUser();
    }
    {
      setErrors(errors);
      console.log('from custom hooks: ', errors);
    }
  };
  const handleSpecialtySearch = (searchKey) => {
    setIsLoadingSp(true);
    const url = `specialities?name=${searchKey}`;
    getRequest(url)
      .then((data) => {
        setSpecialties(data);
        setIsLoadingSp(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSpecialtyChange = (selectedOptions) => {
    setSpeciality([...speciality, selectedOptions[0]?.id]);
  };
  const handleOrgSearch = (searchKey) => {
    setTypedOrganization(searchKey);
    setIsLoadingOrg(true);
    const url = `organizations/org-list?name=${searchKey}`;
    getRequest(url)
      .then((res) => {
        setOrganizations(res?.data);
        setIsLoadingOrg(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOrgChange = (selectedOptions) => {
    setOrganizationName(selectedOptions[0]?.name);
  };
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };
  const filterBy = () => true;
  const filterByOrg = () => true;
  const ref = useRef();

  return (
    <div>
      <div className="v-error text-center pb-3">{backendError}</div>
      <Row>
        <Col>
          <label className="label-custom" htmlFor="name">
            Name
          </label>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${
                getErrorMessage('name') ? 'v-border' : ''
              }`}
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('name')}</small>
          </div>
        </Col>
        <Col>
          <label className="label-custom" htmlFor="phone-number">
            Phone Number
          </label>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${
                getErrorMessage('phoneNumber') ? 'v-border' : ''
              }`}
              id="phone-number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('phoneNumber')}</small>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="label-custom" htmlFor="email">
            Email
          </label>
          <div className="form-group">
            <input
              type="email"
              className={`form-control ${
                getErrorMessage('email') ? 'v-border' : ''
              }`}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('email')}</small>
          </div>
        </Col>
        <Col>
          <label className="label-custom" htmlFor="gender">
            Gender
          </label>
          <div className="form-group">
            <select
              className={`form-control ${
                getErrorMessage('gender') ? 'v-border' : ''
              }`}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <small className="v-error">{getErrorMessage('gender')}</small>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="label-custom" htmlFor="organization">
            Organization Name
          </label>
          <div className="form-group">
            <AsyncTypeahead
              filterBy={filterByOrg}
              id="async-example"
              isLoading={isLoadingOrg}
              labelKey="name"
              minLength={1}
              onSearch={handleOrgSearch}
              options={organizations}
              placeholder="Select or Type Organization"
              // onInputChange={setTypedOrganization}
              onChange={handleOrgChange}
              renderMenuItemChildren={(option, props) => (
                <Fragment>
                  <span>{option.name}</span>
                </Fragment>
              )}
            />
            <small className="v-error">
              {getErrorMessage('organizationName')}
            </small>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="label-custom" htmlFor="speciality">
            Speciality
          </label>
          <div className="form-group">
            <AsyncTypeahead
              filterBy={filterBy}
              id="async-example"
              isLoading={isLoadingSp}
              labelKey="name"
              ref={ref}
              minLength={1}
              onSearch={handleSpecialtySearch}
              options={specialties}
              placeholder="Search for a speciality ..."
              onChange={handleSpecialtyChange}
              renderMenuItemChildren={(option, props) => (
                <Fragment>
                  <span>{option.name}</span>
                </Fragment>
              )}
            />
            <small className="v-error">
              {getErrorMessage('organizationName')}
            </small>
          </div>
        </Col>
        <Col>
          <label className="label-custom" htmlFor="bmdc">
            BMDC
          </label>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${
                getErrorMessage('bmdc') ? 'v-border' : ''
              }`}
              id="bmdc"
              onChange={(e) => setBmdc(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('bmdc')}</small>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <label className="label-custom" htmlFor="bmdc">
            Password
          </label>
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${
                getErrorMessage('password') ? 'v-border' : ''
              }`}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('password')}</small>
          </div>
        </Col>
        <Col>
          <label className="label-custom" htmlFor="bmdc">
            Confirm Password
          </label>
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${
                getErrorMessage('repeat_password') ? 'v-border' : ''
              }`}
              id="repeat_password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <small className="v-error">
              {getErrorMessage('repeat_password')}
            </small>
          </div>
        </Col>
      </Row>
      <div className="text-center">
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            variant="primary"
            className="signup-btn btn-color"
            size="md"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
