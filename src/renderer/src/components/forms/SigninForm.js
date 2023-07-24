import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { usePostRequest } from '../../hooks/usePostRequest'
import { useNavigate } from 'react-router-dom'
import { signinSchema } from '../../validationSchemas/signin.validation'
import { useValidation } from '../../hooks/validationHooks/useValiation'
import { loginSuccess } from '../../store/slices/authSlice'
import { getRequest } from '../../utils/axiosRequests'
import {
  activeOrganization as activateOrg,
  organizationList,
} from '../../store/slices/orgSlice'
import {
  prescriptionHeader,
  prescriptionFooter,
  prescriptionItems,
  patientSettings,
  prescriptionSettings,
} from '../../store/slices/prescriptionSlice'
import {
  activeDoctorForAssistant,
  doctorListForAssistant,
} from '../../store/slices/doctorsOfAssistantSlice'
import { specialtyList } from '../../store/slices/specialtySlice'
import LoadingButton from './LoadingButton'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { getPrescriptionInfo } from '../../hooks/useGetPrescriptionInfo'

const SigninForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const dispatch = useDispatch()

  const validation = useValidation
  let navigate = useNavigate()

  const onSuccess = (data) => {
    console.log(data, 'user info')
    sessionStorage.setItem('token', JSON.stringify(data.token))
    dispatch(loginSuccess(data))
    if (data.userType === 'doctor') {
      dispatch(activateOrg(data.organizationIds[0]))
      dispatch(organizationList(data.organizationIds))
    }
    if (data.userType === 'assistant') {
      getRequest(`assistants/${data.id}`)
        .then((data) => {
          dispatch(doctorListForAssistant(data?.doctorIds))
          dispatch(activeDoctorForAssistant(data?.doctorIds[0]))
          navigate('/appointments')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      getPrescriptionInfo('specialty', '').then((data) => {
        dispatch(specialtyList(data))
      })
      getPrescriptionInfo('header', data.organizationIds[0]?.id).then(
        (data) => {
          dispatch(prescriptionHeader(data))
        },
      )
      getPrescriptionInfo('footer', data.organizationIds[0]?.id).then(
        (data) => {
          dispatch(prescriptionFooter(data))
        },
      )
      getPrescriptionInfo('prescriptionItem', data.organizationIds[0]?.id).then(
        (data) => {
          dispatch(prescriptionItems(data))
        },
      )
      getPrescriptionInfo(
        'prescriptionPrint',
        data.organizationIds[0]?.id,
      ).then((data) => {
        dispatch(prescriptionSettings(data))
      })
      getPrescriptionInfo('patientItem', data.organizationIds[0]?.id).then(
        (data) => {
          dispatch(patientSettings(data))
        },
      )
      navigate('/prescription')
    }
  }

  const onError = (error) => {
    setAuthError(error.message)
    console.log('from react query error: ', error.message)
  }

  const { isLoading, mutate: submitUser } = usePostRequest(
    'auth/login',
    {
      username: username,
      password,
    },
    onSuccess,
    onError,
  )

  const handleSubmit = () => {
    const { isValid, errors } = validation({ username, password }, signinSchema)
    if (isValid) {
      submitUser()
    }
    {
      setErrors(errors)
    }
  }

  const getErrorMessage = (inputName) => {
    return errors[inputName] ? errors[inputName] : ''
  }

  return (
    <div>
      {authError && (
        <div className="v-error text-center mb-1">Sorry!!! {authError}</div>
      )}
      <Row className="mb-2">
        <Col>
          <label htmlFor="username">Mobile No or Email</label>
          <div className="form-group">
            <input
              type="text"
              autoComplete="off"
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
        <Col>
          <label htmlFor="password">Password </label>
          <div className="form-group" style={{ position: 'relative' }}>
            <input
              autoComplete="off"
              type={`${showPassword ? 'text' : 'password'}`}
              className={`form-control ${
                getErrorMessage('password') ? 'v-border' : ''
              }`}
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <i
                className="fa fa-eye fa-fw pass-show-hide"
                aria-hidden="true"
                onClick={() => setShowPassword(false)}
              ></i>
            ) : (
              <i
                className="fa fa-eye-slash pass-show-hide"
                aria-hidden="true"
                onClick={() => setShowPassword(true)}
              ></i>
            )}
            <small className="v-error">{getErrorMessage('password')}</small>
          </div>
        </Col>
      </Row>
      <Row className="pb-1">
        <Col md="6">
          <div className="form-group">
            <input
              type="checkbox"
              name="remember"
              onChange={(e) => setRemember(e.target.value)}
            />{' '}
            Remember Me
          </div>
        </Col>
        <Col md="6" className="forgot-password">
          <div className="form-group">
            <Link className="signin-link" to="/forgot-password">
              {' '}
              Forgot Password
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="text-center signin-btn-area">
          <div className="d-grid gap-2">
            {isLoading ? (
              <LoadingButton btnFull="yes" />
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="btn-color signin-btn"
                size="md"
                style={{ width: '100%' }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <p className="pt-3 text-center signin-btn">
        Don't have an account?
        <Link className="signin-link" to="/signup">
          {' '}
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SigninForm
