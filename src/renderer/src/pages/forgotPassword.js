import Support from '../components/Support';
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm"

const ForgotPassword = () => {
    return (
      <div className="col-md-5">
        <div className="mb-4 text-center font-weight-bold">
          <h3 className="form-title">Forgot Password?</h3>
        </div>
        <ForgotPasswordForm />
        <Support />
      </div>
    );
}

export default ForgotPassword

