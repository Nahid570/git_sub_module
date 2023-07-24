import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap';
import Support from '../components/Support';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { usePostRequest } from "../hooks/usePostRequest";
import { verifyOtpSchema } from "../validationSchemas/verifyOtp.validation";
import { useValidation } from '../hooks/validationHooks/useValiation';
import LoadingButton from '../components/forms/LoadingButton';

const SignupOtpVerification = () => {

  const { state } = useLocation();
  const { Id, phoneNumber } = state;
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const validation = useValidation;
  let navigate = useNavigate();
  if (!otp) {
    toast.success('OTP has been sent to your mobile. Please check', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
  const onSuccess = (data) => {
    toast.success('Your registration is completed wait for Admin Approval.', {
      position: toast.POSITION.TOP_RIGHT
    });
    const timeId = setTimeout(() => {      
      navigate("/signin");
    }, 3000)
  };

  const onError = (error) => {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  let inputArr = {
    userId: Id,
    otp
  }
  const { isLoading, mutate: submitUser } = usePostRequest(
    "auth/verify-otp",
    inputArr,
    onSuccess,
    onError
  );

  const handleSubmit = () => {
    const { isValid, errors } = validation(inputArr, verifyOtpSchema);
    if(isValid){
      submitUser();
    }{
      setErrors(errors);
    }
  }

  const getErrorMessage = ( inputName ) => {
    return errors[inputName] ? errors[inputName] : "";
  }

  const { isLoadingResendOtp, mutate: submitResendOtp } = usePostRequest(
    "auth/resend-otp",
    { username: phoneNumber},
    (data) => {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    (error) => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  );

  const resendOtp = () => {
    submitResendOtp();
  }

  return (
    <div className="col-md-5">    
      <div><ToastContainer /></div>
      <div className="mb-4 text-center font-weight-bold">
        <h3 className="form-title">Please enter your OTP</h3>
      </div>
        {/* <SignupOtpVerificationForm /> */}
        <Row>
          <Col>
            <label className="mobile-number label-custom">OTP</label>
            <div className="form-group" style={{marginBottom: "0.4rem"}}>
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
        {/* <Col md="6">
          <div className="form-group">
            <input type="checkbox" name="remember" onChange={(e) => setRemember(e.target.value)} /> Remember Me
          </div>
        </Col> */}
        <Col className="text-right">
          <Button variant="outline-primary" className="btn-color" size="sm" onClick={submitResendOtp}>
            Resend OTP
          </Button>
        </Col>
      </Row>
        <Row>
          <Col>
          <div className="text-center">
            { isLoading ?  <LoadingButton btnFull="yes" /> :
              <Button variant="primary" className="btn-color" size="md" onClick={handleSubmit}>
                Submit
              </Button>
            }
            {/* <Button variant="primary" disabled={isLoading} className="btn-color" size="md" onClick={handleSubmit}>
              Submit
            </Button> */}
          </div>
          </Col>
        </Row>
      <Support />
    </div>
  );
}

export default SignupOtpVerification

