import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useValidation } from '../../../hooks/validationHooks/useValiation'
import { prescriptionItemSchema } from '../../../validationSchemas/prescriptionItem.validation'

function PrescriptionItem({
  isNewItem,
  setIsNewItem,
  prescriptionItems,
  setPrescriptionItems,
  handleSavePrescriptionItemsAndSettings,
}) {
  const [name, setName] = useState('')
  const [isSubmit, setIsSubmit] = useState('')
  const [errors, setErrors] = useState({})
  const validation = useValidation

  useEffect(() => {
    if (isSubmit) {
      handleSavePrescriptionItemsAndSettings()
    }
  }, [isSubmit])

  const handleNewPrescriptionItem = () => {
    const { isValid, errors } = validation({ name }, prescriptionItemSchema)
    if (isValid) {
      const newName = name.replace(/\s+/g, '-').toLowerCase()
      const newItem = {
        enabled: true,
        order: 1,
        position: 'right',
      }
      const result = Object.assign({ [newName]: newItem }, prescriptionItems)
      setPrescriptionItems({ ...result })
      setIsSubmit(true)
      setIsNewItem(false)
    }
    {
      setErrors(errors)
    }
  }

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : ''
  }

  return (
    <>
      <Modal show={isNewItem} size="md">
        <Modal.Header className="common-modal-header">
          <Modal.Title>Add New Item</Modal.Title>
          <i
            onClick={() => setIsNewItem(false)}
            className="fa fa-times cursor-pointer"
            aria-hidden="true"
          ></i>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="label-custom">Item Name</Form.Label>
              <Form.Control
                type="text"
                className={`${getErrorMessage('name') ? 'v-border' : ''}`}
                placeholder="Enter item name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <small className="v-error">{getErrorMessage('name')}</small>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsNewItem(false)}>
            Close
          </Button>
          <div className="d-grid gap-2">
            {/* {isLoading? ? (
              <LoadingButton btnFull="yes" />
            ) : (
              <Button variant="primary" size="md" onClick={()=>handleSavePrescriptionItemsAndSettings()}>
                Save Changes
              </Button>
            )} */}
            <Button
              variant="primary"
              size="md"
              onClick={() => handleNewPrescriptionItem()}
            >
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default PrescriptionItem
