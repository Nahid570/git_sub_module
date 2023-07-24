import { memo } from 'react';

const SignatureImageView = ({ signature, height, width }) => {
  return (
    <img
      src={`data:image/png;base64,${signature}`}
      height={height}
      width={width}
      alt="signature"
    />
  );
};

export default memo(SignatureImageView);
