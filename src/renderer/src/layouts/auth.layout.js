import LeftImageArea from '../components/LeftImageArea';
import Support from '../components/Support';
import '../components/registration.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="d-lg-flex half">
      <div className="contents order-1 order-md-2 form-area">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {children}
          </div>
          <div>
            <span className="float-right font-italic for-help">
              For Help:
              <i class="fas fa-phone-alt" style={{ fontSize: '14px' }}></i>
              <span>09610930930</span>
            </span>
          </div>
        </div>
      </div>
      <LeftImageArea />
    </div>
  );
};

export default AuthLayout;
