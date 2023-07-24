import React, { useState } from 'react';
import { Row,Col,Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { usePostRequest } from "../../hooks/usePostRequest";
import { signupOtpSchema } from "../../validationSchemas/verifyOtp.validation";
import { useValidation } from '../../hooks/validationHooks/useValiation';
import LoadingButton from './LoadingButton';

const SignupOtpVerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const validation = useValidation;
  let navigate = useNavigate();

  const onSuccess = (data) => {
        console.log("from react query success: ", data);
        //navigate("/auth/forgot-password");
    };

    const onError = (error) => {
        console.log("from react query error: ", error.message);
    };

    let inputArr = {
      otp
    }
    const { isLoading, mutate: submitUser } = usePostRequest(
      "auth/verify-otp",
      inputArr,
      onSuccess,
      onError
    );

    const handleSubmit = () => {
      const { isValid, errors } = validation(inputArr, signupOtpSchema);
      if(isValid){
        submitUser();
      }{
        setErrors(errors);
        console.log('from custom hooks: ', errors);
      }
    }

    if (isLoading) {
        return <Row className="pb-4">Please wait...</Row>
    }

    const getErrorMessage = ( inputName ) => {
      return errors[inputName] ? errors[inputName] : "";
    }

  return (
    <div>
      <Row className="mb-3">
        <Col>
        <label className="label-custom" htmlFor="mobile-number">OTP</label>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${getErrorMessage('otp') ? 'v-border' : ''}`}
            id="otp"
            placeholder="Please enter your otp"
            onChange={(e) => setOtp(e.target.value)}
          />
          <small className="v-error">{getErrorMessage('otp')}</small>
        </div>
        </Col>
      </Row>
      <Row>
        <div className="d-grid gap-2">
        { isLoading ?  <LoadingButton /> :
          <Button variant="primary" className="signup-btn btn-color" size="md" onClick={handleSubmit}>
            Submit
          </Button>
        }
          <Button variant="primary" disabled={isLoading} className="btn-color" size="md" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default SignupOtpVerificationForm

