import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { usePostRequest } from '../../../hooks/usePostRequest';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { assistantSchema } from '../../../validationSchemas/assistant.validation';
import LoadingButton from '../../forms/LoadingButton';
import { toast } from 'react-toastify';
import { useGetRequest } from '../../../hooks/useGetRequest';
import { postRequest } from '../../../utils/axiosRequests';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

function AssistantForm(props) {
  let { isAssistantModal } = props;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [typedAssistant, setTypedAssistant] = useState('');
  const [clickedAssistant, setClickedAssistant] = useState('');
  const [assistantOptions, setAssistantOptions] = useState([]);
  const validation = useValidation;
  const userInfo = useSelector((state) => state.authReducer.data);
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const { isLoading, mutate: submitUser } = usePostRequest(
    'assistants',
    {
      name: typedAssistant,
      phoneNumber: phoneNumber,
      email: email,
      gender: gender ? gender : 'male',
      status: 'active',
      password: password,
      doctorId: userInfo.id,
      organizationId: activeOrganization.id,
    },
    (res) => {
      setName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      props.closeAssistantModal(false);
    },
    (e) => {
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    },
  );

  const {
    isLoading: isAssistantLoading,
    refetch: assistantsRefetch,
  } = useGetRequest(
    'getAllAssistants',
    `assistants/get-assistants?organizationId=${activeOrganization.id}&name=${typedAssistant}`,
    (data) => {
      setAssistantOptions(data);
    },
    (e) => {
      console.log('errormessage: ', e.message);
    },
  );

  // const handleSubmit = () => {
  //     const { isValid, errors } = validation({name, phoneNumber, email, gender,password,confirmPassword}, assistantSchema);
  //     if(isValid){
  //       submitUser();
  //     }{
  //       setErrors(errors);
  //     }
  // }
  const typeaheadRef = useRef(null);
  const handleSubmit = async () => {
    if (!typedAssistant.length) {
      return false;
    }
    const clickAssistant = clickedAssistant.length
      ? clickedAssistant[0].name
      : '';
    let assistantDetails;
    if (typedAssistant.length > clickAssistant.length) {
      const { isValid, errors } = validation(
        {
          name: typedAssistant,
          phoneNumber,
          email,
          gender: gender ? gender : 'male',
          password,
          confirmPassword,
        },
        assistantSchema,
      );
      if (isValid) {
        console.log('submitting...');
        submitUser();
      }
      {
        setErrors(errors);
      }
    } else {
      assistantDetails = clickedAssistant[0];
      await postRequest('doctors/assistant-entry', {
        assistantId: assistantDetails.id,
      });
      props.closeAssistantModal(false);
    }
    // toast.success("Saved successfully", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    setClickedAssistant('');
    setTypedAssistant('');
    typeaheadRef.current.clear();
  };
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  const handleAssistantSearch = () => {};

  useEffect(() => {
    console.log('working on clicked assistant');
    const assistantDetails = clickedAssistant[0];
    setName(assistantDetails?.name);
    setEmail(assistantDetails?.email);
    setPhoneNumber(assistantDetails?.phoneNumber);
    setGender(assistantDetails?.gender);
  }, [clickedAssistant]);

  useEffect(() => {
    assistantsRefetch();
  }, [typedAssistant]);

  return (
    <>
      <Modal show={isAssistantModal} size="lg">
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>Add Assistant</Modal.Title>
          </Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              onClick={() => {
                props.closeAssistantModal(false);
              }}
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body className="pb-4">
          <Form autoComplete="off">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  {/* <Form.Control type="text" placeholder="Enter assistant name" defaultValue={name} onChange={(e)=>setName(e.target.value)} /> */}
                  <AsyncTypeahead
                    // filterBy={filterBy}
                    id="async-example"
                    isLoading={isAssistantLoading}
                    labelKey="name"
                    minLength={1}
                    onSearch={handleAssistantSearch}
                    options={assistantOptions}
                    ref={typeaheadRef}
                    placeholder="Search/Type Assistant"
                    onInputChange={setTypedAssistant}
                    onChange={setClickedAssistant}
                    renderMenuItemChildren={(option, props) => (
                      <Fragment>
                        <span>{option.name}</span>
                      </Fragment>
                    )}
                  />
                  <small className="v-error">{getErrorMessage('name')}</small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    placeholder="Enter phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('phoneNumber')}
                  </small>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small className="v-error">{getErrorMessage('email')}</small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </Form.Select>
                  <small className="v-error">{getErrorMessage('gender')}</small>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('password')}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('confirmPassword')}
                  </small>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                {isLoading ? (
                  <LoadingButton btnFull="yes" />
                ) : (
                  <Button variant="primary" size="md" onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AssistantForm;
