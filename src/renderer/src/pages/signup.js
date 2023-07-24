import React from 'react';
import Support from '../components/Support';
import { Link } from 'react-router-dom';
import SignupForm from '../components/forms/SignupForm';

const Registration = () => {
    return (
      <div className="col-md-7">
        <div className="mb-4 text-center font-weight-bold">
          <h3 className="form-title">Doctor Sign Up</h3>
        </div>
        <form>
          <SignupForm />
        </form>
        <p className="pt-4 text-center signin-btn">
          Already have an account?
          <Link className="signin-link" to="/signin">
            {" "}
            Sign In
          </Link>
        </p>
        <Support />
      </div>
    );
}

export default Registration

