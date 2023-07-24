import React, { memo, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoadingButton from '../../forms/LoadingButton';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { diagnosisGroupSchema } from '../../../validationSchemas/diagnosisGroup.validation';
import { usePostRequest } from '../../../hooks/usePostRequest';

const MedicineGroupForm = ({
  selectedMedicines,
  medicineGroups,
  setMedicineGroups,
  isMedicineGroupModal,
  setIsMedicineGroupModal,
  selectedMedicineGroups,
  setSelectedMedicineGroups,
}) => {
  const activeOrganization = useSelector(
    (state) => state.orgReducer.organization,
  );
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const validation = useValidation;

  const onSuccess = (data) => {
    setIsMedicineGroupModal(false);
    setMedicineGroups([...medicineGroups, data]);
    setSelectedMedicineGroups([...selectedMedicineGroups, data]);
  };
  const onError = (error) => {
    console.log('from react query error: ', error.message);
  };

  let medicinesInputArr = [];
  selectedMedicines?.map((medicine) => {
    //medicine.times = Object.keys(medicine?.itemDetails?.quantities)?.length;
    medicinesInputArr = [...medicinesInputArr, medicine];
  });
  const { isLoading, mutate: submitUser } = usePostRequest(
    'prescriptions/groups',
    {
      name: name,
      organizationId: activeOrganization.id,
      medicines: medicinesInputArr,
    },
    onSuccess,
    onError,
  );

  const handleSubmit = () => {
    const { isValid, errors } = validation({ name }, diagnosisGroupSchema);
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
    <Modal show={isMedicineGroupModal} size="md">
      <Modal.Header className="common-modal-header">
        <Modal.Title>Medicine Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label className="label-custom">Group Name</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              className={`${getErrorMessage('name') ? 'v-border' : ''}`}
              placeholder="Enter group name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('name')}</small>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsMedicineGroupModal(false)}
        >
          Close
        </Button>
        <div className="d-grid gap-2">
          {isLoading ? (
            <LoadingButton btnFull="yes" />
          ) : (
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default memo(MedicineGroupForm);
