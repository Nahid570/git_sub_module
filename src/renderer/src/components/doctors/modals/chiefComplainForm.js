import React, { useState } from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import LoadingButton from '../../forms/LoadingButton';
import { useValidation } from '../../../hooks/validationHooks/useValiation';
import { chiefComplainSchema } from '../../../validationSchemas/chiefComplain.validation';
import { usePostRequest } from "../../../hooks/usePostRequest";

function ChiefComplainForm(props) {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [backendError, setBackendError] = useState('');
    const validation = useValidation

    const onSuccess = (data) => {
        props.closeComplainModal(false);
        props.mergeChiefComplain(data);
    };
  
    const onError = (error) => {
        setBackendError(error.message);
        console.log("from react query error: ", error.message);
    };

    const { isLoading, mutate: submitUser } = usePostRequest(
        "chief-complains",
        {
            name: name
        },
        onSuccess,
        onError
    );
  
    const handleSubmit = () => {
        const { isValid, errors } = validation({name}, chiefComplainSchema);
        if(isValid){
          submitUser();
        }{
          setErrors(errors);
          console.log('from custom hooks: ', errors);
        }
    }
    const getErrorMessage = ( inputName ) => {
        return errors[inputName] ? errors[inputName] : "";
    }

    return (
        <>
            <Modal show={props.isChiefComplainModal} size="md">
                <Modal.Header className="common-modal-header">
                    <Modal.Title>Diagnosis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                className={`${getErrorMessage('name') ? 'v-border' : ''}`}
                                placeholder="Enter name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                            <small className="v-error">{backendError}</small>
                            <small className="v-error">{getErrorMessage('name')}</small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeComplainModal}>
                        Close
                    </Button>
                    <div className="d-grid gap-2">
                        { isLoading ?  <LoadingButton btnFull="yes"/> :
                        <Button variant="primary" size="md" onClick={handleSubmit}>
                            Save Changes
                        </Button>
                        }
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ChiefComplainForm;