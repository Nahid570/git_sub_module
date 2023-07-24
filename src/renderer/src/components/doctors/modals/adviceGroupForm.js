import React, { memo, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import LoadingButton from '../../forms/LoadingButton';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { adviceGroupSchema } from '../../../validationSchemas/adviceGroup.validation';
import { usePostRequest } from '../../../hooks/usePostRequest';

const AdviceGroupForm = ({
  closeAdviceGroupModal,
  mergeAdviceGroup,
  advices,
  subAdvices,
  isAdviceGroupModal,
  adviceIds,
}) => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [isTitle, setIsTitle] = useState(false);
  const validation = useValidation;

  const onSuccess = (data) => {
    closeAdviceGroupModal(false);
    mergeAdviceGroup(data);
  };

  const onError = (error) => {
    console.log('from react query error: ', error.message);
  };

  const { isLoading, mutate: submitUser } = usePostRequest(
    'advice/groups',
    {
      name: name,
      adviceIds: adviceIds,
      subAdvices: subAdvices,
      title: isTitle ? name : '',
    },
    onSuccess,
    onError,
  );

  const handleSubmit = () => {
    const { isValid, errors } = validation({ name }, adviceGroupSchema);
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
      <Modal show={isAdviceGroupModal} size="md">
        <Modal.Header className="common-modal-header">
          <Modal.Title>Advice Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                className={`${getErrorMessage('name') ? 'v-border' : ''}`}
                placeholder="Enter group name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <small className="v-error">{getErrorMessage('name')}</small>
              <Form.Check
                type={`checkbox`}
                name="isTitle"
                label={`Use Group Name as Advice Title`}
                className="mt-2"
                checked={isTitle === true}
                onChange={(e) => setIsTitle(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAdviceGroupModal}>
            Close
          </Button>
          <div className="d-grid gap-2">
            {isLoading ? (
              <LoadingButton btnFull="yes" />
            ) : (
              <Button variant="primary" size="md" onClick={handleSubmit}>
                Save Changes
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default memo(AdviceGroupForm);
