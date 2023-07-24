import { memo } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const LoadingSaveBtn = () => {
  return (
    <Button disabled variant="primary" className="mr-3 save-button" size="md">
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span>Please wait...</span>
    </Button>
  );
};

export default memo(LoadingSaveBtn);
