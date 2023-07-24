import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Row, Button } from 'react-bootstrap';
import Support from '../components/Support';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from "react-router-dom";
import { usePostRequest } from "../hooks/usePostRequest";
import { verifyOtpSchema } from "../validationSchemas/verifyOtp.validation";
import { useValidation } from '../hooks/validationHooks/useValiation';
import LoadingButton from '../components/forms/LoadingButton'

const ForgotPasswordOtpVerification = () => {

  const { state } = useLocation();
  const { userId, username } = state;
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const validation = useValidation;
  let navigate = useNavigate();

  const onSuccess = (data) => {
    toast.success(data.message, {
      position: toast.POSITION.TOP_RIGHT
    });
    const timeId = setTimeout(() => {      
      navigate("/reset-password", { state: { userId } });
    }, 3000)
  };

  const onError = (error) => {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  let inputArr = {
    userId,
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
      console.log('from custom hooks: ', errors);
    }
  }

  const { isLoading: resendLoading, mutate: submitResendOtp } = usePostRequest(
    "auth/resend-otp",
    { username },
    () => {
      toast.success('Otp resent successfully. Please check', {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    (error) => {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  );
  const handleResendOtp = () => {
    submitResendOtp();
  }

  // if (isLoading) {
  //   return <Row className="pb-4">Please wait...</Row>
  // }

  const getErrorMessage = ( inputName ) => {
    return errors[inputName] ? errors[inputName] : "";
  }

  return (
    <div className="col-md-5">    
      <div><ToastContainer /></div>
      <div className="mb-4 text-center font-weight-bold">
        <h3 className="form-title">Please enter your OTP</h3>
      </div>
        {/* <SignupOtpVerificationForm /> */}
        <Row className="mb-1">
          <label htmlFor="mobile-number">OTP</label>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${getErrorMessage('otp') ? 'v-border' : ''}`}
              id="otp"
              placeholder="Please enter your otp"
              onChange={(e) => setOtp(e.target.value)}
            />
            <small className="v-error">{getErrorMessage('otp')}</small>

            <div className="pt-2 resend-btn">
              { resendLoading ?  <LoadingButton /> :
                <Button type="button" disabled={resendLoading} onClick={handleResendOtp} variant="outline-primary" size="sm">
                  Resend OTP?
                </Button>
              }
            </div>
          </div>
        </Row>
        <Row>
          <div className="d-grid gap-2">
            { isLoading ?  <LoadingButton btnFull="yes" /> :
              <Button variant="primary" className="btn-color" size="md" onClick={handleSubmit}>
                  Submit
              </Button>
            }
          </div>
        </Row>
      <Support />
    </div>
  );
}

export default ForgotPasswordOtpVerification

