import { memo } from 'react';

const Footer = () => {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; iHealthScreen</span>
          <span className="float-right font-italic for-help">
            For Help:
            <i class="fas fa-phone-alt"></i>
            <span>09610930930</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
