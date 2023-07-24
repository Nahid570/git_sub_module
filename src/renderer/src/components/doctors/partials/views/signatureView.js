import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetRequest } from '../../../../hooks/useGetRequest';
import SignatureImageView from './signatureImageView';
import { deleteConfirmation } from '../../../../utils/helpers';
import { useDeleteRequest } from '../../../../hooks/useDeleteRequest';

const SignatureView = ({ isPrescription = false }) => {
  const userInfo = useSelector((state) => state.authReducer.data);
  const [imageContent, setImageContent] = useState('');
  const { doctorName } = userInfo;

  useEffect(() => {
    getImageLoad();
  }, []);

  const { isLoading: isGetImageLoading, refetch: getImageLoad } = useGetRequest(
    `getSignatureContent-${userInfo.id}`,
    `doctors/signature-content/${userInfo.id}`,
    (data) => {
      setImageContent(data);
    },
    (e) => {
      console.log(e);
    },
  );

  const { isLoading: isLoading, mutate: deleteSignature } = useDeleteRequest(
    `doctors/delete-signature/${userInfo.id}`,
    (data) => {
      setImageContent('');
    },
    (e) => {
      console.log(e);
    },
  );

  return (
    <div className={`${isPrescription ? 'prescription-signature-view' : ''}`}>
      <div>
        {imageContent && (
          <SignatureImageView
            signature={imageContent}
            height={80}
            width={280}
          />
        )}
        {!isPrescription && imageContent && (
          <i
            className="fa fa-times-circle ml-3"
            style={{ fontSize: '18px' }}
            onClick={() => deleteConfirmation(deleteSignature, 23)}
          ></i>
        )}
      </div>
      {isPrescription && doctorName && (
        <div className="text-center mt-2">{doctorName}</div>
      )}
    </div>
  );
};

export default memo(SignatureView);
