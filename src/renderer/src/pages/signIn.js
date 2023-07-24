import Support from '../components/Support';
import SigninForm from '../components/forms/SigninForm';
import { ToastContainer, toast } from 'react-toastify';

const SignIn = () => {
  return (
    <div className="col-md-5">
      <div>
        <ToastContainer />
      </div>
      <div className="mb-3 text-center font-weight-bold">
        <h3 className="form-title">Sign In</h3>
      </div>
      <form>
        <SigninForm />
      </form>
      <Support />
    </div>
  );
};

export default SignIn;
