import React, { memo, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../utils/axiosRequests';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../store/slices/authSlice';
import SignatureView from './views/signatureView';

const Signature = () => {
  const userInfo = useSelector((state) => state.authReducer.data);
  const [doctorName, setDoctorName] = useState(userInfo?.doctorName);
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSignature = () => {
    let formData = new FormData();
    if (selectedImage) {
      formData.append('signature', selectedImage);
    }
    formData.append('doctorName', doctorName);
    postRequest('doctors/upload-signature', formData)
      .then((data) => {
        dispatch(
          loginSuccess({
            ...userInfo,
            doctorName,
          }),
        );
        //setSelectedImage('');
        toast.success('Successfully uploaded', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        const errorMsg = error.message.split(',');
        toast.error(errorMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div>
      <Row className="mt-3">
        <Col md={3}>
          <Form.Group controlId="formFileSm">
            <Form.Control
              type="file"
              accept="image/*"
              size="sm"
              onChange={imageChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-2 mt-2">
        <Col md={3}>
          {!selectedImage && <SignatureView />}
          {selectedImage && (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Thumb"
                height={80}
                width={280}
              />
              <i
                className="fa fa-times-circle ml-3"
                onClick={() => setSelectedImage('')}
                style={{ fontSize: '18px' }}
              ></i>
            </div>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter name"
            defaultValue={userInfo?.doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button size="sm" onClick={() => handleSignature()}>
            Save signature
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Signature);
