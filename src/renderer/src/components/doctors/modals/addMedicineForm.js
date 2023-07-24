import React, { useState, useEffect, memo } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { usePostRequest } from '../../../hooks/usePostRequest';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { medicineSchema } from '../../../validationSchemas/medicine.validation';
import LoadingButton from '../../forms/LoadingButton';
import { MEDICINE_TYPES } from '../../../utils/helpers';
import Select from 'react-select';

const AddMedicineForm = ({
  searchQuery,
  isMedicineModal,
  setIsMedicineModal,
  selectMedicines,
}) => {
  const [brandName, setBrandName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [strength, setStrength] = useState('');
  const [type, setType] = useState('Tablet');
  const [alterName, setAlterName] = useState('');
  const [errors, setErrors] = useState([]);
  const [backendError, setBackendError] = useState('');
  const [isSearchable, setIsSearchable] = useState(true);
  const validation = useValidation;

  const medicineTypes = MEDICINE_TYPES.map((type) => ({
    value: type,
    label: type,
  }));

  useEffect(() => {
    if (searchQuery) {
      setBrandName(searchQuery);
    }
  }, [searchQuery]);

  const onSuccess = (data) => {
    selectMedicines(data);
    setIsMedicineModal(false);
  };
  const onError = (error) => {
    setBackendError(error.message);
  };
  const { isLoading, mutate: submitUser } = usePostRequest(
    'medicines',
    {
      brandName: brandName,
      companyName: companyName,
      genericName: genericName,
      strength: strength,
      type: type,
      alterName: alterName,
    },
    onSuccess,
    onError,
  );
  const handleSubmit = () => {
    const { isValid, errors } = validation(
      { brandName, companyName, genericName, strength, type, alterName },
      medicineSchema,
    );
    if (isValid) {
      submitUser();
    }
    {
      setErrors(errors);
    }
  };
  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : '';
  };

  return (
    <>
      <Modal show={isMedicineModal} size="mg">
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>Add Medicine</Modal.Title>
          </Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              onClick={() => setIsMedicineModal(false)}
              className="fa fa-times-circle cursor-pointer"
              aria-hidden="true"
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body className="pb-2">
          <Form>
            <div className="v-error text-center">{backendError}</div>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="brandName">
                  <Form.Label className="label-custom">Brand Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('brandName')}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="companyName">
                  <Form.Label className="label-custom">Company Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter company name"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('companyName')}
                  </small>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="genericName">
                  <Form.Label className="label-custom">Generic Name</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter generic name"
                    onChange={(e) => setGenericName(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('genericName')}
                  </small>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="strength">
                  <Form.Label className="label-custom">Strength</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Enter strength"
                    onChange={(e) => setStrength(e.target.value)}
                  />
                  <small className="v-error">
                    {getErrorMessage('strength')}
                  </small>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Select
                  className="basic-single"
                  classNamePrefix="Select Type"
                  defaultValue={{ label: 'Tablet', value: 'Tablet' }}
                  value={medicineTypes.filter(
                    (option) => option.label === type,
                  )}
                  // isDisabled={isDisabled}
                  // isLoading={isLoading}
                  isClearable={true}
                  // isRtl={isRtl}
                  isSearchable={isSearchable}
                  name="type"
                  options={medicineTypes}
                  onChange={(e) => {
                    if (e) {
                      setType(e.value);
                    } else {
                      setType('Tablet');
                    }
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="text-center">
                {isLoading ? (
                  <LoadingButton btnFull="yes" />
                ) : (
                  <Button variant="primary" size="sm" onClick={handleSubmit}>
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
};
export default memo(AddMedicineForm);
