import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import LoadingButton from '../../forms/LoadingButton'
import { useValidation } from '../../../hooks/validationHooks/useValiation'
import { PrescriptionTemplateSchema } from '../../../validationSchemas/prescriptionTemplate.validation'
import { usePostRequest } from '../../../hooks/usePostRequest'
import { toast } from 'react-toastify'

function TemplateModal({ isTemplateModal, setIsTemplateModal, templateInput }) {
  const [name, setName] = useState('')
  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState({})
  const validation = useValidation

  useEffect(() => {
    setServerError('')
  }, [name])

  const handleSubmit = () => {
    const { isValid, errors } = validation({ name }, PrescriptionTemplateSchema)
    if (isValid) {
      submitUser()
    }
    {
      setErrors(errors)
    }
  }

  const onSuccess = (data) => {
    toast.success('Successfully created', {
      position: toast.POSITION.TOP_RIGHT,
    })
    setIsTemplateModal(false)
  }

  const onError = (error) => {
    setServerError(error.message)
    console.log('from react query error: ', error.message)
  }

  const { isLoading, mutate: submitUser } = usePostRequest(
    'prescriptions/templates',
    {
      name: name,
      organizationId: templateInput.organizationId,
      chiefComplains: templateInput.chiefComplains,
      onExaminations: templateInput.onExaminations,
      diagnoses: templateInput.diagnoses,
      histories: templateInput.histories,
      medicines: templateInput.medicines,
      rehabilitation: templateInput.rehabilitation,
      advices: templateInput.advices,
      followUps: templateInput.followUps,
      investigations: templateInput.investigations,
      eyeGlass: templateInput.eyeGlass,
      medicineIds: templateInput.medicineIds,
      note: { note: templateInput?.note },
    },
    onSuccess,
    onError,
  )

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : ''
  }

  return (
    <>
      <Modal show={isTemplateModal} size="md">
        <Modal.Header className="common-modal-header">
          <Modal.Title>Prescription Template</Modal.Title>
          <i
            onClick={() => setIsTemplateModal(false)}
            className="fa fa-times cursor-pointer"
            aria-hidden="true"
          ></i>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {serverError && (
                <div className="v-error text-center mb-1">
                  Sorry!!! {serverError}
                </div>
              )}
              <Form.Label>Template Name</Form.Label>
              <Form.Control
                type="text"
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
          <Button variant="secondary" onClick={() => setIsTemplateModal(false)}>
            Close
          </Button>
          <div className="d-grid gap-2">
            {isLoading ? (
              <LoadingButton btnFull="yes" />
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => handleSubmit()}
              >
                Save Changes
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default TemplateModal
