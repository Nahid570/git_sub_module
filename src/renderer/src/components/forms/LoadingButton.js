import { Button, Spinner } from 'react-bootstrap';

function LoadingButton({ btnFull = false }) {
  const fullBtn = btnFull === 'yes' ? 'full-width-btn' : 'signup-btn';

  return (
    <Button variant="primary" className={`btn-color ${fullBtn}`} disabled>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span style={{ paddingLeft: '10px' }}>Please wait...</span>
    </Button>
  );
}

export default LoadingButton;
