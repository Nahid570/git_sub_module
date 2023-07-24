import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { usePostRequest } from '../../hooks/usePostRequest'
import { resetPasswordSchema } from '../../validationSchemas/resetPassword.validation'
import { useValidation } from '../../hooks/validationHooks/useValiation'
import { postRequest } from '../../utils/axiosRequests'
import { ToastContainer, toast } from 'react-toastify'
import LoadingButton from './LoadingButton'

const ResetPasswordForm = () => {
  const { state } = useLocation()
  const { id, securityToken } = useParams()
  const userId = state && state.userId ? state.userId : id
  let navigate = useNavigate()

  useEffect(() => {
    if (id && securityToken) {
      postRequest('auth/verify-link', { userId: id, securityToken })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          navigate('/not-found')
          return 0
        })
    }
  })

  const [password, setPassword] = useState('')
  const [repeat_password, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validation = useValidation
  const onSuccess = (data) => {
    navigate('/signin')
  }

  const onError = (error) => {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  let inputArr = {
    userId,
    password,
    repeat_password,
  }
  console.log(inputArr, 9999)
  const { isLoading, mutate: submitUser } = usePostRequest(
    'auth/reset-password',
    inputArr,
    onSuccess,
    onError,
  )

  const handleSubmit = () => {
    const { isValid, errors } = validation(inputArr, resetPasswordSchema)
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

  return (
    <div>
      <Row className="pb-3">
          <Col>
        <label htmlFor="password">New Password</label>
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
      </Row>
      <Row className="pb-2">
          <Col>
        <label htmlFor="password">Confirmed Password</label>
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
      <Row>
        <Col className="reset-pass-btn text-center">
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
        </Col>
      </Row>
    </div>
  )
}

export default ResetPasswordForm
