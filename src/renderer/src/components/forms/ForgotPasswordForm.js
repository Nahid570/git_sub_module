import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { usePostRequest } from '../../hooks/usePostRequest'
import { ToastContainer, toast } from 'react-toastify'
import { forgotPasswordSchema } from '../../validationSchemas/forgotPassword.validation'
import { useValidation } from '../../hooks/validationHooks/useValiation'
import LoadingButton from './LoadingButton'

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState({})

  const validation = useValidation
  let navigate = useNavigate()

  const onSuccess = (data) => {
    console.log('from react query success: ', data)
    toast.success(data.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    if (data.type === 'email') {
      navigate('/signin')
    }
    navigate('/forgot-password-otp-verification', {
      state: { userId: data.userId, username: username },
    })
  }
  const onError = (error) => {
    // toast.error(error.message, {
    //   position: toast.POSITION.TOP_RIGHT
    // });
  }

  let inputArr = {
    username,
  }
  const { isLoading, mutate: submitUser } = usePostRequest(
    'auth/forgot-password',
    inputArr,
    onSuccess,
    onError,
  )

  const handleSubmit = () => {
    const { isValid, errors } = validation(inputArr, forgotPasswordSchema)
    if (isValid) {
      submitUser()
    }
    {
      setErrors(errors)
      console.log('from custom hooks: ', errors)
    }
  }

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : ''
  }

  const handleCancel = () => {
    navigate('/signin')
  }

  return (
    <div>
      <Row className="mb-1">
        {/* <label htmlFor="mobile-number">Email or Phone Number</label>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${
              getErrorMessage("username") ? "v-border" : ""
            }`}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <small className="v-error">{getErrorMessage("username")}</small>
        </div> */}
        <Col>
          <label htmlFor="username">Mobile No or Email</label>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${
                getErrorMessage('username') ? 'v-border' : ''
              }`}
              id="username"
              placeholder="Enter mobile no or email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('username')}</small>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="forgot-pass-btn">
          {isLoading ? (
            <LoadingButton btnFull="yes" />
          ) : (
            <Button
              variant="primary"
              className="btn-color"
              size="md"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
          <Button
            variant="default"
            className="btn btn-outline-danger"
            size="md"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPasswordForm
