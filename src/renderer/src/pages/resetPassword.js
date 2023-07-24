import Support from '../components/Support';
import ResetPasswordForm from '../components/forms/ResetPasswordForm'

const ResetPassword = () => {
    return (
        <div className="col-md-5">
            <div className="mb-4 text-center font-weight-bold">
                <h3 className="form-title">Reset Password</h3>
            </div>
            <form>
                <ResetPasswordForm />
            </form>

            <Support />
        </div>
    )
}

export default ResetPassword

